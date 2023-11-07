import { read } from "fs";
import { exit } from "process";
import * as readline from "readline";

const r = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


class CustomerDetail{

    public accountNo: string;
    public name: string;
    public location: string;
    public state: string;
    public country: string;
    public balance: number;
    public age: number;
    public email: string;
    public type: string;
    
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

 let accountInformation = new Map();

class Bank{

    constructor() {
        
    }

    public createAccount(modeOfAccount : string, minDepositAmount : number) {

        
        r.question("Enter your name :-", (name) => {
            
            r.question("Enter your age :-", (age) => {
                
                r.question("Enter your location :-", (location) => {
                    
                    r.question("Enter your state :-", (state) => {
                        
                        r.question("Enter your country :-", (country) => {

                            r.question("Enter your email :-", (email) => {
                                
                                if (parseInt(age) > 68) {
                                    console.log("You are not eligible for account opening.");
                                    repeat();
                                }

                                else if (!email.includes("@")) {
                                    console.log("Enter valid Email");
                                    repeat();
                                }

                                else {
                                    const genrateAccNo = Math.random() * 10000000000000;

                                    if (modeOfAccount == "Saving") {
                                        const genrateAccNoSaving = "Sav" + Math.round(genrateAccNo);
                                        let customer = new CustomerDetail(modeOfAccount, email, genrateAccNoSaving, name, location, state, country, Number(minDepositAmount), parseInt(age));
                                        console.log(customer);
                                        accountInformation.set(genrateAccNoSaving, customer);
                                    }
                                    else {
                                        const genrateAccNoSaving = "Curr" + Math.round(genrateAccNo);
                                        let customer = new CustomerDetail(modeOfAccount, email, genrateAccNoSaving, name, location, state, country, Number(minDepositAmount), parseInt(age));
                                        console.log(customer);
                                        accountInformation.set(genrateAccNoSaving, customer);
                                    }
                                    
                                    repeat();
                                }
                            })
                        })
                    })
                })
            })
        })

    }

    public depositMoney() {
        
        r.question("Enter account number for money Deposit :- ", (accountNumber) => {

            if (!accountInformation.has(accountNumber)) {
                console.log("Enter valid Account Number");
                repeat();
            }

            else {
                
                r.question("Enter Amount to Deposit :- ", (amount) => {
                    
                    if (parseInt(amount) >= 1) {
                        accountInformation.get(accountNumber).balance = accountInformation.get(accountNumber).balance + (parseInt(amount));
                        console.log("update Amount in Account " + accountNumber + " : - $" + accountInformation.get(accountNumber).balance);
                        repeat();
                    }
                    else {
                        console.log("Enter valid Amount to Deposit");
                        repeat();
                    }
                })
            }
        });

        
    }

    public withdrawMoney() {

        r.question("Enter account number for money withdraw :- ", (accountNumber) => {

            if (!accountInformation.has(accountNumber)) {
                console.log("Enter valid Account Number");
                repeat();
            }

            else {
                
                r.question("Enter Amount to Withdraw :- ", (amountWithdraw) => {

                    if (parseInt(amountWithdraw) >= 1) {
                        
                        const balanceInAccount = accountInformation.get(accountNumber).balance;

                        const typeofAccount = accountInformation.get(accountNumber).type;

                        const remainingBalance = balanceInAccount - parseInt(amountWithdraw);

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
                })
            }
        })

            
    }

    public showBalance() {
        
        r.question("Enter account number for balance check :- ",(accountNumber)=> {
            
            if (!accountInformation.has(accountNumber)) {
                console.log("Enter valid Account Number");
                repeat();
            }
            else {
                console.log(accountInformation.get(accountNumber).balance);
                repeat();
            }
        })
            
    }

    public accountDetails() {

        r.question("Enter Account Number for Details :- ",(accountNumber)=> {
            
            if (!accountInformation.has(accountNumber)) {
                console.log("Enter valid Account Number");
                repeat();
            }

            else {
                
                let accountDetails = accountInformation.get(accountNumber);

                console.log("Customer Name :- " + accountDetails.name);
                console.log("Customer Name :- " + accountDetails.email);
                console.log("Customer Account Type :- " + accountDetails.type);
                console.log("Balance in Account :- " + accountDetails.balance);
                repeat();
            }
        })
   
    }
}

let bank = new Bank();

function repeat() {
    console.log();

    console.log("-------------------------------------------------------------------------------------------------------------");
    
    console.log("1. Create Account");
    console.log("2. Show Balance");
    console.log("3. Deposit Money");
    console.log("4. Withdraw Money");
    console.log("5. Account Information");
    console.log("6. Exit Application");

    r.question("Enter your choice :- ", (options) => {
        
        if (options == "1") {

            console.log("1. Saving");
            console.log("2. current");

            r.question("Which type of account you want open (1 or 2)", (accountType) => {
                
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
        
        
    })
}

repeat();