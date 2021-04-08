const express = require('express');
const app = express();
const port = 5000;

// Generates random id for user
function randomId() {
    return Math.floor(Math.random() * 1000000)
}

app.use(express.static('./public'));

app.use(express.json())

let users = [
    {
        "firstName": "Anton",
        "lastName": "Mäenpää",
        "age": 29,
        "id": 123234
    }
]

app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/users', (req, res) => {
    const user = req.body;

    users.push( {...user, id: randomId() })

    res.json(`User with the firstname of ${user.firstName} was added to database`);
})

app.get('/users/:id', (req, res) => {
    const  {id}  = req.params;

    const findUser = users.find((user) => user.id == id);

    res.json(findUser)
})

app.delete('/users/:id', (req, res) => {
    const  {id}  = req.params;

    const index = users.findIndex(user => user.id == id)
    users.splice(index, 1);

    res.json(`User with the id of ${id} has been deleted from database`)
})

app.put('/users/:id', (req, res) => {
    const {id} = req.params;
    const {firstName, lastName, age} = req.body;

    const user = users.find((user) => user.id == id);

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (age) user.age = age;

    res.json(`User with the id of ${id} has been updated`)
})



app.listen(port, () => {
    console.log(`This server is running on http://localhost:${port}`)
})