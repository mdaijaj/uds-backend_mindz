const config = require("../config/db.config.js");
const Sequelize = require("sequelize");


const { fieldType, crmModule,contractLocation } = require("../CRM/MasterData/models/index");
const createLead = require('../CRM/CreateLead/model/createLead');
const createDescription = require('../CRM/CreateLead/model/description.js');
const { leadFormSetup, fieldValue } = require('../CRM/LeadFormSetup/model/index.js')
const leadSummary = require('../CRM/LeadSummary/model/leadSummary.js');
const assignUser = require('../CRM/AssignUser/model/assignUser.js');
const assignEmployee = require('../CRM/AssignUser/model/assignEmployee.js');
const { proposalData,proposalAssetList,proposalItemList,versionData,proposalServiceList,proposalOutVisitCost} = require('../CRM/CreateProposal/model/index.js');
const proposalPayment = require('../CRM/ProposalPayment/model/proposalPayment.js');
const billingData = require('../CRM/Billing/model/billing.js');
const invoiceData = require('../CRM/InvoiceProposal/model/invoice.js');
const dealClose = require('../CRM/DealClosed/model/dealClosed.js')
const itemMapping = require("../master/Itemmaster/model/itemMapping.js")
const productService = require("../master/ProductService/model/productService.js")
const productAssetItem = require("../master/ProductService/model/productAssetItem.js");
const leadService = require('../CRM/CreateLead/model/leadService.js');
const {addPo,addPoItem,addPoService,addPoAsset,addPoOVC} = require("../CRM/AddPO/model/index.js");

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.models = {
  fieldType: fieldType(sequelize, Sequelize),
  leadFormSetup: leadFormSetup(sequelize, Sequelize),
  createLead: createLead(sequelize, Sequelize),
  crmModule: crmModule(sequelize, Sequelize),
  fieldValue: fieldValue(sequelize, Sequelize),
  createDescription: createDescription(sequelize, Sequelize),
  leadSummary: leadSummary(sequelize, Sequelize),
  assignUser: assignUser(sequelize, Sequelize),
  assignEmployee: assignEmployee(sequelize, Sequelize),
  proposalData: proposalData(sequelize, Sequelize),
  proposalAssetList: proposalAssetList(sequelize, Sequelize),
  proposalPayment: proposalPayment(sequelize, Sequelize),
  billingData: billingData(sequelize, Sequelize),
  invoiceData: invoiceData(sequelize, Sequelize),
  versionData: versionData(sequelize, Sequelize),
  dealClose: dealClose(sequelize, Sequelize),
  itemMapping: itemMapping(sequelize, Sequelize),
  productService:productService(sequelize, Sequelize),
  productAssetItem:productAssetItem(sequelize, Sequelize),
  leadService:leadService(sequelize, Sequelize),
  proposalItemList:proposalItemList(sequelize, Sequelize),
  contractLocation:contractLocation(sequelize, Sequelize),
  addPo:addPo(sequelize, Sequelize),
  addPoItem:addPoItem(sequelize, Sequelize),
  addPoService:addPoService(sequelize, Sequelize),
  proposalServiceList:proposalServiceList(sequelize,Sequelize),
  proposalOutVisitCost: proposalOutVisitCost(sequelize, Sequelize),
  addPoAsset:addPoAsset(sequelize,Sequelize) ,
  addPoOVC: addPoOVC(sequelize,Sequelize)
};

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role/role.model")(sequelize, Sequelize);
db.country = require("../models/country.model.js")(sequelize, Sequelize);
db.countryss = require('../location_mapping/country/model/country.model')(sequelize, Sequelize);
db.employmenttype = require("./employment.model")(sequelize, Sequelize);
db.sbu = require("./sbu.model")(sequelize, Sequelize);
db.rolemaster = require("./rolemaster.model")(sequelize, Sequelize);
db.grade = require("./grade.model")(sequelize, Sequelize);
db.statesmaster = require("./statesmaster.model")(sequelize, Sequelize);
db.states = require('../location_mapping/states/models/states_models')(sequelize, Sequelize);
db.city = require('../location_mapping/city/models/city_models')(sequelize, Sequelize);
db.pincode = require('../location_mapping/pincode/models/pincode_models')(sequelize, Sequelize);
db.officeLocation = require("./officeLocation.model.js")(sequelize, Sequelize);
db.segment = require("../master/segment/model/segment.model.js")(sequelize, Sequelize);
db.maritalStatus = require("./maritalStatus.model.js")(sequelize, Sequelize);
db.salaryDetails = require("./salaryDetails.model.js")(sequelize, Sequelize);
db.empFamilyDetails = require("./employee_family_detail.model.js")(sequelize, Sequelize);
db.prevEmpDetail = require("./previous_employer_details.model.js")(sequelize, Sequelize);
db.empBankDetail = require('./empBankDetails.model.js')(sequelize, Sequelize);
db.empDocumentDetail = require('./empDocumentDetails.model.js')(sequelize, Sequelize);
db.empDocumentsChild = require('./emp_AddDocumentDetails.model')(sequelize, Sequelize);
// db.helpDesk = require("./helpdesk.model")(sequelize, Sequelize);
db.leaveTypes = require("./leaveTypes.model")(sequelize, Sequelize);
db.leaveShow = require("./leaveShow")(sequelize, Sequelize);
db.jobTitles = require("./jobTitles.model.js")(sequelize, Sequelize);
db.verticals = require("./verticals.model.js")(sequelize, Sequelize);
db.tableName = require("./testTable.model.js")(sequelize, Sequelize);
db.bankName = require("./bankName.model")(sequelize, Sequelize);
db.tableName = require("./testTable.model.js")(sequelize, Sequelize);
db.myPendingTask = require("../My_Pending_Task/models/my_pending_task.model")(sequelize, Sequelize);
// db.documentMaster = require("../document_master/documentmaster.model.js")(sequelize, Sequelize);
db.sales_request = require("../sales_request/model/sales_request_model")(sequelize, Sequelize);
db.notification_sales_request = require("../sales_request/model/notification_sales_model")(sequelize, Sequelize);
db.role_master = require("../role_back/role_master/model/roleMaster.model")(sequelize, Sequelize);
db.menu_master = require("../role_back/menu_master/model/menuMaster.model")(sequelize, Sequelize);
db.role_menu_access = require("../role_back/role_menu_access/model/roleMenuAccess.model")(sequelize, Sequelize);
db.role_module_master = require("../role_back/role_module_master/model/role_module_master.model.js")(sequelize, Sequelize);
db.submenu_master = require("../role_back/submenu_master/model/submenuMaster.model")(sequelize, Sequelize);
db.department = require('../master/department/model/department')(sequelize, Sequelize);
db.designation = require('../master/designation/model/designation')(sequelize, Sequelize);
db.stage = require("../Stage/models/stage.models")(sequelize, Sequelize);
db.multipleSite = require("../Multiple_Site/models/multipleSite.models")(sequelize, Sequelize);
db.new_region = require("../master/new_region/model/new_region.model.js")(sequelize, Sequelize);
db.new_spa = require("../master/new_spa/model/new_spa.model.js")(sequelize, Sequelize);
db.new_regional_business_head = require("../master/new_regional_business_head/model/new_regional_business_head.model.js")(sequelize, Sequelize);
db.customer_type = require("../master/customer_type/model/customer_type.model.js")(sequelize, Sequelize);
db.traning_name = require("../master/traning_name/model/traning_name.model.js")(sequelize, Sequelize);
db.expenseforCopy = require("../master/expenseforCopy/model/expenseforCopy.model.js")(sequelize, Sequelize);
db.director = require("../master/director/model/director.model.js")(sequelize, Sequelize);
// product to price mappings

