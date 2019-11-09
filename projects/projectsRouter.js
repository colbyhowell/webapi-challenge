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

router.post('/', checkPostData, async (req, res) => {
    const newPost = req.body
    const postRes = await Projects.insert(newPost)
    try {
        res.status(200).json(postRes)
    } catch{
        res.status(500).json({ message: "this post request could not be completed" })
    }
})

// PUT REQUEST

router.put('/:id', checkId, checkPostData, async (req, res) => {
    const { id } = req.params
    const changes = req.body
    const changeRes = await Projects.update(id, changes)
    try {
        res.status(200).json(changeRes)
    } catch{
        res.status(500).json({ message: "this post edit could not be completed" })
    }
})

//DELETE REQUEST

router.delete('/:id', checkId, async (req, res) => {
    const { id } = req.params
    const deleteData = await Projects.remove(id)
    try {
        if (deleteData === 1) { res.status(200).json({ message: "The project was deleted" }) } else {
            res.status(404).json({ message: "This action could not be found" })
        }
    } catch (err) {
        res.status(500).json({ message: "the server could not be reached", err })
    }
})


// MIDDLEWARE

function checkId(req, res, next) {
    const { id } = req.params
    Projects.get(id).then(validatedId => {
        if (validatedId) {
            next()
        } else {
            res.status(404).json({ message: "this project ID was not found" })
        }
    }).catch(err => {
        res.status(500).json({ message: "The server could not be reached", err })
    })
}

function checkPostData(req, res, next) {
    const postData = req.body
    if (!postData) {
        res.status(400).json({ message: "missing post body data" })
    } else if (!postData.name || !postData.description) {
        res.status(400).json({ message: "missing the name or description fields" })
    } else {
        next()
    }
}


module.exports = router;
