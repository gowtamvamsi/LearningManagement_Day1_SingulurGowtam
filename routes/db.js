const Sequelize = require('sequelize')

const db = new Sequelize('learning', 'root', 'root', {
    dialect: 'mysql',
    // host: 'localhost',
    
})


const Course = db.define('course', {
    name: {
        type: Sequelize.STRING(30),
        unique: true,
        allowNull: false
    },
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        primaryKey:true
    }

})
const Batch = db.define('batch', {
    name: {
        type: Sequelize.STRING(30),
        unique: true,
        allowNull: false
    },
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        primaryKey:true
    }
})

const Lecture = db.define('lecture', {
    name: {
        type: Sequelize.STRING(30),
        unique: true,
        allowNull: false
    },
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        primaryKey:true
    }
})

const Student = db.define('student', {
    name: {
        type: Sequelize.STRING(30),
        unique: true,
        allowNull: false
    },
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey:true,
        allowNull: false
    }
})

const Teacher = db.define('teacher', {
    name: {
        type: Sequelize.STRING(30),
        unique: true,
        allowNull: false
    },
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey:true,
        allowNull: false
    }
})

const Subject = db.define('subject', {
    name: {
        type: Sequelize.STRING(30),
        unique: true,
        allowNull: false
    },
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey:true,
        allowNull: false
    }
})

const BatchStudent = db.define('batch_student', {
   
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey:true,
        allowNull: false
    }
})
const BatchTeacher = db.define('batch_teacher', {
   
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey:true,
        allowNull: false
    }
})

Batch.belongsTo(Course)
Course.hasMany(Batch)
Lecture.belongsTo(Batch)
Batch.hasMany(Lecture)
Lecture.belongsTo(Course)
Course.hasMany(Lecture)
Batch.belongsToMany(Student, { through: BatchStudent });
Student.belongsToMany(Batch, { through: BatchStudent });
Student.belongsTo(Course)
Course.hasMany(Student)
Teacher.belongsTo(Subject)
Subject.hasMany(Teacher)
Teacher.belongsTo(Course)
Course.hasMany(Teacher)
Batch.belongsToMany(Teacher, { through: BatchTeacher });
Teacher.belongsToMany(Batch, { through: BatchTeacher });
Subject.belongsTo(Batch)
Batch.hasMany(Subject)


db.sync()

module.exports = {
    db, Course, Batch, Lecture, Student, Teacher, Subject, BatchStudent, BatchTeacher
}