db.verifier_status = require("../master/verifier_status/model/verifier_status.model.js")(sequelize, Sequelize);
db.itTicketing = require("../IT_ticketing/model/IT_ticketingModel")(sequelize, Sequelize);
db.itTicketing_pending_task = require("../IT_ticketing/model/it_ticketing_pending_task")(sequelize, Sequelize);
db.dqsgroupMaster = require('../DQS_Group_Master/model/DQS_Group_Master.model')(sequelize, Sequelize);
db.vendorManagement = require('../Purchase_And_Inventory/Vendor_Management/model/vendor_management.model.js')(sequelize, Sequelize);
db.bankDetails = require('../Purchase_And_Inventory/Vendor_Management/model/bank_Details.model.js')(sequelize, Sequelize);
db.dcoumentDetail = require('../Purchase_And_Inventory/Vendor_Management/model/document.model.js')(sequelize, Sequelize);
// db.districtDetails = require('../Purchase_And_Inventory/Master_Vendor_management/District/model/district.model.js')(sequelize, Sequelize);
db.leavePolicyDetail = require('../Leave_Master/Leave_Master/model/leave_master.model.js')(sequelize, Sequelize);
db.procurement = require("../Purchase_And_Inventory/procurement management/model/procurement management_model.js")(sequelize, Sequelize);
db.procurement_product = require("../Purchase_And_Inventory/procurement management/model/procurement_product.js")(sequelize, Sequelize);
db.procurement_bom_item = require("../Purchase_And_Inventory/procurement management/model/procurement_bom_item.js")(sequelize, Sequelize);
db.procurement_service = require("../Purchase_And_Inventory/procurement management/model/procurement_service_request.js")(sequelize, Sequelize);
db.procurement_Approved_level = require("../Purchase_And_Inventory/procurement management/model/procurement_Approved_level_model.js")(sequelize, Sequelize);
db.vendor_product_details = require("../Purchase_And_Inventory/procurement management/model/vendor_product_details.js")(sequelize, Sequelize);
db.certificateDataDetail = require("../Certificate_Data/model/certificate_data.model.js")(sequelize, Sequelize);
db.Currency_Convert = require('../Currency_Convert/Model/model.js')(sequelize, Sequelize);
db.PF_Data = require("../PayRoll/Providend_Fund/PF_Model/PF_model.js")(sequelize, Sequelize);
db.ESI_Data = require("../PayRoll/ESI/ESI_Model/Esi_Model.js")(sequelize, Sequelize);
db.PF_Data = require("../PayRoll/Providend_Fund/PF_Model/PF_model.js")(sequelize, Sequelize);
db.ESI_Data = require("../PayRoll/ESI/ESI_Model/Esi_Model.js")(sequelize, Sequelize);
db.Sal_structure = require("../PayRoll/Salary_Structure/Model/Sal_Structure_model.js")(sequelize, Sequelize);
db.PF_Data = require("../PayRoll/Providend_Fund/PF_Model/PF_model.js")(sequelize, Sequelize);
db.ESI_Data = require("../PayRoll/ESI/ESI_Model/Esi_Model.js")(sequelize, Sequelize);
db.PF_Data = require("../PayRoll/Providend_Fund/PF_Model/PF_model.js")(sequelize, Sequelize)
db.ESI_Data = require("../PayRoll/ESI/ESI_Model/Esi_Model.js")(sequelize, Sequelize)
// db.Sal_structure = require("../PayRoll/Salary_Structure/Model/Sal_Structure_model.js")(sequelize, Sequelize)
db.PF_Data = require("../PayRoll/Providend_Fund/PF_Model/PF_model.js")(sequelize, Sequelize)
db.ESI_Data = require("../PayRoll/ESI/ESI_Model/Esi_Model.js")(sequelize, Sequelize)
db.PF_Data = require("../PayRoll/Providend_Fund/PF_Model/PF_model.js")(sequelize, Sequelize)
db.ESI_Data = require("../PayRoll/ESI/ESI_Model/Esi_Model.js")(sequelize, Sequelize)
db.expense_invoice = require("../account payable/Expense invoice/model/expense_invoice_model.js")(sequelize, Sequelize);
db.vendor_invoice = require("../account payable/vendor invoice/model/vendor_invoice_model.js")(sequelize, Sequelize);
db.auditor_invoice = require("../account payable/auditor invoice/model/auditor_invoice_model.js")(sequelize, Sequelize);
db.Courier_Inward = require('../Admin_Support/Courier_Inward/model/Courier_Inward.model.js')(sequelize, Sequelize)
db.Courier_Contains = require('../Admin_Support/Courier_Contains/model/Courier_Contains.model.js')(sequelize, Sequelize)
db.Courier_Service_name = require("../Admin_Support/Courier_Service_name/model/Courier_Service_name.model.js")(sequelize, Sequelize)
db.AMC_Agreement = require('../Admin_Support/AMC_Agreement/model/AMC_Agreement.model.js')(sequelize, Sequelize)
/////
db.Onboarding_data = require("../candidate_onboarding/onboarding_model.js")(sequelize, Sequelize)
db.read_write_access = require('../role_back/role_menu_access/model/read_write_access.js')(sequelize, Sequelize)
db.AMC_AgreementOtherDoc = require('../Admin_Support/AMC_Agreement/model/AMC_Other_document.model.js')(sequelize, Sequelize)
db.Courier_Outward = require('../Admin_Support/Courier_Outward/model/Courier_Outward.model.js')(sequelize, Sequelize)
db.Rental_Aggrement = require('../Admin_Support/Rental_Aggrement/model/Rental_Aggrement..model.js')(sequelize, Sequelize)
db.house_Agreement = require('../Admin_Support/Security_Agreement/model/house_Agreement.model.js')(sequelize, Sequelize)
db.Policy = require('../Admin_Support/Policy/model/Policy.model.js')(sequelize, Sequelize)
db.Insurance = require('../Admin_Support/Insurance/model/Insurance.model.js')(sequelize, Sequelize)
db.Events = require('../Admin_Support/Event/model/Event.model.js')(sequelize, Sequelize)
db.AMC_AgreementOtherDoc = require('../Admin_Support/AMC_Agreement/model/AMC_Other_document.model.js')(sequelize, Sequelize)
db.Complaints_Remote = require('../Admin_Support/Complaints_Remote/model/Complaints_Remote.model.js')(sequelize, Sequelize)
db.Facility_Remote = require('../Admin_Support/Facility_Remote/model/Facility_Remote.model.js')(sequelize, Sequelize)
db.Rental_documentDoc = require('../Admin_Support/Rental_Aggrement/model/Rental_document.model.js')(sequelize, Sequelize)
db.house_Agreement_doc = require('../Admin_Support/Security_Agreement/model/house_Agreement_doc.js')(sequelize, Sequelize)
db.Insurance_doc = require('../Admin_Support/Insurance/model/Insurance_doc.js')(sequelize, Sequelize)
db.forex_currency = require('../Admin_Support/forex_currency/model/forex_currency_model.js')(sequelize, Sequelize)
// db.po_details = require('../Purchase_And_Inventory/procurement management/model/po_data.js')(sequelize, Sequelize)
db.auditor_booking = require("../sales_request/model/auditor_booking_model.js")(sequelize, Sequelize)

