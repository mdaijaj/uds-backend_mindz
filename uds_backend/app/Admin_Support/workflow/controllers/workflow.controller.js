const { response } = require("express");
const db = require("../../../models/index");
const workFlow = db.Work_Flow;
const workFlowMap = db.workflowmap;
const workflow_range = db.workflowrange;

exports.create_work_Flow = async (req, res) => {
    try {
        const { workflowType, wokflowcategory, workflowdepartment, roleFiled } = req.body;
        let roleFiledValue = roleFiled
        const existData = await workFlow.findOne({
            where: {workflow_type:workflowType,workflow_category:wokflowcategory,workflow_department: workflowdepartment }
        });
        if (existData) {
            return res.status(201).send({ code: 201, message: "WorkFlow Already Exists" });
        } else {
            const createWorkFlow = await workFlow.create({
                workflow_type: workflowType,
                workflow_category: wokflowcategory,
                workflow_department: workflowdepartment,
            });

            if (roleFiledValue) {
                const seenRoleWorkflowEmployee = new Set();
                for (let i = 0; i < roleFiledValue.length; i++) {
                    const key = `${roleFiledValue[i].roleId}_${createWorkFlow.workflow_id}_${roleFiledValue[i].employeeId}`;

                    if (seenRoleWorkflowEmployee.has(key)) {
                        return res.status(400).send({ code: 400, message: "Duplicate combination of roleId, workflowId, and employeeId found in roleFiledValue" });
                    }

                    await workFlowMap.create({
                        workflowId: createWorkFlow.workflow_id,
                        workflow_roleId: roleFiledValue[i].roleId,
                        workflow_employeeId: roleFiledValue[i].employeeId,
                    });
                    await workflow_range.create({
                        workFlow_id: createWorkFlow.workflow_id,
                        workflowrange_employeeId: roleFiledValue[i].employeeId,
                        workflowrange_roleId: roleFiledValue[i].roleId,
                        level: roleFiledValue[i].level,
                    });

                    seenRoleWorkflowEmployee.add(key);
                }
            }
            return res.status(200).send({ code: 200, message: "Work Flow Created Successfully!", data: createWorkFlow });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: error.message || "Server Error" });
    }
}

exports.get_All_workflow = async (req, res) => {
    try {

        const query = `SELECT wf.workflow_id,wf.workflow_type,a.id AS asset_id,a.asset_category_name,a.asset_category_code,
        sc.id,
        sc.service_category_name,dp.dept_id,dp.department_name FROM workFlows AS wf 
        LEFT JOIN asset_category AS a ON a.id = wf.workflow_category   AND (wf.workflow_type = 'Item PR' OR wf.workflow_type = 'Item PO')
        LEFT JOIN ServicesCategories AS sc ON sc.id = wf.workflow_category AND ( wf.workflow_type='Service PR' OR wf.workflow_type='Service PO' )
        LEFT JOIN departments AS dp ON dp.dept_id=wf.workflow_department
        WHERE wf.status='ACTIVE' ORDER BY wf.workflow_id DESC`;

         const data = await db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT });
         console.log("Dsdsd")
        if (data) {
            return res.status(200).send({ code: 200, message: "Fetched Agreement Data Successfully !", data: data });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
}

