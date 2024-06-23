const express = require("express");
const path = require('path');
const cors = require("cors");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
var bodyParser = require('body-parser');
const procurement_Controller = require('./app/Purchase_And_Inventory/procurement management/controller/procurement management_controller');
var cron = require('node-cron');
const config = require("./app/config/auth.config");

global.__basedir = __dirname;
dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use('/profile_photo', express.static(path.join(__dirname, '/profile_photo')));
app.use('/documents', express.static(path.join(__dirname, '/documents')));
app.use('/masterDocument', express.static(path.join(__dirname, '/masterDocument')));
app.use('/app/master/MasterDocuments', express.static(path.join(__dirname, '/app/master/MasterDocuments')));
app.use('/upload', express.static(path.join(__dirname, '../upload')));
app.use('/new_content_doc', express.static(path.join(__dirname, '/new_content_doc')));
app.use('/new_author_doc', express.static(path.join(__dirname, '/new_author_doc')));
app.use('/new_assesment_doc', express.static(path.join(__dirname, '/new_assesment_doc')));
app.use('/new_traning_doc', express.static(path.join(__dirname, '/new_traning_doc')));
app.use('/new_user_doc', express.static(path.join(__dirname, '/new_user_doc')));
app.use('/candidate_profile_doc', express.static(path.join(__dirname, '/candidate_profile_doc')));
app.use('/It_ticket', express.static(path.join(__dirname, '/It_ticket')));
app.use('/audit_qualification_doc', express.static(path.join(__dirname, '/audit_qualification_doc')));
app.use('/intercompany_doc', express.static(path.join(__dirname, '/intercompany_doc')));
app.use('/expense_request', express.static(path.join(__dirname, '/expense_request')));
app.use('/attach_file', express.static(path.join(__dirname, '/attach_file')));
app.use('/travel_ticket', express.static(path.join(__dirname, '/travel_ticket')));
app.use('/attach_ticket_invoice', express.static(path.join(__dirname, '/attach_ticket_invoice')));
app.use('/Asset_Management_pdf', express.static(path.join(__dirname, '/Asset_Management_pdf')));
app.use('/item_master', express.static(path.join(__dirname, '/item_master')));
app.use('/Certificate_Data', express.static(path.join(__dirname, '/Certificate_Data')));
app.use('/Leave_Apply', express.static(path.join(__dirname, '/Leave_Apply')));
app.use('/advartisment_image', express.static(path.join(__dirname, '/advartisment_image')))
app.use('/Advanced_Payment_doc', express.static(path.join(__dirname, '/Advanced_Payment_doc')));
app.use('/Event_doc', express.static(path.join(__dirname, '/Event_doc')));
app.use('/Facility_Remote_doc', express.static(path.join(__dirname, '/Facility_Remote_doc')));
app.use('/Insurance_doc', express.static(path.join(__dirname, '/Insurance_doc')));
app.use('/House_aggrement_doc', express.static(path.join(__dirname, '/House_aggrement_doc')));
app.use('/Courier_outward_doc', express.static(path.join(__dirname, '/Courier_outward_doc')));
app.use('/AMC_Agreement_doc', express.static(path.join(__dirname, '/AMC_Agreement_doc')));
app.use('/Rental_Agreement_doc', express.static(path.join(__dirname, '/Rental_Agreement_doc')));
app.use('/vendor_Management_Pdf', express.static(path.join(__dirname, '/vendor_Management_Pdf')));
app.use('/certificate_Master', express.static(path.join(__dirname, '/certificate_Master')));
app.use('/updatedocument', express.static(path.join(__dirname, '/updatedocument')));
app.use('/onboarding_docs', express.static(path.join(__dirname, '/onboarding_docs')))

