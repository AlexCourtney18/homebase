async function findBase(event) {
    event.preventDefault();
    //console.log('Watermelon')
    const group_id = document.querySelector('#find-base').value.trim();
    //console.log(group_id)

    if(group_id) {
        const response = await fetch(`/homepage/${group_id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });

        if(response.ok) {
            console.log("Hello this worked");
            console.log(response);

        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('#find-base-form').addEventListener('submit', findBase);