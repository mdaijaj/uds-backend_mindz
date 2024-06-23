const candidateShortListedController = require("../controllers/candidateShortlisted.controller");

module.exports = app => {
    app.get("/api/v1/getAllCandidateShortListed", candidateShortListedController.getAllCandidateShortListed);
    app.put("/api/v1/editCandidateShortlisted/:id", candidateShortListedController.editCandidateShortlisted);
    app.get("/api/v1/getByIdCandidateShortlisted/:id", candidateShortListedController.getByIdCandidateShortlisted);
    app.get("/api/v1/getCandidateShortlisted", candidateShortListedController.getCandidateShortlisted);
    app.get("/api/v1/getfinalCandidateShortlisted", candidateShortListedController.getfinalCandidateShortlisted);
    app.get("/api/v1/getbyidfinalCandidateShortlisted/:candidate_id", candidateShortListedController.getbyidfinalCandidateShortlisted);
    app.get("/api/v1/getfinalCandidateShortlisted", candidateShortListedController.getfinalCandidateShortlisted);
    app.get("/api/v1/getbyidfinalCandidateShortlisted/:candidate_id", candidateShortListedController.getbyidfinalCandidateShortlisted);
    app.delete("/api/v1/deletefinalCandidateShortlisted/:candidate_id", candidateShortListedController.deletefinalCandidateShortlisted);


}