// db.updateDocument = require("../Lead_Managment/models/upload_document.js")(sequelize, Sequelize)
db.Language_Master = require("../language_master/language_model.js")(sequelize, Sequelize)
db.description_model = require("../Admin_Support/Description_master_amc/model/description_model.js")(sequelize, Sequelize)
db.amc_notification = require("../Admin_Support/AMC_notification/Model/notification_model.js")(sequelize, Sequelize)
db.hrms_notification_data = require("../HRMS_notification/model/hrms_notification.js")(sequelize, Sequelize)
db.Onboarding_document_data = require("../candidate_onboarding/onboardng_document_details.js")(sequelize, Sequelize)
db.emp_sign_data = require("../employee_signature/emp_sign_model.js")(sequelize, Sequelize)
db.expense_master = require("../master/expense/model/expense_master.js")(sequelize, Sequelize)

db.employee_salary = require("../PayRoll/employees_Salary/employee_Salary_model.js")(sequelize, Sequelize)

// Master APIs
db.tbl_branch = require("../master/branch/models/branch.models.js")(sequelize, Sequelize)
db.company = require("../master/companySetup/models/company_model.js")(sequelize, Sequelize)
db.plantmaster = require("../master/plant/models/plantmodel.js")(sequelize, Sequelize)
db.asset = require("../master/assetcategory/model/assetmodel.js")(sequelize, Sequelize)
db.ServicesCategory = require("../master/servicecategory/model/servicesmodel.js")(sequelize, Sequelize)
db.itemSpecification = require("../master/Itemmaster/model/itemSpecificationModel.js")(sequelize, Sequelize)
db.ItemMaster = require("../master/Itemmaster/model/Itemmodel.js")(sequelize, Sequelize)
db.uomdetails = require("../master/UOM/model/uom.model.js")(sequelize, Sequelize)
db.Work_Flow = require("../Admin_Support/workflow/models/workflow.model.js")(sequelize, Sequelize)
db.Service_master = require("../master/servicemaster/models/servicemastermodels.js")(sequelize,Sequelize);
db.product_master = require("../master/product/model/productmodel.js")(sequelize,Sequelize);
db.product__variant_master = require("../master/product/model/product_variant.js")(sequelize,Sequelize);

db.workflowmap = require("../Admin_Support/workflow/models/workflow_map.model.js")(sequelize,Sequelize);
db.workflowrange = require("../Admin_Support/workflow/models/workflow_range.model.js")(sequelize,Sequelize);
db.quotation_currency = require("../master/lead_management_master/quotation_currency/model/quotation_currency.model.js")(sequelize,Sequelize);
db.level_slab = require("../master/levelslab/model/levelslab.js")(sequelize,Sequelize);


