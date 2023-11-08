export default class CustomerDetail{

    public accountNo: string;
    public name: string;
    public location: string;
    public state: string;
    public country: string;
    public balance: number;
    public age: number;
    public email: string;
    public accountType: string;
    
    constructor(accountType : string, email : string, accountNo : string, name : string, location : string, state : string, country : string, balance : number, age : number) {
        this.accountNo = accountNo,
        this.name = name,
        this.location = location,
        this.state = state,
        this.country = country,
        this.balance = balance    
        this.age = age;
        this.email = email;
        this.accountType = accountType;
    }
}