async function createItem(event) {
    event.preventDefault();
    console.log("CREATE GROCERY!!!!");

    // const groceryItem = document.querySelector('input[name=""]').value;
    const grocery_name = document.querySelector('input[name="grocery-name"]').value;
    const group_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1 ];

    const answer = await fetch(`/api/groceries`,{
        method: 'POST',
        body: JSON.stringify({
            grocery_name,
            group_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (answer.ok) {
        document.location.replace('');
    } else {
        alert(answer.statusText);
    }
}

async function updateItem(event) {
    event.preventDefault();

    const groceryItem = document.querySelector('input[name=""]').value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const answer = await fetch(`/api/groceries/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            groceryItem
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (answer.ok) {
        document.location.replace('');
    } else {
        alert(answer.statusText);
    }
}

async function deleteItem(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const answer = await fetch(`api/groceries/${id}`, {
        method: 'DELETE'
    });

    if (answer.ok) {
        document.location.replace('');
    } else {
        alert(answer.statusText);
    }
}

document.querySelector('#add-grocery').addEventListener('submit', createItem);
// document.querySelector('').addEventListener('submit', updateItem);
// document.querySelector('').addEventListener('click', deleteItem);
