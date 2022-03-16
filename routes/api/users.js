const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const keys = require("../../config/keys");

const AuthUser = require("../../models/AuthUser");
const Templates = require("../../models/Templates");

// register
router.post("/register", (req,res) => {
    AuthUser.findOne({ user_name: req.body.formdata.username }).then(user => {
        if (user) {
            return res.status(400).json({ user_id: "User Id already exists"});
        } else {
            const newUser = new AuthUser({
                user_name: req.body.formdata.username,
                user_pass: req.body.formdata.userpass,
            });
            newUser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
        }
    });
});

// login
router.post("/login", (req, res) => {
    console.log(req.body.formdata.username);
    AuthUser.findOne({user_name: req.body.formdata.username , user_pass: req.body.formdata.userpass}).then(user => {
        if(!user) {
            return res.status(404).json({ Usernotfound: "User not found"});
        }
        userName = user.user_name;

        res.json({
            id:userName,
            sucess:true,
        });
    })
  
});

// post template

router.post("/template", (req, res)=>{
    Templates.findOne({title:req.body.formdata.title , content: req.body.formdata.template })
    .then(template => {
        if(template)
            return res.status(500).json({message: "already exist!"});
        const newTemplate = new Templates({
            title: req.body.formdata.title,
            content: req.body.formdata.template,
        });
        newTemplate
            .save()
            .then(template1=>res.json(template1))
            .catch(err => console.log(err));
    })
})


// Get Templates 
router.get("/templates" ,(req,res) => {
    Templates.find()
    .then(template=>{
        res.send(template);
    })
})

// Get Template
router.get("/template/:id", (req, res)=>{
    Templates.findOne({title: req.params.id})
    .then(result=>{
        res.send(result);
    })
    .catch(err=>{
        console.log(err);
    })
})

module.exports = router;