// Production API
db.warehouse = require("../Warehouse/WarehouseList/model/warehouse.js")(sequelize, Sequelize);
db.bayManagement = require("../Warehouse/BayManagement/model/bayManagement.js")(sequelize, Sequelize);
db.bayBlock = require("../Warehouse/BayManagement/model/bayBlock.js")(sequelize, Sequelize);
db.bayBlockBay = require("../Warehouse/BayManagement/model/bayBlockBay.js")(sequelize, Sequelize);
db.allocation = require("../Operation_Management/Asset_Management/model/allocation.js")(sequelize, Sequelize);
db.tbl_budget = require("../Budget/model/bugetModel.js")(sequelize, Sequelize)
db.tbl_budgetMapping = require("../Budget/model/budgetMappingModel.js")(sequelize, Sequelize)
db.logs_table = require("../Purchase_And_Inventory/procurement management/model/logs_model.js")(sequelize, Sequelize);
db.procurement = require("../Purchase_And_Inventory/procurement management/model/procurement management_model.js")(sequelize, Sequelize);
db.procurement_Approved_level = require("../Purchase_And_Inventory/procurement management/model/procurement_Approved_level_model.js")(sequelize, Sequelize);
db.procurement_bom_item = require("../Purchase_And_Inventory/procurement management/model/procurement_bom_item.js")(sequelize, Sequelize);
db.procurement_product = require("../Purchase_And_Inventory/procurement management/model/procurement_product.js")(sequelize, Sequelize);
db.procurement_service = require("../Purchase_And_Inventory/procurement management/model/procurement_service_request.js")(sequelize, Sequelize);
db.vendor_product_details = require("../Purchase_And_Inventory/procurement management/model/vendor_product_details.js")(sequelize, Sequelize);

db.grnPurchase = require("../Purchase_And_Inventory/GRN/model/grnModel.js")(sequelize, Sequelize);
db.grnItem = require("../Purchase_And_Inventory/GRN/model/grnItem.js")(sequelize, Sequelize);
db.grnItemStatus = require("../Purchase_And_Inventory/GRN/model/grnItemStatus.js")(sequelize, Sequelize);
db.procurement_po_details= require("../Purchase_And_Inventory/Purchase Order/model/procurement_po_data.js")(sequelize, Sequelize);
db.procurement_po_items= require("../Purchase_And_Inventory/Purchase Order/model/procurement_po_item.js")(sequelize, Sequelize);
db.procurement_po_services= require("../Purchase_And_Inventory/Purchase Order/model/procurement_po_service.js")(sequelize, Sequelize);
db.procurement_po_Approved_level = require("../Purchase_And_Inventory/Purchase Order/model/procurement_po_Approved_level_model.js")(sequelize, Sequelize);
db.procurement_Approved_level = require("../Purchase_And_Inventory/procurement management/model/procurement_Approved_level_model.js")(sequelize, Sequelize);
db.po_log_details= require("../Purchase_And_Inventory/Purchase Order/model/po_budget_log_table.js")(sequelize, Sequelize);

/////////////////////////////////////////////// Relation ///////////////////////////////////////////////

// db.LeadManagment2.belongsTo(db.LeadManagment, {
//   through: "LeadManagment",
//   foreignKey: "lead_genration_id"
// });
// db.emp_sign_data.hasMany(db.user, {
//   throgh: "registered_users",
//   foreignKey: "employee_id"
// });


// db.documentMaster.belongsTo(db.user, {
//   throgh: "registered_users",
//   foreignKey: "employee_id"
// });

db.menu_master.hasMany(db.submenu_master, {
  throgh: "submenu_masters",
  foreignKey: "menu_master_id",
  otherKey: "menu_master_details_id"
});


db.submenu_master.belongsTo(db.menu_master, {
  through: "menu_masters",
  foreignKey: 'submenu_master_id',
  otherKey: "submenu_master_details_id"
});


// db.expenserequest.hasMany(db.expensechild, {
//   throgh: "expensechild",
//   foreignKey: "expense_id",
//   otherKey: " expensechildId"
// });

db.submenu_master.belongsTo(db.menu_master, {
  through: "menu_masters",
  foreignKey: 'submenu_master_id',
  otherKey: "submenu_master_details_id"
});

db.role_menu_access.belongsTo(db.role_master, {
  through: "role_masters",
  foreignKey: 'role_master_id',
});

db.role_menu_access.belongsTo(db.user, {
  through: "registered_users",
  foreignKey: 'employee_id',
});

db.user.hasMany(db.role_menu_access, {
  throgh: "role_menu_accesses",
  foreignKey: "employee_id"
});

db.role_menu_access.belongsTo(db.role_module_master, {
  through: "role_module_masters",
  foreignKey: 'role_module_master_id',
});

db.role_menu_access.belongsTo(db.menu_master, {
  through: "menu_masters",
  foreignKey: 'menu_master_id',
});

db.role_menu_access.belongsTo(db.submenu_master, {
  through: "submenu_masters",
  foreignKey: 'submenu_master_id',
});

db.role_menu_access.belongsTo(db.role_master, {
  through: "role_masters",
  foreignKey: "role_master_id",
  otherKey: "role_master_details_id"
});

db.user.hasMany(db.empFamilyDetails, {
  throgh: "employee_family_details",
  foreignKey: "employee_id",
  otherKey: "empFamilyDetailId"
});

db.user.hasMany(db.prevEmpDetail, {
  throgh: "prev_emp_details",
  foreignKey: "employee_id",
  otherKey: "prevEmpDetailId"
});

db.user.hasMany(db.empBankDetail, {
  throgh: "emp_bank_details",
  foreignKey: 'employee_id',
});

db.states.belongsTo(db.countryss, {
  throgh: "countryss",
  foreignKey: "countryss_id"
});

db.city.belongsTo(db.states, {
  throgh: "states",
  foreignKey: "states_id"
});

db.pincode.belongsTo(db.city, {
  throgh: "city",
  foreignKey: "city_id"
});


db.new_region.belongsTo(db.segment, {
  throgh: "segment",
  foreignKey: "segment_id"
});

db.segment.hasMany(db.new_region, {
  throgh: "new_region",
  foreignKey: "segment_id"
});

db.new_spa.belongsTo(db.segment, {
  throgh: "segment",
  foreignKey: "segment_id"
});

db.segment.hasMany(db.new_spa, {
  throgh: "new_spa",
  foreignKey: "segment_id"
});




// db.newTraning.hasMany(db.branch, {
//   throgh: "branch",
//   foreignKey: "branch_id"
// });

db.role_master.belongsTo(db.user, {
  throgh: "role_master",
  foreignKey: "role_master_id"
});

