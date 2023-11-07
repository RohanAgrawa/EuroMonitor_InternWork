"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var r = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
var CustomerDetail = /** @class */ (function () {
    function CustomerDetail(type, email, accountNo, name, location, state, country, balance, age) {
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
    return CustomerDetail;
}());
var accountInformation = new Map();
var Bank = /** @class */ (function () {
    function Bank() {
    }
    Bank.prototype.createAccount = function (modeOfAccount, minDepositAmount) {
        r.question("Enter your name :-", function (name) {
            r.question("Enter your age :-", function (age) {
                r.question("Enter your location :-", function (location) {
                    r.question("Enter your state :-", function (state) {
                        r.question("Enter your country :-", function (country) {
                            r.question("Enter your email :-", function (email) {
                                if (parseInt(age) > 68) {
                                    console.log("You are not eligible for account opening.");
                                    repeat();
                                }
                                else if (!email.includes("@")) {
                                    console.log("Enter valid Email");
                                    repeat();
                                }
                                else {
                                    var genrateAccNo = Math.random() * 10000000000000;
                                    if (modeOfAccount == "Saving") {
                                        var genrateAccNoSaving = "Sav" + Math.round(genrateAccNo);
                                        var customer = new CustomerDetail(modeOfAccount, email, genrateAccNoSaving, name, location, state, country, Number(minDepositAmount), parseInt(age));
                                        console.log(customer);
                                        accountInformation.set(genrateAccNoSaving, customer);
                                    }
                                    else {
                                        var genrateAccNoSaving = "Curr" + Math.round(genrateAccNo);
                                        var customer = new CustomerDetail(modeOfAccount, email, genrateAccNoSaving, name, location, state, country, Number(minDepositAmount), parseInt(age));
                                        console.log(customer);
                                        accountInformation.set(genrateAccNoSaving, customer);
                                    }
                                    repeat();
                                }
                            });
                        });
                    });
                });
            });
        });
    };
    Bank.prototype.depositMoney = function () {
        r.question("Enter account number for money Deposit :- ", function (accountNumber) {
            if (!accountInformation.has(accountNumber)) {
                console.log("Enter valid Account Number");
                repeat();
            }
            else {
                r.question("Enter Amount to Deposit :- ", function (amount) {
                    if (parseInt(amount) >= 1) {
                        accountInformation.get(accountNumber).balance = accountInformation.get(accountNumber).balance + (parseInt(amount));
                        console.log("update Amount in Account " + accountNumber + " : - $" + accountInformation.get(accountNumber).balance);
                        repeat();
                    }
                    else {
                        console.log("Enter valid Amount to Deposit");
                        repeat();
                    }
                });
            }
        });
    };
    Bank.prototype.withdrawMoney = function () {
        r.question("Enter account number for money withdraw :- ", function (accountNumber) {
            if (!accountInformation.has(accountNumber)) {
                console.log("Enter valid Account Number");
                repeat();
            }
            else {
                r.question("Enter Amount to Withdraw :- ", function (amountWithdraw) {
                    if (parseInt(amountWithdraw) >= 1) {
                        var balanceInAccount = accountInformation.get(accountNumber).balance;
                        var typeofAccount = accountInformation.get(accountNumber).type;
                        var remainingBalance = balanceInAccount - parseInt(amountWithdraw);
                        if (typeofAccount == "Saving") {
                            if (remainingBalance < 500) {
                                console.log("Enter valid amount to withdraw from saving account minimum balance should be 500");
                            }
                            else {
                                accountInformation.get(accountNumber).balance = remainingBalance;
                                console.log("After Withdraw money reamining blance in account :- " + accountNumber + " $" + accountInformation.get(accountNumber).balance);
                            }
                        }
                        else {
                            if (remainingBalance < 1000) {
                                console.log("Enter valid amount to withdraw from current account minimum balance should be 1000");
                            }
                            else {
                                accountInformation.get(accountNumber).balance = remainingBalance;
                                console.log("After Withdraw money reamining blance in account :- " + accountNumber + " $" + accountInformation.get(accountNumber).balance);
                            }
                        }
                        repeat();
                    }
                });
            }
        });
    };
    Bank.prototype.showBalance = function () {
        r.question("Enter account number for balance check :- ", function (accountNumber) {
            if (!accountInformation.has(accountNumber)) {
                console.log("Enter valid Account Number");
                repeat();
            }
            else {
                console.log(accountInformation.get(accountNumber).balance);
                repeat();
            }
        });
    };
    Bank.prototype.accountDetails = function () {
        r.question("Enter Account Number for Details :- ", function (accountNumber) {
            if (!accountInformation.has(accountNumber)) {
                console.log("Enter valid Account Number");
                repeat();
            }
            else {
                var accountDetails = accountInformation.get(accountNumber);
                console.log("Customer Name :- " + accountDetails.name);
                console.log("Customer Name :- " + accountDetails.email);
                console.log("Customer Account Type :- " + accountDetails.type);
                console.log("Balance in Account :- " + accountDetails.balance);
                repeat();
            }
        });
    };
    return Bank;
}());
var bank = new Bank();
function repeat() {
    console.log();
    console.log("-------------------------------------------------------------------------------------------------------------");
    console.log("1. Create Account");
    console.log("2. Show Balance");
    console.log("3. Deposit Money");
    console.log("4. Withdraw Money");
    console.log("5. Account Information");
    console.log("6. Exit Application");
    r.question("Enter your choice :- ", function (options) {
        if (options == "1") {
            console.log("1. Saving");
            console.log("2. current");
            r.question("Which type of account you want open (1 or 2)", function (accountType) {
                if (accountType == "1") {
                    bank.createAccount("Saving", 500);
                }
                else if (accountType = "2") {
                    bank.createAccount("Current", 1000);
                }
                else {
                    console.log("Enter the Valid Choice");
                }
            });
        }
        if (options == "2") {
            bank.showBalance();
        }
        else if (options == "3") {
            bank.depositMoney();
        }
        else if (options == "4") {
            bank.withdrawMoney();
        }
        else if (options == "5") {
            bank.accountDetails();
        }
        else if (options == "6") {
            r.close();
        }
    });
}
repeat();
