const express = require("express");
const router = express.Router();

const createProposalController = require("../controllers/createProposalController");


router.get('/api/v1/getProposalCompanyData/:id', createProposalController.getProposalCompanyData);
router.post('/api/v1/createProposal', createProposalController.createProposal);
router.get('/api/v1/getProposalList', createProposalController.getProposalList);
router.patch('/api/v1/updateProposalStatus', createProposalController.updateProposalStatus);
router.get('/api/v1/proposalVersionList', createProposalController.proposalVersionList);
router.get('/api/v1/proposalVersionListById', createProposalController.proposalVersionListById);

module.exports = router;