db.user.hasMany(db.role_master, {
  throgh: "role_master",
  foreignKey: "role_master_id"
});

// db.myexpenses.belongsTo(db.expenserequest, {
//   through: "travel_request",
//   otherKey: "myexpenseId"
// });

// db.myexpenses.hasMany(db.expensedetails, {
//   throgh: "expenses_detail",
//   foreignKey: "myexpense_id",
//   otherKey: " expensedetailsId"
// });

db.new_regional_business_head.belongsTo(db.new_region, {
  throgh: "new_region",
  foreignKey: "new_region_id"
});

db.new_region.hasMany(db.new_regional_business_head, {
  throgh: "new_regional_business_head",
  foreignKey: "new_region_id"
});

db.new_regional_business_head.belongsTo(db.user, {
  throgh: "registered_users",
  foreignKey: "employee_id"
});

db.user.hasMany(db.new_regional_business_head, {
  throgh: "new_regional_business_head",
  foreignKey: "employee_id"
});

db.bankDetails.belongsTo(db.vendorManagement, {
  throgh: "vendor_management",
  foreignKey: "vendor_management_id"
});

db.vendorManagement.hasMany(db.bankDetails, {
  throgh: "vendor_management_bank_details",
  foreignKey: "vendor_management_id"
});

db.dcoumentDetail.belongsTo(db.vendorManagement, {
  throgh: "vendor_management",
  foreignKey: "vendor_management_id"
});

db.vendorManagement.hasMany(db.dcoumentDetail, {
  throgh: "vendor_management_document",
  foreignKey: "vendor_management_id"
});

db.procurement_product.belongsTo(db.procurement, {
  throgh: "procurement_product_request",
  foreignKey: "procurement_id"
});


db.ESI_Data.belongsTo(db.user, {
  through: "esi_data",
  foreignKey: "employee_id"
});

db.PF_Data.belongsTo(db.user, {
  through: "providend_funds",
  foreignKey: "employee_id"
});

db.AMC_AgreementOtherDoc.belongsTo(db.AMC_Agreement, {
  throgh: "AMC_Agreement",
  foreignKey: "amc_agreement_id"
});

db.AMC_Agreement.hasMany(db.AMC_AgreementOtherDoc, {
  throgh: "AMC_Agreement_other_doc",
  foreignKey: "amc_agreement_id"
});

db.Rental_documentDoc.belongsTo(db.Rental_Aggrement), {
  throgh: "Rental_Aggrement",
  foreignKey: "rental_aggrement_id"
}
db.Rental_Aggrement.hasMany(db.Rental_documentDoc), {
  throgh: "Rental_document",
  foreignKey: "rental_aggrement_id"
}

db.AMC_AgreementOtherDoc.belongsTo(db.AMC_Agreement, {
  throgh: "AMC_Agreement",
  foreignKey: "amc_agreement_id"
});

db.AMC_Agreement.hasMany(db.AMC_AgreementOtherDoc, {
  throgh: "AMC_Agreement_other_doc",
  foreignKey: "amc_agreement_id"
});

db.Rental_documentDoc.belongsTo(db.Rental_Aggrement, {
  throgh: "Rental_Aggrement",
  foreignKey: "rental_aggrement_id"
});

db.Rental_Aggrement.hasMany(db.Rental_documentDoc, {
  throgh: "Rental_document",
  foreignKey: "rental_aggrement_id"
});

db.house_Agreement_doc.belongsTo(db.house_Agreement, {
  throgh: "house_Agreement",
  foreignKey: "security_agreement_id"
});

db.house_Agreement.hasMany(db.house_Agreement_doc, {
  throgh: "house_Agreement_doc",
  foreignKey: "security_agreement_id"
});

db.Insurance_doc.belongsTo(db.Insurance, {
  throgh: "Insurance",
  foreignKey: "insurance_id"
});

db.Insurance.hasMany(db.Insurance_doc, {
  throgh: "Insurance_doc",
  foreignKey: "insurance_id"
});

db.procurement_product.belongsTo(db.procurement, {
  throgh: "procurement_product_request",
  foreignKey: "procurement_id"
});



