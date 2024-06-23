module.exports = app => {
    const controller = require("../controllers/employPaymentDetails.controller.js");

    app.post("/api/v1/employmentPaymentDetails", controller.createEmploymentPaymentDetails);
}