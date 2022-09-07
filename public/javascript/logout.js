async function logout() {
    const answer = await fetch('/api/users/logout', {
        method: 'post',
        headers: {'content-type' : 'application/json'}
    });

    if (answer.ok) {
        document.location.replace('/');
    } else {
        alert(answer.statusText);
    }
}

document.querySelector('#logout').addEventListener('click', logout);