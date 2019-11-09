const express = require("express");

const Actions = require('../data/helpers/actionModel');
const Projects = require('../data/helpers/projectModel');

const router = express.Router();

// GET REQUEST

router.get("/", async (req, res) => {
    const getData = await Actions.get()
    try {
        res.status(200).json(getData)
    } catch{
        res.status(500).json({ message: "The API could not be researched" })
    }
})

// POST REQUEST

router.post('/', projectIdCheck, postChecker, async (req, res) => {
    const passedData = req.body
    const postBody = await Actions.insert(passedData)
    try {
        res.status(200).json(postBody)
    } catch (err) {
        res.status(500).json({ message: "the server could not be reached", err })
    }
})

// PUT REQUEST

router.put('/:id', projectIdCheck, postChecker, async (req, res) => {
    const passedData = req.body
    const { id } = req.params
    const putBody = await Actions.update(id, passedData)
    try {
        res.status(200).json(putBody)
    } catch (err) {
        res.status(500).json({ message: "the server could not be reached", err })
    }
})

// DELETE REQUEST

router.delete('/:id', projectIdCheck, async (req, res) => {
    const { id } = req.params
    const deleteData = await Actions.remove(id)
    try {
        if (deleteData === 1) { res.status(200).json({ message: "The item was deleted" }) } else {
            res.status(404).json({ message: "This action could not be found" })
        }
    } catch (err) {
        res.status(500).json({ message: "the server could not be reached", err })
    }
})


// MIDDLEWARE

function projectIdCheck(req, res, next) {
    const id = req.body.project_id
    Projects.get(id)
        .then(validatedUser => {
            if (validatedUser) {
                next()
            } else {
                res.status(404).json({ message: "this project ID was not found" })
            }
        }).catch(err => {
            res.status(500).json({ message: "The server could not be reached", err })
        })
}

function postChecker(req, res, next) {
    const bodyInfo = req.body
    if (!bodyInfo) {
        res.status(400).json({ message: "No request information detected" })
    } else if (!bodyInfo.notes || !bodyInfo.description) {
        res.status(400).json({ message: "The notes and/or description text is invalid" })

    } else next()
}
module.exports = router;
