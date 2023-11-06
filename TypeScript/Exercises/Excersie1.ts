
// let user : {

//     accountNo: number,
//     name: string,
//     location: string,
//     state: string,
//     country: string,
//     balance : string
// }

class user{

    accountNo: string;
    name: string;
    location: string;
    state: string;
    country: string;
    balance: number;
    age: number;
    email: string;
    type: string;
    
    constructor(type : string, email : string, accountNo : string, name : string, location : string, state : string, country : string, balance : number, age : number) {
        this.accountNo = accountNo,
        this.name = name,
        this.location = location,
        this.state = state,
        this.country = country,
        this.balance = balance    
        this.age = age;
        this.email = email;
        this.type = type;
    }
}
let users = new Map();

while (true) {
    const options = prompt("Enter your choice : Create Account / Transaction / Cancel");

    if (options == "Create Account") {
    
        const accountType = prompt("Enter your choice : Saving Account / Current Account");
        const name = prompt("Enter your name");
        const age = prompt("Enter your age");
        const location = prompt("Enter your location");
        const country = prompt("Enter your country");
        const state = prompt("Enter your state");
        const email = prompt("Enter your email id");

        if (age != null && parseInt(age) > 68) {
            console.log("You are not eligible for account opening.");
        }

        else {
            if (accountType == "Saving Account") {
        
            const genrateAccNo = Math.random() * 10000000000000;
            const genrateAccNoSaving = "Sav" + Math.round(genrateAccNo);
           
            
            if(name != null && country != null && state != null && location != null && age != null && email != null)
            {
                let customer = new user("Saving", email, genrateAccNoSaving, name, location, state, country, Number(500), parseInt(age));
                console.log(customer);
                users.set(genrateAccNoSaving, customer);
            }
            }
            else {
            
                const genrateAccNo = Math.random() * 10000000000000;
                const genrateAccNoCurrent = "Curr" + Math.round(genrateAccNo);
            
                if(name != null && country != null && state != null && location != null && age != null && email != null)
                {
                    let customer = new user("Current", email, genrateAccNoCurrent, name, location, state, country, Number(1000), parseInt(age));
                    console.log(customer);
                    users.set(genrateAccNoCurrent, customer)
                }
            }
        }
    }

    else if(options == "Transaction") {
         
        let transaction = prompt("Deposit Money / Withdraw Money / Show Balance / Account Details");

        if (transaction == "Show Balance") {
        
            const accountNumber = prompt("Enter Account Number for Balance check");

            if (!users.has(accountNumber)) {
                console.log("Enter valid Account Number");
            }
            else {
                console.log(users.get(accountNumber).balance);
            }
        }

        else if (transaction == "Deposit Money") {
            
            const accountNumber = prompt("Enter Account Number for Deposit the Money");

            if (!users.has(accountNumber)) {
                console.log("Enter valid Account Number");
            }

            else {
                
                const amount = prompt("Enter the Amount to Deposit");

                if (amount != null && parseInt(amount) >= 1) {
                    users.get(accountNumber).balance = users.get(accountNumber).balance + (parseInt(amount));
                    console.log("update Amount in Account " + accountNumber + " : - $" + users.get(accountNumber).balance);
                }
                
                else {
                    console.log("Enter valid Amount to Deposit");
                }
            }
        }

        else if (transaction == "Withdraw Money") {
            
            const accountNumber = prompt("Enter Account Number for Withdraw the Money");

            if (!users.has(accountNumber)) {
                console.log("Enter valid Account Number");
            }

            else {
                
                const amountWithdraw = prompt("Enter the Amount to Withdraw");

                if (amountWithdraw != null && parseInt(amountWithdraw) >= 1) {
                    
                    const balanceInAccount = users.get(accountNumber).balance;

                    const typeofAccount = users.get(accountNumber).type;

                    const remainingBalance = balanceInAccount - parseInt(amountWithdraw);

                    if (typeofAccount == "Saving") {
                        
                        if (remainingBalance < 500) {
                            
                            console.log("Enter valid amount to withdraw from saving account minimum balance should be 500");
                        }

                        else {
                            
                            users.get(accountNumber).balance = remainingBalance;

                            console.log("After Withdraw money reamining blance in account :- " + accountNumber + " $" + users.get(accountNumber).balance);
                        }
                    }

                    else {
                        
                        if (remainingBalance < 1000) {
                            
                            console.log("Enter valid amount to withdraw from current account minimum balance should be 1000");
                        }

                        else {
                            
                            users.get(accountNumber).balance = remainingBalance;

                            console.log("After Withdraw money reamining blance in account :- " + accountNumber + " $" + users.get(accountNumber).balance);
                        }
                    }
                }
                
            }
        }

        else if (transaction == "Account Details") {
            
            const accountNumber = prompt("Enter Account Number for Details.");

            if (!users.has(accountNumber)) {
                console.log("Enter valid Account Number");
            }

            else {
                
                let accountDetails = users.get(accountNumber);

                console.log("Customer Name :- " + accountDetails.name);
                console.log("Customer Name :- " + accountDetails.email);
                console.log("Customer Account Type :- " + accountDetails.type);
                console.log("Balance in Account :- " + accountDetails.balance);
            }
        }

        else {
            console.log("Enter a valid choice");
        }
    }

    else if (options == "Cancel") {
        break;
    }
}