db.models.fieldType.hasMany(db.models.leadFormSetup, { foreignKey: "field_type_id" ,onDelete: 'RESTRICT' });
db.models.leadFormSetup.hasOne(db.models.fieldValue, { foreignKey: "lead_form_id",onDelete: 'RESTRICT' });
db.models.createLead.hasOne(db.models.leadService,{foreignKey:'lead_id',onDelete: 'RESTRICT'});
db.models.productService.hasOne(db.models.leadService, { foreignKey: "product_service_id" ,onDelete: 'RESTRICT'});
db.user.hasOne(db.models.createLead, { foreignKey: "login_id" ,onDelete: 'RESTRICT'});
db.countryss.hasOne(db.tbl_branch, { foreignKey: 'country_id',onDelete: 'RESTRICT' })
db.states.hasOne(db.tbl_branch, { foreignKey: 'state_id',onDelete: 'RESTRICT' })
db.city.hasOne(db.tbl_branch, { foreignKey: 'city_id' ,onDelete: 'RESTRICT'})
db.countryss.hasMany(db.plantmaster, { foreignKey: 'country_id',onDelete: 'RESTRICT' })
db.plantmaster.belongsTo(db.countryss, { foreignKey: 'country_id' })
db.states.hasMany(db.plantmaster, { foreignKey: 'state_id',onDelete: 'RESTRICT' })
db.plantmaster.belongsTo(db.states, { foreignKey: 'state_id' })
db.city.hasOne(db.plantmaster, { foreignKey: 'city_id',onDelete: 'RESTRICT' })
db.uomdetails.hasOne(db.ItemMaster, { foreignKey: 'uom_id' ,onDelete: 'RESTRICT'})
db.ItemMaster.belongsTo(db.uomdetails, { foreignKey: 'uom_id' });
db.ItemMaster.hasMany(db.itemSpecification, { foreignKey: 'item_id' ,onDelete: 'RESTRICT'});
db.asset.hasOne(db.ItemMaster, { foreignKey: 'asset_id',onDelete: 'RESTRICT' })
db.ItemMaster.belongsTo(db.asset, { foreignKey: 'asset_id' });
db.user.hasOne(db.models.createLead, { foreignKey: "user_id",onDelete: 'RESTRICT' });
db.models.createLead.belongsTo(db.user, { foreignKey: "user_id" });
db.models.createLead.hasOne(db.models.createDescription, { foreignKey: 'create_lead_id' ,onDelete: 'RESTRICT'})
db.ServicesCategory.hasOne(db.Service_master, { foreignKey: 'service_category_id' ,onDelete: 'RESTRICT'})
db.uomdetails.hasOne(db.product__variant_master, { foreignKey: 'uom_id',onDelete: 'RESTRICT' })
db.product__variant_master.belongsTo(db.uomdetails, { foreignKey: 'uom_id' })
db.product_master.hasMany(db.product__variant_master, { foreignKey: 'product_master_id' ,onDelete: 'RESTRICT'})
db.product__variant_master.belongsTo(db.product_master, { foreignKey: 'product_master_id' })
db.Service_master.belongsTo(db.ServicesCategory, { foreignKey: 'service_category_id' })
db.models.createLead.hasOne(db.models.leadSummary, { foreignKey: 'create_lead_id',onDelete: 'RESTRICT' })
db.user.hasOne(db.models.leadSummary, { foreignKey: 'assign_id',onDelete: 'RESTRICT' })
db.user.hasOne(db.models.assignUser, { foreignKey: 'employee_id',onDelete: 'RESTRICT' });
db.role_master.hasOne(db.models.assignUser, { foreignKey: 'role_id',onDelete: 'RESTRICT' });
db.tbl_branch.hasOne(db.models.assignUser, { foreignKey: 'branch_id',onDelete: 'RESTRICT' });
db.user.hasOne(db.models.assignUser, { foreignKey: 'login_id' ,onDelete: 'RESTRICT'});
db.tbl_branch.hasOne(db.user, { foreignKey: 'branch_id' ,onDelete: 'RESTRICT'})
db.models.assignUser.hasOne(db.models.assignEmployee, { foreignKey: 'assign_user_id',onDelete: 'RESTRICT' });
db.user.hasOne(db.models.assignEmployee, { foreignKey: 'assign_id' ,onDelete: 'RESTRICT'});
db.models.createLead.hasOne(db.models.proposalData, { foreignKey: "create_lead_id" ,onDelete: 'RESTRICT'});
db.models.proposalData.hasOne(db.models.proposalAssetList, { foreignKey: "proposal_id" ,onDelete: 'RESTRICT'});
db.asset.hasOne(db.models.proposalAssetList, { foreignKey: "asset_category_id",onDelete: 'RESTRICT' });
db.user.hasOne(db.models.proposalData, { foreignKey: "employee_id",onDelete: 'RESTRICT' });
db.models.proposalData.hasOne(db.models.proposalPayment, { foreignKey: "proposal_id" ,onDelete: 'RESTRICT'});
db.tbl_branch.hasOne(db.models.billingData, { foreignKey: "branch_id" ,onDelete: 'RESTRICT'});
db.models.proposalData.hasOne(db.models.billingData, { foreignKey: "proposal_id" ,onDelete: 'RESTRICT'});
db.models.proposalData.hasOne(db.models.invoiceData, { foreignKey: "proposal_id" ,onDelete: 'RESTRICT'});
db.models.invoiceData.belongsTo(db.models.proposalData, { foreignKey: "proposal_id" });
db.models.billingData.hasOne(db.models.invoiceData, { foreignKey: "billing_id",onDelete: 'RESTRICT' });
db.models.proposalData.hasOne(db.models.versionData, { foreignKey: "proposal_id" ,onDelete: 'RESTRICT'});
db.models.proposalData.hasOne(db.models.dealClose, { foreignKey: "proposal_id",onDelete: 'RESTRICT' });
db.models.versionData.hasOne(db.models.dealClose, { foreignKey: "version_id" ,onDelete: 'RESTRICT'});
db.models.versionData.hasOne(db.models.proposalAssetList, { foreignKey: "version_id",onDelete: 'RESTRICT' });
db.models.versionData.hasOne(db.models.proposalItemList, { foreignKey: "version_id",onDelete: 'RESTRICT' });
db.user.hasOne(db.procurement, { foreignKey: "employee_id",onDelete: 'RESTRICT' });
db.asset.hasOne(db.procurement_product, { foreignKey: "asset_category_id",onDelete: 'RESTRICT' });
db.ItemMaster.hasOne(db.procurement_product, { foreignKey: "item_id",onDelete: 'RESTRICT' });
db.ItemMaster.hasMany(db.procurement_bom_item, { foreignKey: "item_id",onDelete: 'RESTRICT' });
db.procurement_bom_item.belongsTo(db.ItemMaster, { foreignKey: "item_id" });
db.procurement.hasMany(db.procurement_product, { foreignKey: "procurement_id",onDelete: 'RESTRICT' });
db.procurement.hasMany(db.procurement_bom_item, { foreignKey: "procurement_id",onDelete: 'RESTRICT' });
db.procurement.hasMany(db.procurement_service, { foreignKey: "procurement_id",onDelete: 'RESTRICT' });
db.ServicesCategory.hasOne(db.procurement_service, { foreignKey: "service_category_id" ,onDelete: 'RESTRICT'});
db.Service_master.hasOne(db.procurement_service, { foreignKey: "service_id",onDelete: 'RESTRICT' });
db.product_master.hasMany(db.procurement_bom_item, { foreignKey: "product_id",onDelete: 'RESTRICT' });
db.Work_Flow.hasMany(db.workflowmap, { foreignKey: "workflowId",onDelete: 'RESTRICT' });
db.user.hasMany(db.workflowmap, { foreignKey: "workflow_employeeId",onDelete: 'RESTRICT' });
db.workflowmap.belongsTo(db.user, { foreignKey: "workflow_employeeId" });
db.user.hasOne(db.workflowrange, { foreignKey: "workflowrange_employeeId",onDelete: 'RESTRICT' });
db.Work_Flow.hasMany(db.workflowrange, { foreignKey: "workFlow_id",onDelete: 'RESTRICT' });
db.workflowrange.belongsTo(db.Work_Flow, { foreignKey: "workFlow_id" });
db.procurement.hasMany(db.procurement_Approved_level, { foreignKey: "procurement_id" ,onDelete: 'RESTRICT'});
db.user.hasMany(db.procurement_Approved_level, { foreignKey: "employee_id" ,onDelete: 'RESTRICT'});
db.workflowrange.hasMany(db.procurement_Approved_level, { foreignKey: "workflow_range_id",onDelete: 'RESTRICT' });
db.plantmaster.hasOne(db.warehouse, { foreignKey: "plant_id",onDelete: 'RESTRICT' });
db.user.hasOne(db.warehouse, { foreignKey: "employee_id" ,onDelete: 'RESTRICT'});
db.role_master.hasOne(db.warehouse, { foreignKey: "role_id",onDelete: 'RESTRICT' });
db.warehouse.hasOne(db.bayManagement, { foreignKey: 'warehouse_id' ,onDelete: 'RESTRICT'});
db.plantmaster.hasOne(db.bayManagement, { foreignKey: "plant_id",onDelete: 'RESTRICT' });
db.bayManagement.hasOne(db.bayBlock, { foreignKey: "bay_id",onDelete: 'RESTRICT' });
db.bayBlock.hasMany(db.bayBlockBay, { foreignKey: "block_id",onDelete: 'RESTRICT' })
db.asset.hasOne(db.models.itemMapping, { foreignKey: "asset_category_id",onDelete: 'RESTRICT' });
db.models.itemMapping.belongsTo(db.asset, { foreignKey: "asset_category_id" });
db.ItemMaster.hasOne(db.models.itemMapping, { foreignKey: "item_id" ,onDelete: 'RESTRICT'});
db.models.itemMapping.belongsTo(db.ItemMaster, { foreignKey: "item_id" });
db.ItemMaster.hasOne(db.models.itemMapping, { foreignKey: "primary_item_id" });
db.models.productService.hasOne(db.models.productAssetItem, { foreignKey: "product_service_id",onDelete: 'RESTRICT' });
db.asset.hasOne(db.models.productAssetItem, { foreignKey: "asset_category_id",onDelete: 'RESTRICT' });
db.ItemMaster.hasOne(db.models.productAssetItem, { foreignKey: "item_id" ,onDelete: 'RESTRICT'});
db.models.proposalData.hasOne(db.models.proposalItemList,{foreignKey:'proposal_id' ,onDelete: 'RESTRICT'});
db.ItemMaster.hasOne(db.models.proposalItemList,{foreignKey:'item_id' ,onDelete: 'RESTRICT'});
db.asset.hasOne(db.models.proposalItemList,{foreignKey:'asset_category_id' ,onDelete: 'RESTRICT'});
db.department.hasOne(db.tbl_budget, { foreignKey: 'department_id' ,onDelete: 'RESTRICT'});
db.user.hasOne(db.tbl_budget, { foreignKey: "employee_id",onDelete: 'RESTRICT' })
db.tbl_budget.hasOne(db.tbl_budgetMapping, { foreignKey: "budget_id" ,onDelete: 'RESTRICT'})
db.workflowrange.hasMany(db.logs_table, { foreignKey: "workflow_range_id",onDelete: 'RESTRICT' })
db.user.hasMany(db.logs_table, { foreignKey: "employee_id",onDelete: 'RESTRICT' })
db.procurement.hasMany(db.logs_table, { foreignKey: "procurement_id",onDelete: 'RESTRICT' })
db.procurement_bom_item.belongsTo(db.procurement, { foreignKey: "procurement_id" });
db.ItemMaster.hasMany(db.procurement_product, { foreignKey: "item_id",onDelete: 'RESTRICT' });
db.procurement_product.belongsTo(db.ItemMaster, { foreignKey: "item_id",onDelete: 'RESTRICT' });
db.procurement_product.belongsTo(db.procurement, { foreignKey: "procurement_id" });
db.procurement_service.belongsTo(db.procurement, { foreignKey: "procurement_id"});
db.procurement_service.belongsTo(db.Service_master, { foreignKey: "service_id",onDelete: 'RESTRICT' });

