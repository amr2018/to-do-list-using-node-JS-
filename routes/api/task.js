
// import modules
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const xss = require('xss')

const TaskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 12
    },

    des: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true
    },

    done: {
        type: Boolean,
        default: false
    }
})

const Task = mongoose.model('task', TaskSchema)

router.post('/add', (req, res) => {
    try {
        const task = new Task({
            name: xss(req.body.name), 
            des: xss(req.body.des),
            date: xss(req.body.date),
            done: false
        })
    
        task.save().then((data) => {
            res.json({mesg: 'add', task: data})
        })

    } catch (err) {
        res.json({mesg: 'Error'})
    }
})


router.get('/getAll', async (req, res) => {
    const tasks = await Task.find({})
    if (!tasks) {
        res.send(404).json({mesg: 'No tasks'})
    } else {
        res.json(tasks)
    }
})

router.get('/:id', async (req, res) => {
    const id = xss(req.params.id)
    if (id.length < 24) {
        res.json({mesg: `Invalled id : ${id}`})
    } else {
        const task = await Task.findById(id)
        if (!task) {
            res.json({mesg: `No task with this id : ${id}`})
        } else {
            res.json({mesg: `Founded : ${id}`, task: task})
        }
    }
})


router.post('/update', async (req, res) => {
    const _id = xss(req.body._id)
    const task = Task.findOneAndUpdate({_id: _id}, 
        {done: true},
        {upsert: true, new: true},
        function (err, doc) {
            if (err) res.json({mesg: err})
            res.json({mesg: 'Updated', task: doc})
        }
    )

})


router.post('/delete', (req, res) => {
    const _id = xss(req.body._id)
    const task = Task.findByIdAndDelete({_id: _id}, function (err) {
        if (err) res.json({mesg: err})
        res.json({mesg: 'deleted'})
    })
})



module.exports = router