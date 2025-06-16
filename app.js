const express = require('express');
const app = express();

class Student {
    constructor(name, grade) {
        this.name = name;
        this.grade = parseFloat(grade);
    }

    getDetails() {
        return `Name: ${this.name}, Grade: ${this.grade}`;
    }
}

const students = [];

app.use(express.json());

app.post('/students', (req, res) => {
    if (!req.body) {
        return res.status(400).json({ error: 'Request body is missing or invalid' });
    }
    const { name, grade } = req.body;
    if (!name || grade === undefined) {
        return res.status(400).json({ error: 'Name and grade are required' });
    }
    if (isNaN(grade) || grade < 0 || grade > 100) {
        return res.status(400).json({ error: 'Grade must be a valid number between 0 and 100' });
    }
    const student = new Student(name, grade);
    students.push(student);
    res.status(201).json({ message: 'Student added', student: student.getDetails() });
});


app.get('/students', (req, res) => {
    const studentDetails = students.map(student => student.getDetails());
    res.json(studentDetails);
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});


app.listen(3000, () => {
    console.log(`Server running well at http://localhost:3000`);
});