db.user.hasOne(db.procurement_po_details, { foreignKey: "employee_id",onDelete: 'RESTRICT' });
db.asset.hasOne(db.procurement_po_items, { foreignKey: "asset_category_id",onDelete: 'RESTRICT' });
db.ItemMaster.hasMany(db.procurement_po_items, { foreignKey: "item_id",onDelete: 'RESTRICT' });
db.procurement_po_items.belongsTo(db.ItemMaster, { foreignKey: "item_id" });

db.procurement_po_details.hasMany(db.procurement_po_items, { foreignKey: "po_id",onDelete: 'RESTRICT' });
db.procurement_po_items.belongsTo(db.procurement_po_details, { foreignKey: "po_id" });
db.procurement_po_details.hasMany(db.procurement_po_services, { foreignKey: "po_id",onDelete: 'RESTRICT' });
db.procurement_po_services.belongsTo(db.procurement_po_details, { foreignKey: "po_id"});
db.ServicesCategory.hasOne(db.procurement_po_services, { foreignKey: "service_category_id" ,onDelete: 'RESTRICT'});
db.Service_master.hasOne(db.procurement_po_services, { foreignKey: "service_id",onDelete: 'RESTRICT' });
db.procurement_po_services.belongsTo(db.Service_master, { foreignKey: "service_id",onDelete: 'RESTRICT' });
db.user.hasMany(db.procurement_po_services, { foreignKey: "employee_id",onDelete: 'RESTRICT' })
db.procurement_po_details.hasMany(db.grnPurchase,{foreignKey: "PO_Id",onDelete: 'RESTRICT'})
db.grnPurchase.belongsTo(db.procurement_po_details,{foreignKey: "PO_Id"})
db.procurement_po_details.hasMany(db.procurement_po_Approved_level, { foreignKey: "po_id" ,onDelete: 'RESTRICT'});
db.user.hasMany(db.procurement_po_Approved_level, { foreignKey: "employee_id" ,onDelete: 'RESTRICT'});
db.workflowrange.hasMany(db.procurement_po_Approved_level, { foreignKey: "workflow_range_id",onDelete: 'RESTRICT' });
db.tbl_branch.hasMany(db.procurement_po_details, { foreignKey: "branch_id" ,onDelete: 'RESTRICT'});
db.procurement_po_details.belongsTo(db.tbl_branch, { foreignKey: "branch_id"});

