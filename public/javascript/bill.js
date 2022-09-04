const { json } = require("stream/consumers");

let billTitle;
let billText;
let addBillBtn;
let billList;

if (window.location.pathname === '/bills') {
    billTitle = document.querySelector('.bill-title');
    billText = document.querySelector('.bill-textarea');
    addBillBtn = document.querySelector('#add-bill');
    billList = document.querySelectorAll('.list-container .list-group');
}

//activeBill is used to keep track of the note in the textarea
let activeBill = {};

const getBills = () =>
fetch('/api/bills', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
});

const saveBill = (bill) =>
fetch('/api/bills', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(bill)
});

const deleteBill = (id) =>
fetch('/api/bills/${id}', {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    },
});

const renderActiveBill = () => {
    if (activeBill.id) {
        billTitle.setAttribute('readonly', true);
        billText.setAttribute('readonly', true);
        billTitle.value = activeBill.billTitle;
        billText.value = activeBill.billText;
    } else {
        billTitle.removeAttribute('readonly');
        billText.removedAttribute('readonly');
        billTitle.value = '';
        billText.value = '';
    }
};

const handleBillSave = () => {
    const newBill = {
        title: billTitle.value,
        text: billText.value,
    };
    saveBill(newBill).then(() => {
        getAndRenderBills();
        renderActiveBill();
    });
};

//delete the clicked bill
const handleBillDelete = (e) => {
    //prevents the click listener for the list from being called when the button inside of it is clicked
    e.stopPropagation();

    const bill = e.target;
    const billId = JSON.parse(note.parentElement.getAttribute('data-bill')).id;

    if (activeBill.id === billId) {
        activeBill = {};
    }

    deleteBill(billId).then(() => {
        getAndRenderBills();
        renderActiveBill();
    });
};

//sets the activeBill and displays it
const handleBillView = (e) => {
    e.preventDefault();
    activeBill = JSON.parse(e.target.parentElement.getAttribute('data-bill'));
    renderActiveBill();
};

//sets the activeBill to an empty object and allows the user to enter a new bill
const handleNewBillView = (e) => {
    activeBill = {};
    renderActiveBill();
};

//render the list of bill titles
const renderBillList = async (bills) => {
    let jsonBills = await bills.json();
    if (window.location.pathname === '/bills') {
        billList.forEach((el) => (el.innerHTML = ''));
    }

    let billListItems = [];

    //return HTML element with or without a delete button
    const createLi = (text, delBtn = true) => {
        const liEl = document.createElement('li');
        liEl.classList.add('list-group-item');

        const spanEl = document.createElement('span');
        spanEl.classList.add('list-item-title');
        spanEl.innerText = text;
        spanEl.addEventListener('click', handleBillView);

        liEl.append(spanEl);

        if (delBtn) {
            const delBtnEl = document.createElement('i');
            delBtnEl.classList.add(
                'fas',
                'fa-trash-alt',
                'float-right',
                'text-danger',
                'delete-bill'
            );
            delBtnEl.addEventListener('click', handleBillDelete);

            liEl.append(delBtnEl)
        }
        return liEl;
    };
    if (jsonBills.length === 0) {
        billListItems.push(createLi('No saved Bills', false));
    }

    jsonBills.forEach((bill) => {
        const li = createLi(bill.title);
        li.dataset.bill = JSON.stringify(bill);

        billListItems.push(li);
    });
    if (window.location.pathname === '/bills') {
        billListItems.forEach((bill) => billList[0].append(bill));
    }
};

//gets bills from the db and renders them to page
const getAndRenderBills = () => getBills().then(renderBillList);

if (window.location.pathname === '/bills') {
    addBillBtn.addEventListener('click', handleBillSave);
}

//create new bill

//delete bill