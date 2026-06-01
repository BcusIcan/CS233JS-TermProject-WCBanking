// Accounts Array
const accounts = []
// Tracked Account
let visibleAccount = null;

// Account Class Constructor & Methods
class Account {
    constructor(name, balance) {
        this.name = name;
        this.balance = balance;
    }

    withdraw(amount) 
    {
        if(amount <= this.balance)
        {
            this.balance -= amount;
            displayAccount();
        } else {
            alert("Insufficient Funds In Account.")
        }
    }

    deposit(amount)
    {
        if(amount > 0)
        {
            this.balance += amount;
            displayAccount();
        } else {
            alert('You can\'t deposit 0 dollars or less.')
        }
    }
}

// Update/Display Functions
function displayAccount()
{
    if(visibleAccount)
    {
        document.getElementById('accName').textContent = visibleAccount.name;
        document.getElementById('accBalance').textContent = visibleAccount.balance;
    }
}

function changeAccountDisplay() 
{
    const select = document.getElementById('accSelect');
    const index = select.value;
    visibleAccount = accounts[index];
    displayAccount();
}

// Button Functions
function withdrawBtn()
{
    const amount = parseFloat(document.getElementById('withdrawInput').value);
    if(amount)
    {
        visibleAccount.withdraw(amount);
    }
}

function depositBtn()
{
    const amount = parseFloat(document.getElementById('depositInput').value);
    if(amount)
    {
        visibleAccount.deposit(amount);
    }
}

function transferBtn()
{
    const amount = parseFloat(document.getElementById('transferInput').value)
    const accountIndex = document.getElementById('transferTo').value;
    const account = accounts[accountIndex];

    if(!account) 
    {
        alert('No Account Selected.');
        return;
    }

    if(account === visibleAccount)
    {
        alert('You Can\'t Transfer To The Same Account.');
        return;
    }

    if(amount <= 0 || isNaN(amount))
    {
        alert('Invalid Transfer Amount.')
        return;
    }
    visibleAccount.withdraw(amount);
    account.deposit(amount);
}   

// Account Creation
function createAccount()
{
    const name = document.getElementById('nameInput').value;
    const balance = document.getElementById('startBalance').value;
    const balanceParsed = parseFloat(balance);

    if(name != '' && balanceParsed >= 0) 
    {
        const account = new Account(name, balanceParsed);
        accounts.push(account);

        let select = document.getElementById('accSelect');
        const newAccountOption = new Option(name, accounts.length - 1);
        select.add(newAccountOption);

        let transferSelect = document.getElementById('transferTo');
        const newTransferOption = new Option(name, accounts.length - 1);
        transferSelect.add(newTransferOption);

        visibleAccount = account;
        displayAccount();
    } else {
        alert("You Must Assign A Name And Balance To Create An Account.");
    }
}