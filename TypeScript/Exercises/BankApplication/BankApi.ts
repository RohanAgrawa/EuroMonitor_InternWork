export default interface BankApi{

    createAccount(accountMode: string): void;

    depositMoney(): void;

    withdrawMoney(): void;

    showBalance(): void;

    accountDetails(): void;
}