const corsOpts = {
  origin: "*",
  methods: ["GET", "PATCH", "POST", "PUT", "DELETE"],
  // allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOpts));

app.use('/upload', express.static("./upload"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;


db.sequelize.sync({alter:true})           
.then(() => {    
console.log("Synced db success...");
}).catch((err) => {
console.log("Failed to sync db...", err.message)
})  

// simple routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to UDS Application." });
});
app.use(config.authorization);

require('./app/routes/user.routes')(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/employmenttype.routes')(app);
require('./app/routes/sbu.routes')(app);
require('./app/routes/rolemaster.routes')(app);
require('./app/routes/grade.routes')(app);
require('./app/routes/maritalStatus.routes')(app);
require('./app/routes/officeLocation.routes.js')(app);
require('./app/routes/bandType.routes.js')(app);
require('./app/routes/salaryDetails.routes.js')(app);
require('./app/routes/employeePaymentDetails.routes.js')(app);
require('./app/routes/role/role.routes')(app);
require('./app/routes/employeepreviousemployer.routes')(app);
require("./app/routes/empBankDetail.routes")(app)
require("./app/routes/empDocument.routes")(app)
require('./app/routes/employeeDetails.routes')(app);
// require("./app/routes/helpdesk.routes")(app);
require("./app/routes/leaveTypes.routes")(app)
require("./app/routes/interviewStatus.routes")(app)
require("./app/routes/candidateShortlisted.routes")(app)
require("./app/routes/bank.routes")(app)
require("./app/My_Pending_Task/routes/my_pending_task.route")(app)
require("./app/routes/scheduleFixedInterview")(app)
require("./app/Stage/routes/stage.routes")(app)
require("./app/Multiple_Site/routes/multipleSite.routes")(app)
// require("./app/document_master/documentmaster.routes")(app);
require('./app/role_back/role_master/routes/roleMaster.routes')(app);
require('./app/role_back/menu_master/routes/menuMaster.routes')(app);
require('./app/role_back/submenu_master/routes/submenuMaster.routes')(app);
require('./app/role_back/role_module_master/routes/role_module_master.routes')(app);
require('./app/role_back/role_menu_access/routes/roleMenuAccess.routes')(app);
require('./app/master/department/routes/department')(app);
require('./app/master/designation/routes/designation')(app);
require('./app/sales_request/router/sales_request_router')(app);
require('./app/master/new_region/router/new_region.router')(app);
require('./app/master/new_spa/router/new_spa.router')(app);
require('./app/master/new_regional_business_head/router/new_regional_business_head.router')(app);
require('./app/master/customer_type/router/customer_type.router')(app);
require('./app/master/traning_name/router/traning_name.router')(app);
require('./app/master/director/router/director.router')(app);
require('./app/master/expenseforCopy/router/expenseforCopy.router')(app);
require('./app/location_mapping/pincode/routers/pincode_router')(app);
require('./app/location_mapping/country/routes/country.routes')(app);
require('./app/location_mapping/states/routers/states_router')(app);
require('./app/location_mapping/city/routers/city_router')(app);
require('./app/master/segment/router/segment.router')(app);
require('./app/IT_ticketing/router/IT_ticketingrouter')(app)
require('./app/DQS_Group_Master/router/DQS_Group_Master.router')(app)
require('./app/Purchase_And_Inventory/Vendor_Management/routes/vendor_management.routes')(app)
require('./app/Purchase_And_Inventory/Vendor_Management/routes/bank_Details.routes')(app)
require('./app/Purchase_And_Inventory/Vendor_Management/routes/document.routes')(app)
// require('./app/Purchase_And_Inventory/Master_Vendor_management/District/routes/district.routes')(app)
require('./app/Leave_Master/Leave_Master/routes/leave_master.routes')(app)
require('./app/master/lead_management_master/verification_status/routes/verification_status.routes')(app)
require('./app/Purchase_And_Inventory/procurement management/router/procurement management_router')(app);
require('./app/Certificate_Data/routes/certificate_data.routes')(app);
require('./app/Currency_Convert/Router/router')(app);
require('./app/PayRoll/Salary_Structure/Router/Sal_Structure_Route')(app)
require('./app/PayRoll/Salary_Structure/Router/Sal_Structure_Route')(app)
require('./app/master/lead_management_master/L1Review/router/L1Review.router')(app)
require('./app/account payable/auditor invoice/router/auditor_invoice_router')(app)
require('./app/account payable/Expense invoice/router/expense_invoice_router')(app)
require('./app/account payable/vendor invoice/router/vendor_invoice_router')(app)
require('./app/Admin_Support/Courier_Inward/router/Courier_Inward.router')(app)
require('./app/Admin_Support/Courier_Contains/router/Courier_Contains.router')(app)
require('./app/Admin_Support/Courier_Service_name/router/Courier_Service_name.router')(app)
require('./app/Admin_Support/AMC_Agreement/router/AMC_Agreement.router')(app)
require('./app/Admin_Support/Courier_Outward/router/Courier_Outward.router')(app)
require('./app/Admin_Support/Rental_Aggrement/router/Rental_Aggrement.router')(app)
require('./app/Admin_Support/Security_Agreement/router/house_Agreement.router')(app)
require('./app/Admin_Support/Policy/router/Policy.router')(app)
require('./app/Admin_Support/Insurance/router/Insurance.router')(app)
require('./app/Admin_Support/Event/router/Event.router')(app)
require('./app/Admin_Support/Complaints_Remote/router/Complaints_Remote.router')(app)
require('./app/Admin_Support/Facility_Remote/router/Facility_Remote.router')(app)
require('./app/Admin_Support/forex_currency/router/forex_currency_router')(app)
require("./app/language_master/language_router")(app)

require("./app/Admin_Support/Description_master_amc/router/description_router")(app)
require("./app/HRMS_notification/router/router")(app)
require("./app/candidate_onboarding/onboarding_router")(app)
require("./app/config_master/configmaster_router")(app)
require("./app/employee_signature/emp_sign_router")(app)
require("./app/PayRoll/employees_Salary/employee_salary_router.js")(app)
require("./app/master/lead_management_master/quotation_currency/routes/quotation_currency.routes.js")(app)
require("./app/master/levelslab/routes/levelslab.js")(app)

// =================================================================================    bracnch master
require("./app/master/branch/routes/branch.routes.js")(app)
require("./app/master/companySetup/router/company_router.js")(app)
require("./app/master/plant/router/plantrouter.js")(app)
require("./app/master/assetcategory/router/assetrouter.js")(app)
require("./app/master/servicecategory/router/servicesrouter.js")(app)
require("./app/master/Itemmaster/router/itemrouter.js")(app)
require("./app/master/UOM/router/uom.router.js")(app)
require('./app/Purchase_And_Inventory/Purchase Order/router/precurement_po_router.js')(app);
/*=============================WorkFlow Routes========================================== */
require("./app/Admin_Support/workflow/routes/workflow.router.js")(app)
require("./app/master/servicemaster/router/servicemasterrouter.js")(app)
require("./app/master/product/router/productrouter.js")(app)
require("./app/Budget/router/budgetRoutes.js")(app)
require('./app/Purchase_And_Inventory/procurement management/router/procurement management_router')(app);
require('./app/Purchase_And_Inventory/GRN/router/grn_router.js')(app);
require('./app/Purchase_And_Inventory/Purchase Order/router/precurement_po_router.js')(app);
// end compnay and branch

// const invoiceRoute = require('./app/CRM/InvoiceProposal/routes/invoiceRoute.js');

app.use('/',  require('./app/CRM/CRMDocument/documentRoute.js'));
app.use('/', require("./app/CRM/LeadFormSetup/routes/leadFormSetupRoute"));
app.use('/', require('./app/CRM/MasterData/routes/masterRoute'));
app.use('/', require('./app/CRM/CreateLead/routes/createLeadRoute'));
app.use('/', require('./app/CRM/LeadSummary/routes/leadSummaryRoutes.js'));
app.use('/', require('./app/CRM/AssignUser/routes/assignUserRoute.js'));
app.use('/',  require('./app/CRM/CreateProposal/routes/createProposalRoutes.js'));
// app.use('/',createBomRouter);
app.use('/', require('./app/CRM/ProposalPayment/routes/proposalPaymentRoute.js'));
app.use('/', require('./app/CRM/Billing/routes/billingRoute.js'));
// app.use('/',invoiceRoute);
app.use('/', require('./app/Warehouse/WarehouseList/routes/warehouseRoute.js'));
app.use('/', require('./app/Warehouse/BayManagement/routes/bayManagementRoute.js'));
app.use('/', require('./app/CRM/DealClosed/routes/dealCloseRoute.js'))
app.use('/', require('./app/master/ProductService/routes/productServiceRoutes.js'))
app.use('/', require("./app/Operation_Management/Asset_Management/routes/allocationRoute.js"))
app.use('/', require("./app/Operation_Management/Asset_Management/routes/contractRoute.js"))
app.use('/', require('./app/CRM/AddPO/routes/addPoRoutes.js'))
// set port, listen for requests
const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => {
  console.log(` \u001b[1;32m Server is running on port ${PORT}. \u001b[0m`);
});

// cron.schedule('*/04 * * * *', async() => {
//     console.log("cron is running....")
//     await zohorefreshToken.CreateAccessToken()
//     // await lead_management.getAllleadmanagmentverified()
//     // await courseData.course_expire();
//     // await procurement_Controller.GetAll_CloseRFP();
//     console.log('running a task every 4 minutes!');
//     // await statusProbationdata.getAll_ra_tra_list();
// });

