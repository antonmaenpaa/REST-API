const express = require('express');
const app = express();
const port = 5000;

const fs = require('fs')

// Generates random id for user
function randomId() {
    return Math.floor(Math.random() * 1000000)
}

app.use(express.static('./public'));

app.use(express.json())

// let users = []

// Show all users
app.get('/users', (req, res) => {

    fs.readFile('users.json', (err, data)=> {
        if (err) {
            throw err;
          }
        const users = JSON.parse(data.toString())
        res.status(200).json(users)
    })
})

// Add user
app.post('/users', (req, res) => {
    fs.readFile('users.json', (err, data)=> {
        if (err) {
            throw err;
          }
        const users = JSON.parse(data.toString())
        const user = req.body;
    
        users.push( {...user, id: randomId() })
    
    
        fs.writeFile('users.json', JSON.stringify(users, null, 2), () => {
    
            res.status(201).json(`User with the firstname of ${user.firstName} was added to database`);
        })

    })
})

// Find user with a specific ID
app.get('/users/:id', (req, res) => {

    fs.readFile('users.json', (err, data)=> {
        if (err) {
            throw err;
          }
        const users = JSON.parse(data.toString())
        const  {id}  = req.params;
    
        const foundUser = users.find((user) => user.id == id);
    
        if (!foundUser) {
            res.status(404).json(`Could not find user with the id of ${id}`)
        }
        res.status(200).json(foundUser)
    })
})

// Delete user with a specific ID
app.delete('/users/:id', (req, res) => {
    fs.readFile('users.json', (err, data)=> {
        if (err) {
            throw err;
          }
        const users = JSON.parse(data.toString())
        const  {id}  = req.params;
    
        const index = users.findIndex(user => user.id == id)
        
        if(index === -1) {
            res.status(404).json(`Could not find user with the id of ${id}`)
        } else {
            users.splice(index, 1);
            
        }

        fs.writeFile('users.json', JSON.stringify(users, null, 2), () => {
            res.status(202).json(`User with the id of ${id} has been deleted from database`)
          });
    })
    
})

// Edit user with a specific ID
app.put('/users/:id', (req, res) => {

    fs.readFile('users.json', (err, data)=> {
        if (err) {
            throw err;
          }
        const users = JSON.parse(data.toString())
        const {id} = req.params;
        const {firstName, lastName, age} = req.body;
    
        const user = users.find((user) => user.id == id);
        
        if(!user) {
            res.status(404).json(`Could not find user with the id of ${id}`)
        } else {
            if (firstName) user.firstName = firstName;
            if (lastName) user.lastName = lastName;
            if (age) user.age = age;

        }
    
    
        fs.writeFile('./users.json', JSON.stringify(users, null, 2), () => {
            res.status(200).json(`User with the id of ${id} has been updated`)
          });
    })
})



app.listen(port, () => {
    console.log(`This server is running on http://localhost:${port}`)
})