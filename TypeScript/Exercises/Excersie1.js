// let user : {
//     accountNo: number,
//     name: string,
//     location: string,
//     state: string,
//     country: string,
//     balance : string
// }
var user = /** @class */ (function () {
    function user(type, email, accountNo, name, location, state, country, balance, age) {
        this.accountNo = accountNo,
            this.name = name,
            this.location = location,
            this.state = state,
            this.country = country,
            this.balance = balance;
        this.age = age;
        this.email = email;
        this.type = type;
    }
    return user;
}());
var users = new Map();
while (true) {
    var options = prompt("Enter your choice : Create Account / Transaction / Cancel");
    if (options == "Create Account") {
        var accountType = prompt("Enter your choice : Saving Account / Current Account");
        var name_1 = prompt("Enter your name");
        var age = prompt("Enter your age");
        var location_1 = prompt("Enter your location");
        var country = prompt("Enter your country");
        var state = prompt("Enter your state");
        var email = prompt("Enter your email id");
        if (age != null && parseInt(age) > 68) {
            console.log("You are not eligible for account opening.");
        }
        else {
            if (accountType == "Saving Account") {
                var genrateAccNo = Math.random() * 10000000000000;
                var genrateAccNoSaving = "Sav" + Math.round(genrateAccNo);
                if (name_1 != null && country != null && state != null && location_1 != null && age != null && email != null) {
                    var customer = new user("Saving", email, genrateAccNoSaving, name_1, location_1, state, country, Number(500), parseInt(age));
                    console.log(customer);
                    users.set(genrateAccNoSaving, customer);
                }
            }
            else {
                var genrateAccNo = Math.random() * 10000000000000;
                var genrateAccNoCurrent = "Curr" + Math.round(genrateAccNo);
                if (name_1 != null && country != null && state != null && location_1 != null && age != null && email != null) {
                    var customer = new user("Current", email, genrateAccNoCurrent, name_1, location_1, state, country, Number(1000), parseInt(age));
                    console.log(customer);
                    users.set(genrateAccNoCurrent, customer);
                }
            }
        }
    }
    else if (options == "Transaction") {
        var transaction = prompt("Deposit Money / Withdraw Money / Show Balance / Account Details");
        if (transaction == "Show Balance") {
            var accountNumber = prompt("Enter Account Number for Balance check");
            if (!users.has(accountNumber)) {
                console.log("Enter valid Account Number");
            }
            else {
                console.log(users.get(accountNumber).balance);
            }
        }
        else if (transaction == "Deposit Money") {
            var accountNumber = prompt("Enter Account Number for Deposit the Money");
            if (!users.has(accountNumber)) {
                console.log("Enter valid Account Number");
            }
            else {
                var amount = prompt("Enter the Amount to Deposit");
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
            var accountNumber = prompt("Enter Account Number for Withdraw the Money");
            if (!users.has(accountNumber)) {
                console.log("Enter valid Account Number");
            }
            else {
                var amountWithdraw = prompt("Enter the Amount to Withdraw");
                if (amountWithdraw != null && parseInt(amountWithdraw) >= 1) {
                    var balanceInAccount = users.get(accountNumber).balance;
                    var typeofAccount = users.get(accountNumber).type;
                    var remainingBalance = balanceInAccount - parseInt(amountWithdraw);
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
            var accountNumber = prompt("Enter Account Number for Details.");
            if (!users.has(accountNumber)) {
                console.log("Enter valid Account Number");
            }
            else {
                var accountDetails = users.get(accountNumber);
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
