const express = require('express')
const router = express.Router()

const Users = require('../models/users')

router.get('/', async (req, res) => {
    const users = await Users.find()
    res.json(users)
});

router.get('/:id', async (req, res) => {
    const user = await Users.findById(req.params.id)
    res.json(user)
});

router.post('/', async (req, res) => {
    const { user_id, name, lastname, age, password } = req.body
    const newUser = new Users({
        user_id,
        name,
        lastname,
        age,
        password
    })
    await newUser.save()
    res.json({
        status: 'User Saved'
    })
})

router.put('/:id', async (req,res) => {
    const { user_id, name, lastname, age, password } = req.body
    const newUser = { user_id, name, lastname, age, password }
    await Users.findByIdAndUpdate(req.params.id, newUser)
    res.json({
        status: 'User Updated'
    })
})

router.delete('/:id', async (req,res) => {
    await Users.findByIdAndRemove(req.params.id)
    res.json({
        status: 'User Deleted'
    })
})

module.exports = router