const express = require('express')
const router = express.Router()
const DForm = require('../Models/DynamicForm')


router.post('/new', (request, response) => {
    const { name, status, users, validity, image, fields } = request.body
    if (name && status && users && validity && image && fields.length > 0) {
        DForm.create(request.body).then(response1 => {
            response.status(201).send({ success: "Successfully Created" })
        }).catch(error => {
            if (error.keyPattern.name) {
                response.status(406).send({ error: "This name is already assigned" })
            } else {
                response.status(406).send({ error: "something went wrong" })
            }
        })
    } else {
        response.status(406).send({ error: "Please enter all fields" })
    }

})

router.get('/findall', (request, response) => {
    DForm.find().then(response1 => {
        response.status(200).send(response1)
    }).catch(error => {
        response.status(400).send({ error: "Something went wrong" })
    })
})

router.get('/get/:email', (request, response) => {
    const { email } = request.params
    DForm.find({ users: email }).then(response1 => {
        response.send(response1)
    }).catch(error => {
        response.status(422).send(error)
    })
})

router.get('/:id', (request, response) => {
    const { id } = request.params
    DForm.findById(id).then(response1 => {  
        response.send(response1)
    }).catch(error => {
        response.status(422).send(error)
    })
})

router.delete('/:id', (request, response) => {
    const { id } = request.params
    DForm.findByIdAndRemove(id).then(response1 => {  
        response.send(response1)
    }).catch(error => {
        response.status(422).send(error)
    })
})

module.exports = router