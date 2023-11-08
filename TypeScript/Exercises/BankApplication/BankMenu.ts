import Bank from "./Bank";
import { r } from "../input";

let bank = new Bank();
export default function displayMenu(): void {
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
                    bank.createAccount("Saving");

                }

                else if (accountType = "2") {
                    bank.createAccount("Current");
                   
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