db.procurement_po_details.hasMany(db.grnPurchase,{foreignKey: "PO_Id",onDelete: 'RESTRICT'})
db.grnPurchase.belongsTo(db.procurement_po_details,{foreignKey: "PO_Id"})

db.procurement_po_items.hasMany(db.grnItemStatus,{foreignKey: "po_item_id",onDelete: 'RESTRICT'})
db.grnItemStatus.belongsTo(db.procurement_po_items,{foreignKey: "po_item_id"})

db.procurement_po_items.hasMany(db.grnItem,{foreignKey: "Item_Id",onDelete: 'RESTRICT'})
db.grnItem.belongsTo(db.procurement_po_items,{foreignKey: "Item_Id"})

db.grnPurchase.hasMany(db.grnItem,{foreignKey: "grn_Id",onDelete: 'RESTRICT'})
db.grnItem.belongsTo(db.grnPurchase,{foreignKey: "grn_Id"})

db.procurement_po_items.hasMany(db.grnItemStatus,{foreignKey: "Item_Id",onDelete: 'RESTRICT'})
db.grnItemStatus.belongsTo(db.procurement_po_items,{foreignKey: "Item_Id"})

db.grnItem.hasMany(db.grnItemStatus,{foreignKey: "grn_Item_Id",onDelete: 'RESTRICT'})
db.grnItemStatus.belongsTo(db.grnItem,{foreignKey: "grn_Item_Id"})

db.procurement_po_items.hasMany(db.grnItem,{foreignKey: "po_item_id",onDelete: 'RESTRICT'})
db.grnItem.belongsTo(db.procurement_po_items,{foreignKey: "po_item_id"})

db.ItemMaster.hasMany(db.grnItemStatus,{foreignKey: "Item_Id",onDelete: 'RESTRICT'})
db.grnItemStatus.belongsTo(db.ItemMaster,{foreignKey: "Item_Id"})

db.ItemMaster.hasMany(db.grnItem,{foreignKey: "Item_Id",onDelete: 'RESTRICT'})
db.grnItem.belongsTo(db.ItemMaster,{foreignKey: "Item_Id"})

db.ItemMaster.hasMany(db.grnItem,{foreignKey: "Item_Id",onDelete: 'RESTRICT'})
db.grnItem.belongsTo(db.ItemMaster,{foreignKey: "Item_Id"})

db.procurement.hasMany(db.vendor_product_details, { foreignKey: "procurement_id" ,onDelete: 'RESTRICT'});
db.procurement_bom_item.hasMany(db.vendor_product_details, { foreignKey: "procurement_bomItem_id",onDelete: 'RESTRICT' })
db.procurement_service.hasMany(db.vendor_product_details, { foreignKey: "procurement_service_id",onDelete: 'RESTRICT' })

db.models.dealClose.hasOne(db.models.addPo, { foreignKey: "deal_close_id",onDelete: 'RESTRICT'});
db.tbl_branch.hasOne(db.models.addPo, { foreignKey: "branch_id",onDelete: 'RESTRICT'});
db.models.contractLocation.hasOne(db.models.addPo, { foreignKey: "location_id",onDelete: 'RESTRICT'})
db.models.addPo.hasOne(db.models.addPoService,{foreignKey: "add_po_id",onDelete: 'RESTRICT'})
db.models.addPo.hasOne(db.models.addPoItem,{foreignKey: "add_po_id",onDelete: 'RESTRICT'})
db.models.proposalItemList.hasOne(db.models.addPoItem,{foreignKey:'proposal_item_id' ,onDelete: 'RESTRICT'});
db.models.proposalServiceList.hasOne(db.models.addPoService,{foreignKey:'service_id' ,onDelete: 'RESTRICT'});
db.models.proposalData.hasOne(db.models.proposalServiceList,{foreignKey:'proposal_id' ,onDelete: 'RESTRICT'});
db.asset.hasOne(db.models.proposalServiceList,{foreignKey:'asset_category_id' ,onDelete: 'RESTRICT'});
db.ItemMaster.hasOne(db.models.proposalServiceList,{foreignKey:'item_id' ,onDelete: 'RESTRICT'});
db.models.proposalData.hasOne(db.models.proposalOutVisitCost,{foreignKey:'proposal_id' ,onDelete: 'RESTRICT'});
db.asset.hasOne(db.models.proposalOutVisitCost,{foreignKey:'asset_category_id' ,onDelete: 'RESTRICT'});
db.ItemMaster.hasOne(db.models.proposalOutVisitCost,{foreignKey:'item_id' ,onDelete: 'RESTRICT'});
db.models.versionData.hasOne(db.models.proposalOutVisitCost, { foreignKey: "version_id" ,onDelete: 'RESTRICT'});
db.models.versionData.hasOne(db.models.proposalServiceList, { foreignKey: "version_id" ,onDelete: 'RESTRICT'});
db.models.addPo.hasOne(db.models.addPoAsset,{foreignKey: "add_po_id",onDelete: 'RESTRICT'})
db.models.proposalAssetList.hasOne(db.models.addPoAsset,{foreignKey:'proposal_asset_id' ,onDelete: 'RESTRICT'});
db.models.addPo.hasOne(db.models.addPoOVC,{foreignKey: "add_po_id",onDelete: 'RESTRICT'})
db.models.proposalOutVisitCost.hasOne(db.models.addPoOVC,{foreignKey:'out_visit_cost_id' ,onDelete: 'RESTRICT'});
module.exports = db;