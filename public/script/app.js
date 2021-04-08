const { response } = require("express");

const button = document.querySelector('button');

button.addEventListener('click', fetchUsersFromDatabase);

async function fetchUsersFromDatabase() {
    const users = await response('./users')
}