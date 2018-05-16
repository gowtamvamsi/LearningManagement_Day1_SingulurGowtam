
const { Course } = require('./db')
const { Batch } = require('./db')
const { Lecture } = require('./db')
const { Student } = require('./db')
const { Teacher } = require('./db')
const { BatchStudent}=require('./db')
const { BatchTeacher}=require('./db')
////const app=express() 
const route = require('express').Router()





//app.use(express.bodyParser());
//app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
//app.use(bodyParser.json())



route.get('/', (req, res) => {
     Course.findAll().
     then((courses)=>{
         res.status(200).send(courses)
     }).
     catch((err)=>{
         res.status(500).send('Cant find any course')
     })
    
    
})

route.post('/', (req, res) => {
    console.log(req.body.name)
    Course.create({
        name: req.body.name
    }).then(() => {
       res.status(200).send('Course added succesfully')
    }).catch((err) => res.send('cant add the course'))
})

route.delete('/', (req, res) => {
    Course.destroy({
        where: {},
        truncate: true
      }).then(() => {
       res.status(200).send('Courses deleted succesfully')
    }).catch((err) => res.send('cant delete the course'))
})




route.get('/:id', (req, res) => {
    Course.findOne({
        where: {id:req.params.id}
      }).then((course)=>{

            res.status(200).send(course)
      }).
      catch((err)=>{
          res.status(500).send('course with id:'+req.query.id+' is not there')

      })
      
    
})

route.put('/:id', (req, res) => {
    Course.findOne({
        where: {id: parseInt(req.body.id)}
      }).then((course)=>{
        if(req.body.name!==undefined){
            course.updateAttributes({
               name:req.body.name
            })
        }
      }).
      catch((err)=>{
          res.status(500).send('course with id:'+req.params.id+' is not there')

      })
      
    
})



route.delete('/:id', (req, res) => {
    Course.destroy({
        where: {
            id:parseInt(req.params.id)
        },
        truncate: true
      }).then(() => {
       res.status(200).send('Course deleted succesfully')
    }).catch((err) => res.send('cant delete the course'))
})



route.get('/:id/batches', (req, res) => {
    Batch.findAll({
        where:{
            courseId:parseInt(req.params.id)
        }
    }).
    then((batches)=>{
        res.status(200).send(courses)
    }).
    catch((err)=>{
        
        res.status(500).send('Cant find any course due to '+err+'   '+ req.params.id)
    })
   
   
})


route.post('/:id/batches', (req, res) => {
    Batch.create({
        name:req.body.name,
        courseId:parseInt(req.body.courseId)
    }).
    then(()=>{
        res.status(200).send('Batch added succesfully')
    }).
    catch((err)=>{
        res.status(500).send('Cant add the batch due to '+err)
    })
 })

 route.delete('/:id/batches', (req, res) => {
    Batch.destroy({
        where: {
            courseId:parseInt(req.params.courseId)
        },
        truncate: true
      }).then(() => {
       res.status(200).send('Batches deleted succesfully')
    }).catch((err) => res.send('cant delete the batch'))
})
 
route.get('/:id/batches/:batchId', (req, res) => {
    Batch.findOne({
        where:{
           
               courseId:parseInt(req.params.id),
               id:parseInt(req.params.batchId)
            
        }
    }).
    then((batch)=>{
        res.status(200).send(batch)
    }).
    catch((err)=>{
        res.status(500).send('Cant find any course')
    })
   
   
})

route.put('/:id/batches/:batchId', (req, res) => {
    Batch.findOne({
        where:{
           
               courseId:parseInt(req.body.id),
               id:parseInt(req.body.batchId)
            
        }
    }).
    then((batch)=>{
        if(req.body.name!==undefined){
            batch.updateAttributes({
               name:req.body.name
            })
        }
    }).
    catch((err)=>{
        res.status(500).send('Cant find any course')
    })
   
   
})

route.delete('/:id/batches/:batchId', (req, res) => {
    Batch.destroy({
        where: {
            courseId:parseInt(req.params.id),
            id:parseInt(req.params.batchId)
        },
        truncate: true
      }).then(() => {
       res.status(200).send('Batches deleted succesfully')
    }).catch((err) => res.send('cant delete the batch'))
})

route.get('/:id/batches/:batchId/lectures', (req, res) => {
    Lecture.findAll({
        where:{
            courseId:parseInt(req.params.id),
            batchId:parseInt(req.params.batchId)
        }
    }).
    then((lectures)=>{
        res.status(200).send(lectures)
    }).
    catch((err)=>{
        res.status(500).send('Cant find any course')
    })
   
   
})

