async function createBaseFormHandler(event, req) {

    event.preventDefault();


    const groupName = document.querySelector('#baseName').value.trim();

    const address = document.querySelector('#address').value.trim();

    const addressCity = document.querySelector('#address-city').value.trim();

    const addressState = document.querySelector('#address-state').value.trim();

    const wholeAddress = address + " " + addressCity + ', ' + addressState;

    const userId = req.session.user_id;


    if (groupName && wholeAddress && userID) {

        const response = await fetch('/api/groups', {

            method: 'post',

            body: JSON.stringify({

                groupName,
                wholeAddress,
                userId

            }),

            headers: { 'Content-Type': 'application/json' }

        });

        if (response.ok) {

            console.log('base successfully made!');
            document.location.replace('/homepage');

        } else {

            alert(response.statusText);

        }


    }





}


document.querySelector('#group-signup').addEventListener('submit', createBaseFormHandler);