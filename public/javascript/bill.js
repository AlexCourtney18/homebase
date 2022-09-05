/*
WE ned to target the button and store it in a variable
Once stored, we are are going to add an event listener to the button
Once the button is clicked, then call the function
*/

const addBillBtn = document.getElementById('submitBill');



class BillClass {
    constructor() {
      this.bills = JSON.parse(localStorage.getItem('BILLS'));
      if(!this.bills) {
        this.bills = [
          {bill: 'Room rent', isPaid: false},
          {bill: 'Electricity bill', isPaid: true},
          {bill: 'Internet bill', isPaid: false},
        ];
      }

      this.loadBills();
      this.addEventListeners();
    }

    addEventListeners() {
      // Add bill
	  
      document.getElementById('addBill').addEventListener("keypress", event => {
        if(event.keyCode === 13) {
          this.addBill(event.target.value);
          event.target.value = "";
        }
      });
    }

    addBillClick() {
      let target = document.getElementById('submitBill');
      this.addBill(target.value);
      target.value = ""
      console.log(target.value)
    }

    addBill(bill) {
      let newBill = {
        bill,
        isPaid: false,
      };
      console.log(newBill)
      let parentDiv = document.getElementById('addBill').parentElement;
      if(bill === '') {
        parentDiv.classList.add('has-error');
      } else {
        parentDiv.classList.remove('has-error');
        this.bills.push(newBill);
        this.loadBills();
      }
    }

    toggleBillStatus(index) {
      this.bills[index].isPaid = !this.bills[index].isPaid;
      this.loadBills();
      console.log(index)
    }

    deleteBill(event, billIndex) {
      event.preventDefault();
      this.bills.splice(billIndex, 1);
      this.loadBills();
    }

    generateBillHtml(bill, index) {
      return `
        <li class="list-group-item checkbox">
          <div class="row">
            <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox">
              <label>
                <input id="togglebillstatus" type="checkbox" onchange="toggleBillStatus(${index})" value="" 
                  class="" ${bill.isPaid?'checked':''}>
              </label>
            </div>
            <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 bill-text ${bill.isPaid?'Paid':''}">
              ${bill.bill}
            </div>
            <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 delete-icon-area">
              <a class="" href="/" onClick="deleteBill(event, ${index})">
                <i id="deleteBill" data-id="${index}" class="delete-icon fa-solid fa-trash"></i>
              </a>
            </div>
          </div>
        </li>
      `;
    }

    loadBills() {
      localStorage.setItem('BILLS', JSON.stringify(this.bills));
      let billsHtml = this.bills.reduce((html, bill, index) => html += this.generateBillHtml(bill, index), '');
      document.getElementById('billList').innerHTML = billsHtml;
    }
}

let toBill = new BillClass()

// window.addEventListener("load", () => {
//   toBill = new BillClass();
// });

addBillBtn.addEventListener('click', () => {
    toBill.addBillClick()
});