exports.view_workflow_byId = async (req, res) => {
    try {
        const workFlowId = req.params.id;

        const workFlowData = await workFlow.findOne({ where: { workflow_id: workFlowId, status: "ACTIVE" } });

        if (workFlowData) {
            const query = `
            SELECT wf.workflow_id,wf.workflow_type,a.id AS asset_id,a.asset_category_name,a.asset_category_code,
            sc.id,wf.workflow_category,
            sc.service_category_name,dp.dept_id,dp.department_name FROM workFlows AS wf 
            LEFT JOIN asset_category AS a ON a.id = wf.workflow_category   AND (wf.workflow_type = 'Item PR' OR wf.workflow_type = 'Item PO')
            LEFT JOIN ServicesCategories AS sc ON sc.id = wf.workflow_category AND ( wf.workflow_type='Service PR' OR wf.workflow_type='Service PO' )
            LEFT JOIN departments AS dp ON dp.dept_id=wf.workflow_department
             WHERE wf.status='ACTIVE' AND wf.workflow_id = ${workFlowData.workflow_id}`;

            const data = await db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT });
            let alldata = {};
            let valueForRoleEmployee;

            if (data.length > 0) {
                const workFlowMapData = await workFlowMap.findAll({ where: { workflowId: workFlowId, status: "ACTIVE" } });

                if (workFlowMapData.length > 0) {
                    const getRoleEmployeeData = `
                        SELECT wfm.id AS worklowmapId, ru.employee_id, ru.role_master_id, ru.user_role,
                               CONCAT(ru.first_name, " ", ru.middle_name, " ", ru.last_name) AS employeeName
                        FROM workFlowmaps AS wfm
                        INNER JOIN workFlows AS wf ON wf.workflow_id = wfm.workflowId AND wf.status='ACTIVE'
                        INNER JOIN registered_users AS ru ON ru.employee_id = wfm.workflow_employeeId
                        WHERE wfm.workflowId = ${workFlowId} AND wfm.status='ACTIVE'`;

                    valueForRoleEmployee = await db.sequelize.query(getRoleEmployeeData, { type: db.sequelize.QueryTypes.SELECT });

                    alldata = { ...data[0], employeedetails: valueForRoleEmployee };
                }
            }

            return res.status(200).send({ code: 200, message: "Work Flow Details Fetched Successfully!", data: alldata });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

exports.update_workflow_byId = async (req, res) => {
    try {
        const id = req.params.id
        if (id) {
            const {workflowType,wokflowcategory,workflowdepartment,roleFiled} = req.body;
            const getAllData = await workFlow.findOne({ where: { workflow_id: id } });
            const existingWorkflow = await workFlow.findAll({  where: {workflow_type:workflowType, workflow_department: workflowdepartment } })  
            let isExisting = false;
            existingWorkflow.map((existingWorkflowValue => {
                if ( existingWorkflowValue.workflow_id != id) {
                    isExisting = true;
                }
            }))
            if ( isExisting ){ 
                return res.status(200).send({
                    code: 200, message: "WorkFlow already exists,not updated!",data:[]
                });
            }
           
            let roleFiledValue = roleFiled
            if (getAllData) {
                const updateWorkFlow = await workFlow.update({
                    workflow_type: workflowType,
                    workflow_category: wokflowcategory,
                    workflow_department: workflowdepartment
                },
                    {
                        where: { workflow_id: id }
                    });

                const singleWorkFlowMap = await workFlowMap.findAll({where: {workflowId: id}}) 
                let getWorkFlowSingleId;
                if(roleFiledValue){
                    getWorkFlowSingleId = await workFlowMap.findOne({where: {workflowId: id}});
                    if(getWorkFlowSingleId){
                        await workFlowMap.update({ status: "INACTIVE" }, { where: { workflowId: id } });
                        await workflow_range.update({ status: "INACTIVE" }, { where: { workFlow_id:id } });
                        for(let i=0; i<roleFiledValue.length; i++){
                            await workFlowMap.create({
                                workflowId: id,
                                workflow_roleId: roleFiledValue[i].roleId,
                                workflow_employeeId: roleFiledValue[i].employeeId
                            });
                            await workflow_range.create({
                                workFlow_id: id,
                                workflowrange_employeeId: roleFiledValue[i].employeeId,
                                workflowrange_roleId: roleFiledValue[i].roleId,
                                level: roleFiledValue[i].level,
                            });
                        }
                    }else{
                    for(let i=0; i<roleFiledValue.length; i++){
                        await workFlowMap.create({
                            workflowId: id,
                            workflow_roleId: roleFiledValue[i].roleId,
                            workflow_employeeId: roleFiledValue[i].employeeId
                        });
                        await workflow_range.create({
                            workFlow_id: id,
                            workflowrange_employeeId: roleFiledValue[i].employeeId,
                            workflowrange_roleId: roleFiledValue[i].roleId,
                            level: roleFiledValue[i].level,
                        });
                    }
                    }
                }

                return res.status(200).send({
                    code: 200, message: "WorkFlow updated Successfully!", data:updateWorkFlow
                });
            } else {
                return res.status(404).send({ code: 403, message: "id not found" });
            };
        } else {
            return res.status(404).send({ code: 403, message: "id not found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: error.message || "Server Error" });
    };
};