const express = require("express");
const mongoose = require("mongoose");

const Dao = require("../../models/Dao");
const router = express.Router();

const validateDaoInput = require("../../validation/dao");

// @desc Create Dao
router.post("/create", (req, res) => {
    // Form validation

    const { errors, isValid } = validateDaoInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    Dao.find({ handle: req.body.handle }, { handle: 1 })
        .then(dao => {
            if (dao[0]) {
                return res.status(400).json({ handle: "Handle already exists" });
            } else {
                const newDao = new Dao({
                    owner: req.body.owner,
                    title: req.body.title,
                    handle: req.body.handle,
                });
                newDao
                    .save()
                    .then(dao => res.json(dao))
                    .catch(err => res.json(err));
            }
        });
});

// @route Get Users List
router.get('/get_all_daos/', (req, res) => {
    Dao.find({}, { _id: 1, handle: 1, title: 1, owner: 1 }, (error, data) => {
        if (error) {
            return res.json(error)
        } else {
            res.json(data)
        }
    })
});

module.exports = router;