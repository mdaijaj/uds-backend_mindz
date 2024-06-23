const db = require("../../../../models/index");

const accreaditationDetails = db.accreaditationDetails
const Op = db.Sequelize.Op;
const parse = require('csv-parser');
const fs = require('fs');
const path = require("path");
/////////////// Create accreaditation ///////////////

exports.create_accreaditation = async (req, res) => {
    try {
        
        const response = await accreaditationDetails.create(
            req.body);
        return res.status(200).send({ code: 200, message: "accreaditation Created Successfully!", data: response });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit accreaditation ///////////////

exports.edit_accreaditation = async (req, res) => {
    try {
        const accreaditationId = req.params.id;
        const { accreaditation_name,accreditationID,accreditedOfficeID,accreditationBodyID,standardID,industryCodeGroupId,industryCodeID,accreaditation_files ,status } = req.body;
        const editData = await accreaditationDetails.findOne({ where: { accreaditation_id: accreaditationId } });
        if (editData) {
            const updateData = await accreaditationDetails.update({
                accreditationID,
                accreditedOfficeID,
                accreditationBodyID,
                standardID,
                industryCodeGroupId,
                industryCodeID,
                accreaditation_files,
                accreaditation_name,
                status
            },
                { where: { accreaditation_id: accreaditationId } });

            return res.status(200).send({ code: 200, message: "accreaditation Updated SuccessFully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};            

// /////////////// Get ById accreaditation ///////////////

exports.getAll_accreaditation = async (req, res) => {
    try {
        const getAllData = await accreaditationDetails.findAll({ where: { status: "ACTIVE" } })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All accreaditation Data Successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById accreaditation ///////////////

exports.get_ById_accreaditation = async (req, res) => {
    try {
        const accreaditationId = req.params.id;
        const getData = await accreaditationDetails.findOne({ where: { accreaditation_id: accreaditationId } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Get ById Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete accreaditation ///////////////

exports.delete_accreaditation = async (req, res) => {
    try {
        const accreaditationId = req.params.id;
        const getData = await accreaditationDetails.findOne({ where: { accreaditation_id: accreaditationId } });
        if (getData) {
            const updated = await accreaditationDetails.update({ status: "INACTIVE" }, { where: { accreaditation_id: accreaditationId } });
            return res.status(200).send({ code: 200, message: "accreaditation Data is Deleted Successfully!", data: updated });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};
/////////////////////////////////////////////////////////////////////////////

exports.upload_Csv_Accredition_details = async (req, res) => {
    console.log("-----------working",)
    try {
        const user = await accreaditationDetails.findAll();
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
                        // let accredition_logo_details_name = csvData[i].accredition_logo_details_name ? csvData[i].accredition_logo_details_name : "";
                        let accreditationID = csvData[i].AccreditationID;
                        let accreditedOfficeID = csvData[i].AccreditedOfficeID;
                        let accreditationBodyID = csvData[i].AccreditationBodyID;
                        let standardID = csvData[i].StandardID;
                        let industryCodeGroupId = csvData[i].IndustryCodeGroupId;
                        let industryCodeID = csvData[i].industryCodeID;
                            // console.log("=======>",csvData[0])
                        const Data = await accreaditationDetails.create({
                            // accredition_logo_details_name: accredition_logo_details_name,
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