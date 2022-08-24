const { Post, User } = require('../schemas')
const validator = require('validator')
const cloudinary = require('cloudinary').v2

const getAll = async(req, res) => {}

const findOne = async(req, res) => {}

const create = async(req, res) => {
    const { body, createdBy } = req.body
    const images = req.files
}

const remove = async(req, res) => {}

module.exports = { create, findOne, getAll, remove }