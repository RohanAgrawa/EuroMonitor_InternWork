
import displayMenu from "./BankMenu";
import { r } from "../input"
import CustomerDetail from "./BankUser";
import BankApi from "./BankApi";

let accountInformation = new Map();
export default class Bank implements BankApi{

    public createAccount(accountMode: string): void{
        
        function saveUserDetail(modeOfAccount : string, email : string, location : string, name : string, state : string, country : string, age : number) : void{
            const genrateAccNo = Math.random() * 10000000000000;

            if (modeOfAccount == "Saving") {
                const genrateAccNoSaving = "Sav" + Math.round(genrateAccNo);

                r.question("Enter Inital Amount to deposit in Saving Account :- ", (amt) => {
                    
                    if (parseInt(amt) < 500) {
                        
                        r.question("Enter minimum 500 balance for Account open :-", (depositAmount) => {
                            
                            if (parseInt(depositAmount) < 500) {
                                
                                console.log("Account cannot be open because amount is less than 500");
                                displayMenu();
                            }
                            else {
                                let customer = new CustomerDetail(modeOfAccount, email, genrateAccNoSaving, name, location, state, country, Number(depositAmount), age);
                                console.log(customer);
                                accountInformation.set(genrateAccNoSaving.toLowerCase(), customer);
                                displayMenu();
                            }
                        })
                    }
                    else {
                        let customer = new CustomerDetail(modeOfAccount, email, genrateAccNoSaving, name, location, state, country, Number(amt), age);
                        console.log(customer);
                        accountInformation.set(genrateAccNoSaving.toLowerCase(), customer);
                        displayMenu();
                    }
                })
                
            }

            else {
                const genrateAccNoSaving = "Curr" + Math.round(genrateAccNo);
                r.question("Enter Inital Amount to deposit in Current Account :- ", (amt) => {
                    
                    if (parseInt(amt) < 500) {
                        
                        r.question("Enter minimum 1000 balance for Account open :-", (depositAmount) => {
                            
                            if (parseInt(depositAmount) < 500) {
                                
                                console.log("Account cannot be open because amount is less than 500");
                                displayMenu();
                            }
                            else {
                                let customer = new CustomerDetail(modeOfAccount, email, genrateAccNoSaving, name, location, state, country, Number(depositAmount), age);
                                console.log(customer);
                                accountInformation.set(genrateAccNoSaving.toLowerCase(), customer);
                                displayMenu();
                            }
                        })
                    }
                    else {
                        let customer = new CustomerDetail(modeOfAccount, email, genrateAccNoSaving, name, location, state, country, Number(amt), age);
                        console.log(customer);
                        accountInformation.set(genrateAccNoSaving.toLowerCase(), customer);
                        displayMenu();
                    }
                })
            }
        }

        function userInfo(name : string, age : number , modeOfAccount : string) :void {
            r.question("Enter your location :-", (location) => {
                    
                r.question("Enter your state :-", (state) => {
                    
                    r.question("Enter your country :-", (country) => {

                        r.question("Enter your email :-", (email) => {
                            
                            let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

                            if (!mailFormat.test(email)) {
                                
                                r.question("Enter valid email : - ", (newEmail) => {

                                    if (!mailFormat.test(newEmail)) {
                                        console.log("Entered Worng email again ... process again")
                                        displayMenu();
                                    }
                                    else {
                                        saveUserDetail(modeOfAccount, newEmail, location, name, state, country, age)
                                    }
                                })

                                
                            }

                            else {
                                
                                saveUserDetail(modeOfAccount, email, location, name, state, country, age);
                            }
                        })
                    })
                })
            })
        }
        r.question("Enter your name :-", (name) => {
            
            r.question("Enter your age :-", (age) => {
                
                if (parseInt(age) > 68 || parseInt(age) < 18) {

                    r.question("Enter correct age between 18 to 68 :- ", (newAge) => {
                        
                        if (parseInt(newAge) > 68 || parseInt(newAge) < 18) {
                            console.log("Wrong age entered ... process again")
                            displayMenu();
                        }

                        else {
                            userInfo(name, parseInt(newAge), accountMode);
                        }
                    });
                    
                }
                else {
                    userInfo(name, parseInt(age), accountMode);
                 
                }
            })
        })

    }

    public depositMoney() : void{
        
        r.question("Enter account number for money Deposit :- ", (accNumber) => {

            const accountNumber = accNumber.toLowerCase();

            if (!accountInformation.has(accountNumber)) {
                console.log("Enter valid Account Number");
                displayMenu();
            }

            else {
                
                r.question("Enter Amount to Deposit :- ", (amount) => {
                    
                    if (parseInt(amount) >= 1) {
                        accountInformation.get(accountNumber).balance = accountInformation.get(accountNumber).balance + (parseInt(amount));
                        console.log("update Amount in Account " + accountNumber + " : - $" + accountInformation.get(accountNumber).balance);
                        displayMenu();
                    }
                    else {
                        console.log("Enter valid Amount to Deposit");
                        displayMenu();
                    }
                })
            }
        });

        
    }

    public withdrawMoney() : void{

        r.question("Enter account number for money withdraw :- ", (accNumber) => {

            const accountNumber = accNumber.toLowerCase();

            if (!accountInformation.has(accountNumber)) {
                console.log("Enter valid Account Number");
                displayMenu();
            }

            else {
                
                r.question("Enter Amount to Withdraw :- ", (amountWithdraw) => {

                    if (parseInt(amountWithdraw) >= 1) {
                        
                        const balanceInAccount = accountInformation.get(accountNumber).balance;

                        const typeofAccount = accountInformation.get(accountNumber).accountType;

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
                        displayMenu();
                    }
                })
            }
        })

            
    }

    public showBalance() : void{
        
        r.question("Enter account number for balance check :- ", (accNumber) => {
            const accountNumber = accNumber.toLowerCase();

            if (!accountInformation.has(accountNumber)) {
                console.log("Enter valid Account Number");
                displayMenu();
            }
            else {
                console.log(accountInformation.get(accountNumber).balance);
                displayMenu();
            }
        });
            
    }

    public accountDetails() : void{

        r.question("Enter Account Number for Details :- ",(accNumber)=> {
            
            const accountNumber = accNumber.toLowerCase();

            if (!accountInformation.has(accountNumber)) {
                console.log("Enter valid Account Number");
                displayMenu();
            }

            else {
                
                let accountDetails = accountInformation.get(accountNumber);

                console.log("Customer Name :- " + accountDetails.name);
                console.log("Customer Name :- " + accountDetails.email);
                console.log("Customer Account Type :- " + accountDetails.accountType);
                console.log("Balance in Account :- " + accountDetails.balance);
                displayMenu();
            }
        })
   
    }
}