const db = require("../models");
const config = require("../config/auth.config");
const emailVarify = require("../utils/validation");
const transport = require('../services/nodemailer')
const User = db.user;




exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};


exports.usersTest=(req,res)=>{
res.status(200).send("UserTestcontent.")
};

exports.officeLocation=(req,res)=>{
  res.status(200).send("UserTestcontent.")
  };
exports.leaveType=(req,res)=>{
res.status(200).send("UserTestcontent.")
    };

