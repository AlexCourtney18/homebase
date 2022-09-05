async function logout() {
    console.log('MELON CORN SUMMER')
    const answer = await fetch('/api/users/logout', {
        method: 'post',
        headers: {'content-type' : 'application/json'}
    });

    if (answer.ok) {
        console.log('logged out');
        document.location.replace('/');
    } else {
        alert(answer.statusText);
    }
}

document.querySelector('#logout').addEventListener('click', logout);