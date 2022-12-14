async function findBase(event) {
    event.preventDefault();
    const group_id = document.querySelector('#find-base').value.trim();

    if(group_id) {
        const response = await fetch(`/api/groups/${group_id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });

        if(response.ok) {
            response.json().then(function(data) {
                printGroupCard(data);
            })
        } else {
            alert(response.statusText)
        }
    }
}

function printGroupCard(data) {
    let id = data.id;
    let group_name = data.group_name;
    let address = data.address;
    let cuid = data.sessuser
    let muid = data.user.id
    let dataCard = document.querySelector('#data-card');
    
    while(dataCard.firstChild) {
        dataCard.removeChild(dataCard.firstChild);
    }

    const groupName = document.createElement('h1');
    groupName.textContent = group_name;
    dataCard.appendChild(groupName);

    const groupAddress = document.createElement('p');
    groupAddress.textContent = address;
    dataCard.appendChild(groupAddress);

    if(muid != cuid) {
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Join Group'
        submitButton.setAttribute('type', 'button');
        submitButton.setAttribute('id', id)
        submitButton.classList.add('btn', 'btn-info', 'join-group-button', 'mb-4')
        dataCard.appendChild(submitButton);
        
        document.querySelector('.join-group-button').addEventListener('click', joinBase);
    }
}

async function joinBase(event) {
    event.preventDefault();

    const group_id = event.target.id;
    
    const response = await fetch('/api/groups/memberadd', {
        method: 'PUT',
        body: JSON.stringify({
            group_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#find-base-form').addEventListener('submit', findBase);