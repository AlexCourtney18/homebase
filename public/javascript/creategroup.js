async function createBaseFormHandler(event) {
    event.preventDefault();

    const group_name = document.querySelector('#baseName').value.trim();
    const dress = document.querySelector('#address').value.trim();
    const addressCity = document.querySelector('#address-city').value.trim();
    const addressState = document.querySelector('#address-state').value.trim();

    if(dress && addressCity && addressState) {
        let address = dress + ', ' + addressCity + ', ' + addressState;
    
        if (group_name && address) {
            const response = await fetch('/api/groups', {
                method: 'post',
                body: JSON.stringify({

                    group_name,
                    address,  
                }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                document.location.replace('/homepage');
            } else {
                alert(response.statusText);
            }
        }
    }
}

document.querySelector('#group-signup').addEventListener('submit', createBaseFormHandler);