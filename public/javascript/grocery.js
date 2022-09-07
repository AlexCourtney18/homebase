async function createItem(event) {
    event.preventDefault();

    const grocery_name = document.querySelector('input[id="grocery-name"]').value.trim();
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

    const groceryItem = document.querySelector('input[name="grocery-name"]').value.trim();
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

    const id = event.target.id;

    const answer = await fetch(`/api/groceries/${id}`, {
        method: 'DELETE'
    });

    if (answer.ok) {
        document.location.replace('');
    } else {
        alert(answer.statusText);
    }
}

document.querySelector('#grocery-form').addEventListener('submit', createItem);
document.querySelectorAll('.btn-delete-grocery').forEach(item => {
    item.addEventListener('click', deleteItem)});