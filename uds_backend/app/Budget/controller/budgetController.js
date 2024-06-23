const db = require("../../models/index");
const budget = db.tbl_budget;
const budgetMapping = db.tbl_budgetMapping;
const RegisterEmployee = db.user;
const { Op } = require('sequelize');

// exports.createBudget = async (req, res) => {
//     console.log("function reached here")
//     try {
//         const {
//             financial_year_id, department_id, type, budgetAllocatedDate, amount, employee_id
//         } = req.body;
//         let allocated;
//         let AllocatedBy;
//         let createData;

//         const findEmp = await RegisterEmployee.findOne({
//             where: {
//                 employee_id
//             }
//         });
//         if (findEmp) {
//             const fullName = findEmp.first_name + " " + findEmp.last_name;
//             allocated = fullName;
//             AllocatedBy = fullName;
//         } else {
//             return res.status(404).send({
//                 code: 404,
//                 message: "Employee Not Found"
//             });
//         }

//         const findData = await budget.findOne({
//             where: {
//                 department_id,
//                 type,
//                 financial_year_id,
//                 isDeleted: false
//             }
//         });
//         if (!findData) {
//             createData = await budget.create({
//                 financial_year_id, department_id, type, budgetAllocated: amount,
//                 amount, employee_id,remainingAmount:amount
//             });
//             console.log("function reacher here")
//             return res.status(200).send({
//                 code: 200,
//                 message: "Budget Created Successfully",
//                 data: createData,
//             });
//         } else {
//             const currentAmount = findData.amount;
//             const updatedAmount = currentAmount + amount;

//             const updateData = await budget.update({
//                 type, employee_id, budgetAllocated: amount,
//                 remainingAmount: updatedAmount,
//                 amount: updatedAmount
//             }, {
//                 where: {
//                     id: findData.id
//                 }
//             });

//             createMap = await budgetMapping.create({
//                 budget_id: findData.id, amount,
//                 budgetAllocatedBy: AllocatedBy, budgetAllocatedDate,
//             });

//             return res.status(200).send({
//                 code: 200,
//                 message: "Budget Updated Successfully",
//             });
//         }
//     } catch (error) {
//         console.log("Error", error);
//         return res.status(500).send({ code: 500, message: error.message || "Server Error" });
//     }
// };
exports.createBudget = async (req, res) => {
    try {
        const {
            financial_year_id, department_id, type, budgetAllocatedDate, amount, employee_id,
            extend_type 
        } = req.body;
        let allocated;
        let AllocatedBy;
        let createData;

        const findEmp = await RegisterEmployee.findOne({
            where: {
                employee_id
            }
        });
        if (findEmp) {
            const fullName = findEmp.first_name + " " + findEmp.last_name;
            allocated = fullName;
            AllocatedBy = fullName;
        } else {
            return res.status(404).send({
                code: 404,
                message: "Employee Not Found"
            });
        }

        const findData = await budget.findOne({
            where: {
                department_id,
                type,
                financial_year_id,
                isDeleted: false
            }
        });
        if (!findData) {
            createData = await budget.create({
                financial_year_id, department_id, type, budgetAllocated: amount,
                amount, employee_id, remainingAmount: amount,extend_type
            });
            return res.status(200).send({
                code: 200,
                message: "Budget Created Successfully",
                data: createData,
            });
        } else {
            let updatedAmount;
            let newExpendType;

            if (extend_type === "Increase") {
                updatedAmount = findData.amount + amount;
                updatedRemainingAmount = findData.remainingAmount + amount;
                newExpendType = "Increase";
            } else if (extend_type === "Decrease") {
                updatedAmount = findData.amount - amount;
                updatedRemainingAmount = findData.remainingAmount - amount;
                newExpendType = "Decrease";
            } else {
                return res.status(400).send({
                    code: 400,
                    message: "Invalid extend_type"
                });
            }
            await budget.update({
                type, employee_id, 
                remainingAmount: updatedRemainingAmount,
                amount: updatedAmount,
                extend_type : newExpendType, 
            }, {
                where: {
                    id: findData.id
                }
            });
            
             await budgetMapping.create({
                budget_id: findData.id, amount,
                budgetAllocatedBy: AllocatedBy, budgetAllocatedDate,extend_type : newExpendType,
            });

            return res.status(200).send({
                code: 200,
                message: "Budget Updated Successfully",
            });
        }
    } catch (error) {
        console.log("Error", error);
        return res.status(500).send({ code: 500, message: error.message || "Server Error" });
    }
};



