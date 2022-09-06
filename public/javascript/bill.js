/* model after grocery*/

async function createBill(event) {
    event.preventDefault();
    console.log("create bill!");

    const company = document.querySelector('input[id="companyName"]').value.trim();
    const amount_due = document.querySelector('input[id="amountDue"]').value.trim();
    const due_date = document.querySelector('input[id="dueDate"]').value.trim();
    const group_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1 ];
        console.log("Company:", company);
        console.log("Amount:", amount_due);
        console.log("Due Date:", due_date);

    const answer = await fetch(`/api/bills`, {
        method: 'POST',
        body: JSON.stringify({
            company,
            amount_due,
            due_date,
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

async function deleteBill(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1];
    
    const answer = await fetch(`api/bills/${id}`, {
        method: 'DELETE'
    });

    if (answer.ok) {
        document.location.replace('');
    } else {
        alert(answer.statusText);
    }
}

document.querySelector('#billForm').addEventListener('submit', createBill);
// document.querySelector('#delete-bill').addEventListener('onclick', deleteBill);