const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const pdf = require('html-pdf');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "developerinnovationm0@gmail.com",
        pass: "rfucaemnbasulaet",
    },
});

const send = (mailOptions, otp) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error(error);
                reject(error);
            } else {
                console.log('Email sent: ' + info.response, otp);
                resolve(info);
            }
        });
    });
};

const verifyEmailStudent = {
    title: "Welcome to UDS",
    getBody: (name) => {
        const htmlFilePath = path.resolve(__dirname, "../templates/welcome.html");
        let html = fs.readFileSync(htmlFilePath, 'utf-8');
        let htmlData = html.replace('{name}', name);
        return htmlData;
    },
};

const welcomeProposal = async (name) => {
    let mail_id = name;
    const htmlFilePath = path.resolve(__dirname, "../templates/index.html");
    const html = fs.readFileSync(htmlFilePath, 'utf-8');
    const htmlWithData = html.replace('{name}', name);
    const pdfBuffer = await generatePDF(htmlWithData);
    const mailOptions = {
        to: mail_id,
        subject: verifyEmailStudent.title,
        html: verifyEmailStudent.getBody(mail_id),
        attachments: [
            {
                filename: 'invoice.pdf',
                content: pdfBuffer,
            }
        ]
    };

    let response = await send(mailOptions, mail_id);
    return response;
};

function generatePDF(htmlContent) {
    return new Promise((resolve, reject) => {
        pdf.create(htmlContent).toBuffer((err, buffer) => {
            if (err) {
                reject(err);
            } else {
                resolve(buffer);
            }
        });
    });
}

module.exports.sendMail = async (name) => {
    return welcomeProposal(name);
};