exports.getAllBudget = async (req, res) => {
    try {
        const [allDatas, allData] = await Promise.all([
            db.sequelize.query(`
                SELECT D.department_name, B.*
                FROM tbl_budget AS B
                INNER JOIN departments AS D ON D.dept_id = B.department_id
                WHERE B.isDeleted = false ORDER BY B.id DESC
            `),
            db.sequelize.query(`
                SELECT BP.budgetAllocatedBy, BP.budgetAllocatedDate, BP.amount, BP.budget_id ,B.budgetAllocated,B.amount,BP.amount as amounts,BP.extend_type
                FROM tbl_budget AS B
                INNER JOIN tbl_budgetMapping AS BP ON BP.budget_id = B.id
                WHERE B.isDeleted = false ORDER BY B.id DESC
            `)
        ]);

        const formattedData = allDatas[0].map(budget => ({
            ...budget,
            listData: allData[0].filter(item => item.budget_id === budget.id)
        }));

        return res.status(200).send({
            code: 200,
            message: "All Budget Fetched Successfully!",
            data: formattedData
        });
    } catch (error) {
        return res.status(500).send({ code: 500, message: error.message || "Server Error" });
    }
};


exports.getBudgetById = async (req, res) => {
    try {
        const id = req.params.budget_id;
        if (!id) {
            return res.status(400).send({ code: 400, message: "'id' parameter is required" });
        }
        const [singleData, listData] = await Promise.all([
            db.sequelize.query(`
                SELECT D.department_name, B.*
                FROM tbl_budget AS B
                INNER JOIN departments AS D ON D.dept_id = B.department_id
                WHERE B.id = :id AND B.isDeleted = false
            `, { replacements: { id } }),
            db.sequelize.query(`
                SELECT BP.budgetAllocatedBy, BP.budgetAllocatedDate, BP.amount, BP.budget_id,B.budgetAllocated,B.amount,BP.amount as amounts,BP.extend_type
                FROM tbl_budget AS B
                INNER JOIN tbl_budgetMapping AS BP ON BP.budget_id = B.id
                WHERE B.id = :id AND B.isDeleted = false
            `, { replacements: { id } })
        ]);
        if (singleData[0].length === 0) {
            return res.status(404).send({ code: 404, message: "Budget not found" });
        }
        const formattedData = {
            ...singleData[0][0],
            listData: listData[0]
        };
        return res.status(200).send({
            code: 200,
            message: "Budget Fetched Successfully!",
            data: formattedData
        });
    } catch (error) {
        return res.status(500).send({ code: 500, message: error.message || "Server Error" });
    }
};


exports.BudgetStatus = async (req, res) => {
    try {
        const id = req.params.budget_id;
        const { status } = req.body;
        const getData = await budget.findOne({
            where: {
                id: id,
                isDeleted: false
            }
        });
        if (getData) {
            const updated = await budget.update(
                {
                    status
                },
                {
                    where: {
                        id: id
                    }
                }
            );
            return res.status(200).send({
                code: 200,
                message: "Budget Status Change Successfully!",
            });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: error.message || "Server Error" });
    }
};

exports.deteleBudget = async (req, res) => {
    try {
        const id = req.params.budget_id
        const getAsset = await budget.findOne({
            where: {
                id: id,
                isDeleted: false
            }
        })
        if (getAsset) {
            const updateAsset = await budget.update({
                isDeleted: true
            },
                {
                    where: {
                        id: id
                    }
                }
            )
            return res.status(200).send({
                code: 200,
                message: "Budget Deleted Successfully",

            })
        } else {
            return res.status(404).send({
                code: 404, message: "No Record Found"
            })
        }
    } catch (error) {
        console.log("Error", error);
        res.status(500).send({ code: 500, message: error.message || "Internal Server Error" })
    }
}
