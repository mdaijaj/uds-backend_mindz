const Branchmater = require('../controller/branch.controller');

module.exports = app => {
    app.post("/api/v1/create_branchSetup", Branchmater.create_Branch);
    // app.get("/api/v1/branchSetup_get/:id?", RegisterEmployee.branch_get);
    app.get("/api/v1/branch_getAll", Branchmater.branch_getAll);
    app.get("/api/v1/ActiveBranch_Setup_get/:id?", Branchmater.branch_get_active);
    app.get("/api/v1/branchSetup_get/:id?", Branchmater.branch_get);
    app.put("/api/v1/update_branchSetup/:id", Branchmater.update_branch);
    app.delete("/api/v1/delete_branchSetup/:id", Branchmater.delete_branch);
    app.put("/api/v1/branchStatus/:id", Branchmater.branchStatus);
}