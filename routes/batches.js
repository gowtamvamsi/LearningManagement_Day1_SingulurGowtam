const { Batch } = require('./db')

const route = require('express').Router()

route.get('/', (req, res) => {
    Batch.findAll().
    then((batches)=>{
        res.status(200).send(batches)
        //console.log(batches)
    }).
    catch((err)=>{
        res.status(500).send('Cant find any batches')
    })
   
   
})

route.post('/', (req, res) => {
    console.log(req.body)
    Batch.create({
        name: req.body.name,
        courseId:req.body.courseId
    }).then(() => {
       res.status(200).send('Batch added succesfully')
    }).catch((err) => res.send('cant add the batch'))
})


module.exports=route