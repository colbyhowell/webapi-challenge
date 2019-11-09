const express = require("express");

const Projects = require('../data/helpers/projectModel');

const router = express.Router();


// GET PROJECT REQUEST

router.get('/', async (req, res) => {
    const getProjects = await Projects.get()
    try {
        res.status(200).json(getProjects)
    } catch{
        res.status(500).json({ message: "the sever cannot be reached at this time" })
    }
})

// GET PROJECTS AND ACTIONS TOGETHER

router.get('/all', async (req, res) => {
    const id = req.body.project_id
    const getAllProjects = await Projects.getProjectActions(id)
    try {
        res.status(200).json(getAllProjects)
    } catch{
        res.status(500).json({ message: "the sever cannot be reached at this time" })
    }
})

// POST REQUEST

router.post('/')

// PUT REQUEST



//DELETE REQUEST



// MIDDLEWARE

function checkId(req, res, next) {
    const { id } = req.params
}


module.exports = router;
