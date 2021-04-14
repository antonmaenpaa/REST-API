

window.addEventListener('load', main);

async function main() {
    const form = document.querySelector('form');
    form.addEventListener('submit', handleSubmit);

    const users = await getAllUsers();

    // Shows all users
    users.map((user, i) => {
        const div = document.createElement('div');


        div.innerHTML =
              
        `<span class="main-div">
            <span>
                <span class="flex">
                    <p>
                        First Name: &nbsp;
                        <p class="bold">
                            ${user.firstName}
                        <p>
                    </p>
                    </span>
                    <span class="flex">
                    <p>
                        Last Name: &nbsp;
                        <p class="bold">    
                        ${user.lastName}
                        <p/>
                        </p>
                    </span>
                    <span class="flex">
                    <p>
                        Age: &nbsp;
                        <p class="bold">
                        ${user.age}
                        </p>
                    </p>
                    </span>
                    <span class="flex">
                    <p>
                        Id: &nbsp;
                        <p class="bold">
                        ${user.id}
                        </p>
                    </p>
                </span>
            </span>
            <span>
                <button onclick="deleteBtn();">Delete</button>
                <button>Edit</button>

            </span>
        </span>`;
 
        document.body.append(div);

    })
}

function deleteBtn() {
    console.log('hej')
}


async function getAllUsers() {
    const allUsers = await makeRequest("/users", "GET");

    return allUsers;
}

async function createUser(firstName, lastName, age) {

    const body = { firstName: firstName, lastName: lastName, age: age }

    const status = await makeRequest('/users', 'POST', body)

    return status
}

async function handleSubmit(event) {
    event.preventDefault();
    
    
    let firstNameValue = document.getElementById('firstName').value;
    let lastNameValue = document.getElementById('lastName').value;
    let ageValue = document.getElementById('age').value;
     
    const addedUser = await createUser(firstNameValue, lastNameValue, ageValue)
     
    if(addedUser) {
        alert(`User with name of ${firstNameValue} added to database`);
        window.location.reload();
        return;
    }

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

