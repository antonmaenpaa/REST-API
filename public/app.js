window.addEventListener('load', main);


async function main() {
    
    const form = document.querySelector('form');
    form.addEventListener('submit', handleSubmit);
    
    const delEditbtn = document.querySelector('.main-container');
    delEditbtn.addEventListener('click', handleDelete);

    const search = document.getElementById('searchBar');
    search.addEventListener('keypress', searchBar);
    
    let users = await getAllUsers();
    showUsers(users);

    // let users = [];

    
    
    
}

// SEARCHBAR
async function searchBar(e) {
    if(e.key = "Enter") {
        const searchString = e.target.value
        if(searchString === "") {
            alert('Input field is empty ....');
            return;
        }
        let userArray = [];
        let specific = await getSpecific(searchString)
        
        userArray.push(specific)
        
        showUsers(userArray)
        console.log(userArray)
        

    }
}

// SHOW ALL USERS
function showUsers(users) {

    const container = document.getElementById('container');
    container.innerHTML = "";
    users.map((user, i) => {
        const div = document.createElement('div');
        div.className = "card"
        
        div.innerHTML =        
        `<span class="main-div data-id=${user.id}">
            <span>
                <span class="flex">
                    <p>
                        First Name: &nbsp;
                        <p class="bold firstName">${user.firstName}<p>
                    </p>
                    </span>
                    <span class="flex">
                    <p>
                        Last Name: &nbsp;
                        <p class="bold lastName">${user.lastName}<p/>
                        </p>
                    </span>
                    <span class="flex">
                    <p>
                        Age: &nbsp;
                        <p class="bold age">${user.age}</p>
                    </p>
                    </span>
                    <span class="flex">
                    <p>
                        Id: &nbsp;
                        <p class="bold">${user.id}</p>
                    </p>
                </span>
            </span>
            <span data-id=${user.id}>
                <button id="delete-btn">Delete</button>
                <button id="edit-btn">Edit</button>

            </span>
        </span>`;
 
        container.append(div);
    })
}


async function handleSubmit(event) {
    event.preventDefault();
    
    let firstNameValue = document.getElementById('firstName').value;
    let lastNameValue = document.getElementById('lastName').value;
    let ageValue = document.getElementById('age').value;
    
    const addedUser = await createUser(firstNameValue, lastNameValue, ageValue)
    
    if(addedUser) {
        alert(`User with name of ${firstNameValue} added to database`);
        location.reload();
        return;
    }
    
}

async function handleDelete(e) {
    e.preventDefault();

    
    const deleteBtn = e.target.id == 'delete-btn';
    const editBtn = e.target.id == 'edit-btn';

    
    let userId = e.target.parentElement.dataset.id;
    if(deleteBtn) {
        let deletedUser = await deleteUser(userId);
        if(deletedUser) {
            await getAllUsers();
            location.reload();
            return;
        }

    }

    if (editBtn) {
        
        // console.log('edit');
        const child = e.target.parentElement;
        const parent = child.parentElement;
     

        const firstNameValue = document.getElementById('firstName');
        const lastNameValue = document.getElementById('lastName');
        const ageValue = document.getElementById('age');

        let firstNameContent = parent.querySelector('.firstName').textContent;
        let lastNameContent = parent.querySelector('.lastName').textContent;
        let ageContent = parent.querySelector('.age').textContent;


        firstNameValue.value = firstNameContent;
        lastNameValue.value = lastNameContent;
        ageValue.value = ageContent;
        
        const save = document.getElementById('btn');
        save.addEventListener('click', async (e) => {
            e.preventDefault();
            await editUser(userId, firstNameValue.value, lastNameValue.value, ageValue.value);
            location.reload();
            alert(`User with the ${userId} has been updated`)
        })
    }
}


async function getAllUsers() {
    const allUsers = await makeRequest("/users", "GET");

    return allUsers;
}

async function createUser(firstName, lastName, age) {
    const body = { firstName: firstName, lastName: lastName, age: age };

    const status = await makeRequest('/users', 'POST', body);

    return status;
}

async function deleteUser(id) {
    const status = await makeRequest('/users/' + id, 'DELETE');

    return status;
}

async function editUser(id, firstName, lastName, age) {
    const body = {firstName: firstName, lastName: lastName, age: age};

    const status = await makeRequest('/users/' + id, 'PUT', body);

    return status;
}

async function getSpecific(id) {
    const status = await makeRequest('/users/' + id, "GET");

    return status;
}


async function makeRequest(url, method, body) {
    
    const response = await fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
})
   

    const result = await response.json()


    return result
}