route.post('/:id/batches/:batchId/lectures/', (req, res) => {
    console.log(req.body)
    Lecture.create({
        name:req.body.cname,
        courseId:parseInt(req.body.id),
        batchId:parseInt(req.body.batchId)
    }).
    then(()=>{
        res.status(200).send('Lecture added succesfully')
    }).
    catch((err)=>{
        res.status(500).send('Cant add the lecture due to '+err)
    })
 })

 route.delete('/:id/batches/:batchId/lectures/', (req, res) => {
    Lecture.destroy({
        where: {
            courseId:parseInt(req.params.id),
            batchId:parseInt(req.params.batchId)
        },
        truncate: true
      }).then(() => {
       res.status(200).send('Lectures deleted succesfully')
    }).catch((err) => res.send('cant delete the lecture'))
})
 

route.get('/:id/batches/:batchId/lectures/:lectureId', (req, res) => {
    Lecture.findOne({
        where:{
           
               courseId:parseInt(req.params.id),
               batchId:parseInt(req.params.batchId),
               id:parseInt(req.params.lectureId)

            
        }
    }).
    then((lecture)=>{
        res.status(200).send(lecture)
    }).
    catch((err)=>{
        res.status(500).send('Cant find any course')
    })
   
   
})

route.put('/:id/batches/:batchId/lectures/:lectureId', (req, res) => {
    Lecture.findOne({
        where:{
           
               courseId:parseInt(req.body.id),
               batchId:parseInt(req.body.batchId),
               id:parseInt(req.body.lectureId)

            
        }
    }).
    then((lecture)=>{
        if(req.body.name!==undefined){
        lecture.updateAttributes({
           name:req.body.name
        })
    }
    if(req.body.batchId!==undefined){
        lecture.updateAttributes({
           batchId:req.body.batchId
        })
    }
    if(req.body.courseId!==undefined){
        lecture.updateAttributes({
           courseId:req.body.courseId
        })
    }
    }).
    catch((err)=>{
        res.status(500).send('Cant find any course')
    })
   
   
})

route.delete('/:id/batches/:batchId/lectures/:lectureId', (req, res) => {
    Lecture.destroy({
        where: {
            courseId:parseInt(req.params.id),
            batchId:parseInt(req.params.batchId),
            id:parseInt(req.params.lectureId)
        },
        truncate: true
      }).then(() => {
       res.status(200).send('Lecture deleted succesfully')
    }).catch((err) => res.send('cant delete the lecture'))
})


route.get('/:id/batches/:batchId/students', (req, res) => {
    console.log(req.params)
    BatchStudent.findAll({
        
        where:{
            courseId:parseInt(req.params.id),
            batchId:parseInt(req.params.batchId)
        },
        include:[{model :Student
            ,required: true
        }]
    }).
    then((students)=>{
        res.status(200).send(students)
    }).
    catch((err)=>{
        res.status(500).send('Cant find any students'+err)
    })
   
   
})

route.post('/:id/batches/:batchId/students', (req, res) => {
    Student.create({
        name:req.body.name,
        courseId:parseInt(req.body.id),
        batchId:parseInt(req.body.batchId)
    }).
    then(()=>{
        res.status(200).send('Student added succesfully')
    }).
    catch((err)=>{
        res.status(500).send('Cant add the student due to '+err)
    })
 })

 route.delete('/:id/batches/:batchId/students', (req, res) => {
    BatchStudent.destroy({
        where: {
            courseId:parseInt(req.params.id),
            batchId:parseInt(req.params.batchId)
           
        },
        truncate: true
      }).then(() => {
       res.status(200).send('Students deleted succesfully')
    }).catch((err) => res.send('cant delete the student'))
})


route.get('/:id/batches/:batchId/teachers', (req, res) => {
    Teacher.findAll({
        where:{
            courseId:parseInt(req.params.id),
            batchId:parseInt(req.params.batchId)
        },
        include:[Teacher]
    }).
    then((teachers)=>{
        res.status(200).send(teachers)
    }).
    catch((err)=>{
        res.status(500).send('Cant find any Teacher')
    })
   
   
})

route.post('/:id/batches/:batchId/teachers', (req, res) => {
    Teacher.create({
        name:req.body.name,
        courseId:parseInt(req.body.id),
        batchId:parseInt(req.body.batchId)
    }).
    then(()=>{
        res.status(200).send('Teacher added succesfully')
    }).
    catch((err)=>{
        res.status(500).send('Cant add the teacher due to '+err)
    })
 })

 route.delete('/:id/batches/:batchId/teachers', (req, res) => {
    BatchTeacher.destroy({
        where: {
            courseId:parseInt(req.params.id),
            batchId:parseInt(req.params.batchId)
           
        },
        truncate: true
      }).then(() => {
       res.status(200).send('Teachers deleted succesfully')
    }).catch((err) => res.send('cant delete the teacher'))
})

module.exports=route
