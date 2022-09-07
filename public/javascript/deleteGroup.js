async function deleteGroup(event) {
    event.preventDefault();
   

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const answer = await fetch(`/api/groups/${id}`, {
        method: 'DELETE'
    });


    if (answer.ok) {
        document.location.replace('/homepage');

    } else {
        alert(answer.statusText);

    }
}

document.querySelector('#group-section').addEventListener('click', deleteGroup);