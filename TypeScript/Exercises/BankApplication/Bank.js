"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BankMenu_1 = require("./BankMenu");
var input_1 = require("../input");
var BankUser_1 = require("./BankUser");
var accountInformation = new Map();
var Bank = /** @class */ (function () {
    function Bank() {
    }
    Bank.prototype.createAccount = function (accountMode) {
        function saveUserDetail(modeOfAccount, email, location, name, state, country, age) {
            var genrateAccNo = Math.random() * 10000000000000;
            if (modeOfAccount == "Saving") {
                var genrateAccNoSaving_1 = "Sav" + Math.round(genrateAccNo);
                input_1.r.question("Enter Inital Amount to deposit in Saving Account :- ", function (amt) {
                    if (parseInt(amt) < 500) {
                        input_1.r.question("Enter minimum 500 balance for Account open :-", function (depositAmount) {
                            if (parseInt(depositAmount) < 500) {
                                console.log("Account cannot be open because amount is less than 500");
                                (0, BankMenu_1.default)();
                            }
                            else {
                                var customer = new BankUser_1.default(modeOfAccount, email, genrateAccNoSaving_1, name, location, state, country, Number(depositAmount), age);
                                console.log(customer);
                                accountInformation.set(genrateAccNoSaving_1.toLowerCase(), customer);
                                (0, BankMenu_1.default)();
                            }
                        });
                    }
                    else {
                        var customer = new BankUser_1.default(modeOfAccount, email, genrateAccNoSaving_1, name, location, state, country, Number(amt), age);
                        console.log(customer);
                        accountInformation.set(genrateAccNoSaving_1.toLowerCase(), customer);
                        (0, BankMenu_1.default)();
                    }
                });
            }
            else {
                var genrateAccNoSaving_2 = "Curr" + Math.round(genrateAccNo);
                input_1.r.question("Enter Inital Amount to deposit in Current Account :- ", function (amt) {
                    if (parseInt(amt) < 500) {
                        input_1.r.question("Enter minimum 1000 balance for Account open :-", function (depositAmount) {
                            if (parseInt(depositAmount) < 500) {
                                console.log("Account cannot be open because amount is less than 500");
                                (0, BankMenu_1.default)();
                            }
                            else {
                                var customer = new BankUser_1.default(modeOfAccount, email, genrateAccNoSaving_2, name, location, state, country, Number(depositAmount), age);
                                console.log(customer);
                                accountInformation.set(genrateAccNoSaving_2.toLowerCase(), customer);
                                (0, BankMenu_1.default)();
                            }
                        });
                    }
                    else {
                        var customer = new BankUser_1.default(modeOfAccount, email, genrateAccNoSaving_2, name, location, state, country, Number(amt), age);
                        console.log(customer);
                        accountInformation.set(genrateAccNoSaving_2.toLowerCase(), customer);
                        (0, BankMenu_1.default)();
                    }
                });
            }
        }
        function userInfo(name, age, modeOfAccount) {
            input_1.r.question("Enter your location :-", function (location) {
                input_1.r.question("Enter your state :-", function (state) {
                    input_1.r.question("Enter your country :-", function (country) {
                        input_1.r.question("Enter your email :-", function (email) {
                            var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                            if (!mailFormat.test(email)) {
                                input_1.r.question("Enter valid email : - ", function (newEmail) {
                                    if (!mailFormat.test(newEmail)) {
                                        console.log("Entered Worng email again ... process again");
                                        (0, BankMenu_1.default)();
                                    }
                                    else {
                                        saveUserDetail(modeOfAccount, newEmail, location, name, state, country, age);
                                    }
                                });
                            }
                            else {
                                saveUserDetail(modeOfAccount, email, location, name, state, country, age);
                            }
                        });
                    });
                });
            });
        }
        input_1.r.question("Enter your name :-", function (name) {
            input_1.r.question("Enter your age :-", function (age) {
                if (parseInt(age) > 68 || parseInt(age) < 18) {
                    input_1.r.question("Enter correct age between 18 to 68 :- ", function (newAge) {
                        if (parseInt(newAge) > 68 || parseInt(newAge) < 18) {
                            console.log("Wrong age entered ... process again");
                            (0, BankMenu_1.default)();
                        }
                        else {
                            userInfo(name, parseInt(newAge), accountMode);
                        }
                    });
                }
                else {
                    userInfo(name, parseInt(age), accountMode);
                }
            });
        });
    };
    Bank.prototype.depositMoney = function () {
        input_1.r.question("Enter account number for money Deposit :- ", function (accNumber) {
            var accountNumber = accNumber.toLowerCase();
            if (!accountInformation.has(accountNumber)) {
                console.log("Enter valid Account Number");
                (0, BankMenu_1.default)();
            }
            else {
                input_1.r.question("Enter Amount to Deposit :- ", function (amount) {
                    if (parseInt(amount) >= 1) {
                        accountInformation.get(accountNumber).balance = accountInformation.get(accountNumber).balance + (parseInt(amount));
                        console.log("update Amount in Account " + accountNumber + " : - $" + accountInformation.get(accountNumber).balance);
                        (0, BankMenu_1.default)();
                    }
                    else {
                        console.log("Enter valid Amount to Deposit");
                        (0, BankMenu_1.default)();
                    }
                });
            }
        });
    };
    Bank.prototype.withdrawMoney = function () {
        input_1.r.question("Enter account number for money withdraw :- ", function (accNumber) {
            var accountNumber = accNumber.toLowerCase();
            if (!accountInformation.has(accountNumber)) {
                console.log("Enter valid Account Number");
                (0, BankMenu_1.default)();
            }
            else {
                input_1.r.question("Enter Amount to Withdraw :- ", function (amountWithdraw) {
                    if (parseInt(amountWithdraw) >= 1) {
                        var balanceInAccount = accountInformation.get(accountNumber).balance;
                        var typeofAccount = accountInformation.get(accountNumber).accountType;
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
                        (0, BankMenu_1.default)();
                    }
                });
            }
        });
    };
    Bank.prototype.showBalance = function () {
        input_1.r.question("Enter account number for balance check :- ", function (accNumber) {
            var accountNumber = accNumber.toLowerCase();
            if (!accountInformation.has(accountNumber)) {
                console.log("Enter valid Account Number");
                (0, BankMenu_1.default)();
            }
            else {
                console.log(accountInformation.get(accountNumber).balance);
                (0, BankMenu_1.default)();
            }
        });
    };
    Bank.prototype.accountDetails = function () {
        input_1.r.question("Enter Account Number for Details :- ", function (accNumber) {
            var accountNumber = accNumber.toLowerCase();
            if (!accountInformation.has(accountNumber)) {
                console.log("Enter valid Account Number");
                (0, BankMenu_1.default)();
            }
            else {
                var accountDetails = accountInformation.get(accountNumber);
                console.log("Customer Name :- " + accountDetails.name);
                console.log("Customer Name :- " + accountDetails.email);
                console.log("Customer Account Type :- " + accountDetails.accountType);
                console.log("Balance in Account :- " + accountDetails.balance);
                (0, BankMenu_1.default)();
            }
        });
    };
    return Bank;
}());
exports.default = Bank;
