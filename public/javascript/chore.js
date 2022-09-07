async function createItem(event) {
    event.preventDefault();

    const chore_name = document.querySelector('input[id="chore-name"]').value.trim();
    const group_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1 ];

    const answer = await fetch(`/api/chores`,{
        method: 'POST',
        body: JSON.stringify({
            chore_name,
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

    const choreItem = document.querySelector('input[name="chore-name"]').value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const answer = await fetch(`/api/chores/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            choreItem
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

    const answer = await fetch(`/api/chores/${id}`, {
        method: 'DELETE'
    });

    if (answer.ok) {
        document.location.replace('');
    } else {
        alert(answer.statusText);
    }
}

document.querySelector('#chore-form').addEventListener('submit', createItem);
document.querySelectorAll('.btn-delete-chore').forEach(item => {
    item.addEventListener('click', deleteItem)});