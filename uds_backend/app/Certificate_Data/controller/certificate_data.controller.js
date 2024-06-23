const db = require("../../models/index");
const certificateDataDetails = db.certificateDataDetail
const parse = require('csv-parser');
const fs = require('fs');
const path = require("path");
const readXlsxFile = require("read-excel-file/node");

/////////////// create Certificate Data ///////////////

exports.create_Certificate_Data = async (req, res) => {
    try {
        const { business_relation_id, standard_id, other_standard_id, industry_code_id, date_of_issue,
            valid_until, sort_name, date_of_first_issue, main_certificate_id, owner_business_relation_id,
            publishing_enable, is_excerpt, is_main_certificate, status_id, pdf_download, iaif_number,
            unit_id, accredition_id, registration_id, date_varified } = req.body;
        const response = await certificateDataDetails.create({
            business_relation_id,
            standard_id,
            other_standard_id,
            industry_code_id,
            date_of_issue,
            valid_until,
            sort_name,
            date_of_first_issue,
            main_certificate_id,
            owner_business_relation_id,
            publishing_enable,
            is_excerpt,
            is_main_certificate,
            status_id,
            pdf_download,
            iaif_number,
            unit_id,
            accredition_id,
            registration_id,
            date_varified
        });
        return res.status(200).send({ code: 200, message: "Auditor Qualification Created Successfully!", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById Certificate Data  ///////////////

exports.get_ById_Certificate_Data = async (req, res) => {
    try {
        const certificateId = req.params.id;
        const getData = await certificateDataDetails.findOne({ where: { certificate_id: certificateId } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch ById Auditor Qualification Data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Certificate Data ///////////////

exports.get_All_Certificate_Data = async (req, res) => {
    try {
        const getData = await certificateDataDetails.findAll();
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch ById Auditor Qualification Data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


/////////////// Upload Certificate Data ///////////////

exports.upload_Certificate_Data = async (req, res) => {
    try {
        const user = await certificateDataDetails.findAll();
        if (!user) {
            throw new BadRequestError("user not found");
        }
        if (req.file == undefined) {
            return res.status(400).send("Please Upload Valid File!");
        }
        if (req.file.mimetype == "text/csv") {
            let csvData = []
            let filePath = path.join(__dirname, '../../../Certificate_Data/' + req.file.filename);
            fs.createReadStream(filePath)
                .pipe(parse({ delimiter: ",", from_line: 2 }))
                .on("error", (error) => {
                    throw error.message;
                })
                .on("data", (row) => {
                    csvData.push(row);
                })
                .on("end", async () => {
                    for (let i = 0; i < csvData.length; i++) {
                        var business_relation_id = csvData[i].business_relation_id;
                        var standard_id = csvData[i].standard_id;
                        var other_standard_id = csvData[i].other_standard_id;
                        var industry_code_id = csvData[i].industry_code_id;
                        var date_of_issue = csvData[i].date_of_issue;
                        var valid_until = csvData[i].valid_until;
                        var sort_name = csvData[i].sort_name;
                        var date_of_first_issue = csvData[i].date_of_first_issue;
                        var publishing_enable = csvData[i].publishing_enable;
                        var is_excerpt = csvData[i].is_excerpt;
                        var is_main_certificate = csvData[i].is_main_certificate;
                        var status_id = csvData[i].status_id;
                        var pdf_download = csvData[i].pdf_download;
                        var iaif_number = csvData[i].iaif_number;
                        var unit_id = csvData[i].unit_id;
                        var accredition_id = csvData[i].accredition_id;
                        var registration_id = csvData[i].registration_id;
                        var date_varified = csvData[i].date_varified;
                        var main_certificate_id = csvData[i].main_certificate_id;
                        var owner_business_relation_id = csvData[i].owner_business_relation_id;


                        const Data = await certificateDataDetails.create({
                            business_relation_id: business_relation_id,
                            standard_id: standard_id,
                            other_standard_id: other_standard_id,
                            industry_code_id: industry_code_id,
                            date_of_issue: date_of_issue,
                            valid_until: valid_until,
                            sort_name: sort_name,
                            date_of_first_issue: date_of_first_issue,
                            // main_certificate_id: main_certificate_id,
                            // owner_business_relation_id: owner_business_relation_id,
                            publishing_enable: publishing_enable,
                            is_excerpt: is_excerpt,
                            is_main_certificate: is_main_certificate,
                            status_id: status_id,
                            pdf_download: pdf_download,
                            iaif_number: iaif_number,
                            unit_id: unit_id,
                            accredition_id: accredition_id,
                            registration_id: registration_id,
                            date_varified: date_varified,
                            main_certificate_id: main_certificate_id,
                            owner_business_relation_id: owner_business_relation_id,
                        })
                    }
                });
            return res.status(200).send({ code: 200, message: "File Uploded Successfully!" });
        }
        else if (req.file.mimetype == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            if (req.file == undefined) {
                return res.status(400).send("Please upload an excel file!");
            }
            let filePath = path.join(__dirname, '../../../Certificate_Data/' + req.file.filename);

            readXlsxFile(filePath).then((rows) => {
                rows.shift();
                let excels = [];
                rows.forEach((row) => {
                    let tutorial = {
                        business_relation_id: row[0],
                        standard_id: row[1],
                        other_standard_id: row[2],
                        industry_code_id: row[3],
                        date_of_issue: row[4],
                        valid_until: row[5],
                        sort_name: row[6],
                        date_of_first_issue: row[7],
                        publishing_enable: row[8],
                        is_excerpt: row[9],
                        is_main_certificate: row[10],
                        status_id: row[11],
                        pdf_download: row[12],
                        iaif_number: row[13],
                        unit_id: row[14],
                        accredition_id: row[15],
                        registration_id: row[16],
                        date_varified: row[17],
                        main_certificate_id: row[18],
                        owner_business_relation_id: row[19],

                        owner_business_relation_id: row[19]
                        
                    };
                    excels.push(tutorial);
                });
                certificateDataDetails.bulkCreate(excels)
                return res.status(200).send({ code: 200, message: "File Uploded Successfully!" });
            });
        } else {
            console.log("please choose valide files CSV or Exel")
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

/////////////// Download Document Certificate Data ///////////////

exports.download_Document_Certificate_Data = (req, res) => {
    const fileName = req.params.fileName;
    let filePath = path.join(__dirname, '../../../Certificate_Data/');
    res.download(filePath + fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
};