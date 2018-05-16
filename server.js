const express = require('express')
const path = require('path')
const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
var port=process.env.PORT || 3000
app.use('/', express.static(path.join(__dirname, 'public')))


const routes = {
    courses : require('./routes/courses'),
    subjects : require('./routes/subjects'),
    teachers : require('./routes/teachers'),
    students : require('./routes/students'),
    batches : require('./routes/batches')
}



app.use('/courses', routes.courses)
app.use('/subjects', routes.subjects)
app.use('/teachers', routes.teachers)
app.use('/students', routes.students)
app.use('/batches', routes.batches)
app.listen(port)