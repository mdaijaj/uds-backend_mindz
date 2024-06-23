const db = require("../../../../models/index");
const accredition_logo_detailsDetails = db.accredition_logo_details;
const op = db.sequelize.op;
const parse = require('csv-parser');
const fs = require('fs');
const path = require("path");

/////////////// Create Accredition Logo Details ///////////////

exports.createoneAccredition_logo_details = async (req, res) => {
    try {
        const createoneDatas = await accredition_logo_detailsDetails.create(req.body);
        return res.status(200).send({ code: 200, message: "Accredition Logo Details!", data: createoneDatas })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Upload Csv Accredition Logo Details ///////////////
exports.createoneAccredition_logo_details_csvfile = async (req, res) => {
    try {
        if (req.file == undefined) {
            const { accreditationID, accreditedOfficeID, accreditationBodyID, accredition_logo_details_name, standardID, industryCodeGroupId, industryCodeID } = req.body
            const createoneDatas = await accredition_logo_detailsDetails.create({
                accreditationID,
                accreditedOfficeID,
                accreditationBodyID,
                accredition_logo_details_name,
                standardID,
                industryCodeGroupId,
                industryCodeID
            });
            return res.status(200).send({ code: 200, message: "File Uploded Successfully!", data: createoneDatas })
        }
        else if (req.file.mimetype == "text/csv") {
            let csvData = []
            let filePath = path.join(__dirname, '../../../../../accredition_csv/' + req.file.filename);
            fs.createReadStream(filePath)
            .pipe(parse({ delimiter: ",", from_line: 2 }))
            .on("error", (error) => {
                throw error.message;
            })
            .on("data", (row) => {
                console.log("row", row)
                csvData.push(row);
            })
            .on("end", async () => {
                for (let i = 0; i < csvData.length; i++) {
                    let accreditationID = csvData[i].accreditationID;
                    let accreditedOfficeID = csvData[i].accreditedOfficeID;
                    let accreditationBodyID = csvData[i].accreditationBodyID;
                    let accredition_logo_details_name =csvData[i].accredition_logo_details_name? csvData[i].accredition_logo_details_name : "";
                    let standardID = csvData[i].standardID;
                    let industryCodeGroupId = csvData[i].industryCodeGroupId;
                    let industryCodeID=  csvData[i].industryCodeID;

                    const createoneData = await accredition_logo_detailsDetails.create({
                        accreditationID: accreditationID,
                        accreditedOfficeID: accreditedOfficeID,
                        accreditationBodyID: accreditationBodyID,
                        standardID: standardID,
                        accredition_logo_details_name:accredition_logo_details_name,
                        industryCodeGroupId: industryCodeGroupId,
                        industryCodeID: industryCodeID,
                    });
                    console.log(createoneData, "createoneData11")
                }
            });
            return res.status(200).send({ code: 200, message: "File Uploded Successfully!" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


exports.upload_Csv_Accredition_details = async (req, res) => {
    console.log("-----------working",)
    try {
        const user = await accredition_logo_detailsDetails.findAll();
        if (!user) {
            throw new BadRequestError("user not found");
        }
        if (req.file == undefined) {
            return res.status(400).send("Please Upload Valid File!");
        }
        if (req.file.mimetype == "text/csv") {
            let csvData = []
            let filePath = path.join(__dirname, '../../../../../accredition_csv/' + req.file.filename);
            fs.createReadStream(filePath)
                .pipe(parse({ delimiter: ",", from_line: 2 }))
                .on("error", (error) => {
                    throw error.message;
                })
                .on("data", (row) => {
                    csvData.push(row);
                })
                .on("end", async () => {
                    // console.log(csvData);
                    for (let i = 0; i < csvData.length; i++) {
                        let accredition_logo_details_name = csvData[i].accredition_logo_details_name ? csvData[i].accredition_logo_details_name : "";
                        let accreditationID = csvData[i].AccreditationID;
                        let accreditedOfficeID = csvData[i].AccreditedOfficeID;
                        let accreditationBodyID = csvData[i].AccreditationBodyID;
                        let standardID = csvData[i].StandardID;
                        let industryCodeGroupId = csvData[i].IndustryCodeGroupId;
                        let industryCodeID = csvData[i].industryCodeID;
                            // console.log("=======>",csvData[0])
                        const Data = await accredition_logo_detailsDetails.create({
                            accredition_logo_details_name: accredition_logo_details_name,
                            accreditationID: accreditationID,
                            accreditedOfficeID: accreditedOfficeID,
                            accreditationBodyID: accreditationBodyID,
                            standardID: standardID,
                            industryCodeGroupId: industryCodeGroupId,
                            industryCodeID: industryCodeID,
                        })
                        // console.log(Data, "data")
                    }
                });
            return res.status(200).send({ code: 200, message: "File Uploded Successfully!" });
        } else {
            console.log("please choose valide files CSV")
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

/////////////// Edit Accredition Logo Details ///////////////

exports.editAccredition_logo_details = async (req, res) => {
    try {
        const accredition_logo_details_ID = parseInt(req.params.accredition_logo_details_id);
        const editData = await accredition_logo_detailsDetails.findOne({ where: { accredition_logo_details_ID: accredition_logo_details_ID } });
        if (editData) {
            const updateData = await accredition_logo_detailsDetails.update(req.body, { where: { accredition_logo_details_ID: accredition_logo_details_ID } })
            return res.status(200).send({ code: 200, message: "Accredition Logo Details Updated Successfully!", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Accredition Logo Details ///////////////

exports.getAllAccredition_logo_details = async (req, res) => {
    try {
        const getAllData = await accredition_logo_detailsDetails.findAll({ where: { status: "ACTIVE" } })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById Accredition Logo Details ///////////////

exports.getByIdAccredition_logo_details = async (req, res) => {
    try {
        const accredition_logo_detailsId = parseInt(req.params.accredition_logo_details_id);
        const getData = await accredition_logo_detailsDetails.findOne({ where: { accredition_logo_details_id: accredition_logo_detailsId } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch data by ID Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete Accredition Logo Details ///////////////

exports.deleteAccredition_logo_details = async (req, res) => {
    try {
        const accredition_logo_detailsId = parseInt(req.params.accredition_logo_details_id);
        const dltaccredition_logo_details = await accredition_logo_detailsDetails.findOne({ where: { accredition_logo_details_id: accredition_logo_detailsId } });
        if (dltaccredition_logo_details) {
            const deleteData = await accredition_logo_detailsDetails.update({ status: "INACTIVE" }, { where: { accredition_logo_details_id: accredition_logo_detailsId } });
            return res.status(200).send({ code: 200, message: "Accredition logo Details Data is Deleted Successfully!", data: deleteData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};