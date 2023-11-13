import { Console } from "console";
import { r } from "../input";

class Book{

    public title: string;
    public author: string;

    constructor(title: string, author: string) {
        this.title = title;
        this.author = author;
    }
}

class BookData{

    public bookDetails: Book;
    public noOfAvailableBook: number;

    constructor(bookDetails: Book, noOfAvailableBook: number) {
        this.bookDetails = bookDetails;
        this.noOfAvailableBook = noOfAvailableBook;
    }

    public addBook(newBook: number) : void {
        this.noOfAvailableBook += newBook;
    }

    public removeBook(removedBook: number) : void{
        
        this.noOfAvailableBook -= removedBook;
    }
}

class BookUser{

    public id: number;
    public issuedBooks: Map<String, Book>;
    public name: string;

    constructor(name: string) {
        
        this.name = name;
        let randomId = Math.random() * 10;

        this.id = Math.round(randomId);
        this.issuedBooks = new Map();
    }

    public borrowBook(borrowedBook: Book) : String{
        
        if (this.issuedBooks.size < 3) {
            
            this.issuedBooks.set(borrowedBook.title, borrowedBook);

            return "success";
        }

        else {
            console.log("Your Book issue limit already reached to 3 no more books are allowed to checkout.");
            return "failed";
        }
    }

    public releaseBook(releasedBook: Book): String{
        
        if (this.issuedBooks.has(releasedBook.title)) {
            
            this.issuedBooks.delete(releasedBook.title);

            return "success";
        }

        else {
            console.log("Give valid title to realse the book");
            return "failed";
        }
    }
}

class Library{

    public books: Map<string, BookData>;
    public usersOfLibrary: Map<number, BookUser>;

    constructor() {
        this.usersOfLibrary = new Map();
        this.books = new Map();
    }

    public addBookInLibrary(titleOfBook: string, authorOfBook: string, numberOfBooks: number) : void {
        
        if (this.books.has(titleOfBook)) {
            
            let bookInformation = this.books.get(titleOfBook);

            if (bookInformation != null) {
                bookInformation.addBook(numberOfBooks);
                displayMenu();
            }
        }
        else {
            
            let newBook = new Book(titleOfBook, authorOfBook);

            let newBookData = new BookData(newBook, numberOfBooks);

            this.books.set(titleOfBook, newBookData);
            displayMenu();
        }
    }

    public removeBookInLibrary(titleOfBook : string, numberOfBooks : number) : void {
        
        if (this.books.has(titleOfBook)) {
            
            let bookInfo = this.books.get(titleOfBook);

            if (bookInfo) {
                
                let avilableBook = bookInfo.noOfAvailableBook;

                if (avilableBook == 0) {
                    
                    console.log(`${titleOfBook} this book is not present in library for removing.`);
                    displayMenu();
                }

                let remainingBook = avilableBook - numberOfBooks;

                if (remainingBook < 0) {
                    console.log("Enter valid number of book to remove from library.");
                    displayMenu();
                }

                else {

                    bookInfo.noOfAvailableBook = remainingBook;
                    
                    displayMenu();
                }
            }
        }

        else {
            
            console.log(`Book for this name :- ${titleOfBook} is not present in Library.`);
            displayMenu();
        }
    }

    public issueBookToUser(titleOfBook: string) : void {

        if (this.books.size == 0) {
            
            console.log("No Books prsent in the library... first add books in library to issue a book");
            displayMenu();
        }
        
        else if (this.books.has(titleOfBook)) {

            console.log("1. Existing User");
            console.log("2. New User");
            
            r.question("Enter Your Choice :- ", (loginInfo) => {
                
                let checkoutBookInfo = this.books.get(titleOfBook);

                if (loginInfo == "1") {
                    
                    r.question("Please provide your Library Id :- ", (idOfUser) => {
                        
                        let Id = parseInt(idOfUser);

                        if (this.usersOfLibrary.has(Id)) {
                        
                            let userInfo = this.usersOfLibrary.get(Id);
                            
                            if (userInfo) {
        
                                if (checkoutBookInfo && checkoutBookInfo.noOfAvailableBook > 0) {
                                    
                                    let response = userInfo.borrowBook(checkoutBookInfo.bookDetails);
        
                                    if (response == "success") {
                                        
                                        checkoutBookInfo.removeBook(1);
                                        displayMenu();
                                    }
                                    else {
                                        displayMenu();
                                    }
                                }
                            }
                        }
                        else {
                            
                            r.question("Provide Valid Id :- ", (idOfUser) => {
                                let Id = parseInt(idOfUser);

                                if (this.usersOfLibrary.has(Id)) {
                        
                                    let userInfo = this.usersOfLibrary.get(Id);
                            
                                    if (userInfo) {
        
                                        if (checkoutBookInfo && checkoutBookInfo.noOfAvailableBook > 0) {
                                    
                                        let response = userInfo.borrowBook(checkoutBookInfo.bookDetails);
        
                                            if (response == "success") {
                                        
                                                checkoutBookInfo.removeBook(1);
                                                displayMenu();
                                            }
                                            else {
                                                displayMenu();
                                            }
                                        }
                                    }
                                }
                                else {
                                    
                                    console.log("Process again ....");
                                    displayMenu();
                                }
                            });
                        }
                    })
                }
            

                else {
                    
                    r.question("Provide your name for registration in Library :- ", (name) => {
                        let user = new BookUser(name);
                        this.usersOfLibrary.set(user.id, user);
                        console.log(`Id for future refrence ${user.id}`);

                        if (checkoutBookInfo) {
                            let response = user.borrowBook(checkoutBookInfo.bookDetails);

                            if (response == "success") {
                                
                                checkoutBookInfo.removeBook(1);
                                displayMenu();
                            }
                            else {
                                displayMenu();
                            }
                        }
                    });
                }
            })
        }

        else {
            
            console.log(`${titleOfBook} Book is not present in Library .... first add book to library to issue the book.`);
            displayMenu();
        }
    }

    releasedBookfromUser(titleOfBook: string) : void {
        
        if (!this.books.has(titleOfBook)) {
            
            console.log("Invalid title provided for returning book. ");

            displayMenu();
        }
        
        let releasedBookInfo = this.books.get(titleOfBook);

        r.question("Please provide your Library Id :- ", (idOfUser) => {
            let Id = parseInt(idOfUser);

            if (this.usersOfLibrary.has(Id)) {

                let userInfo = this.usersOfLibrary.get(Id);
                    
                if (userInfo && releasedBookInfo) {

                    let response = userInfo.releaseBook(releasedBookInfo.bookDetails);

                    if (response == "success") {
                        
                        releasedBookInfo.addBook(1);
                        displayMenu();
                    }
                    else {
                        displayMenu();
                    }
                }        
            }

            else {
                
                r.question("Provide valid Id for returning the book :- ", (idOfUser) => {
                    
                    let Id = parseInt(idOfUser);

                    if (this.usersOfLibrary.has(Id)) {

                        let userInfo = this.usersOfLibrary.get(Id);
                    
                        if (userInfo && releasedBookInfo) {

                            let response = userInfo.releaseBook(releasedBookInfo.bookDetails);

                            if (response == "success") {
                        
                                releasedBookInfo.addBook(1);
                                displayMenu();
                            }
                            else {
                                displayMenu();
                            }
                        }        
                    }

                    else {
                        console.log("Process agian ....");
                        displayMenu();
                    }
                })
            }
        });
    }

    public listAllBook() : void{

        if (this.books.size == 0) {
            console.log("No Books availble in Library.")

            displayMenu();
        }
        
        else {

            console.log("Availble Books in Library.")

            this.books.forEach((values, keys) => {
                let bookInfor = values.bookDetails;
                if (values.noOfAvailableBook > 0) {
                    console.log(`Title of Book is ${bookInfor.title} and author is ${bookInfor.author} and copies availble is ${values.noOfAvailableBook}`);
                }
            })

            displayMenu();
        }
    }
}
let library = new Library();

function displayMenu(): void {
    
    console.log();

    console.log("--------------------------------------------------------------------------");
    
    console.log("1. Book Issue");
    console.log("2. Show Books");
    console.log("3. Book release");
    console.log("4. Add Book to Library");
    console.log("5. Remove Book to Library");
    console.log("6. Cancel");

    r.question("Enter your choice :- ", (options) => {
        
        if (options == "1") {
        
            r.question("Provide Title of Book for checkout :- ", (titleOfBook) => {

                if (titleOfBook) {
                    library.issueBookToUser(titleOfBook);
                }
                else {
                    console.log("Enter non empty title");
                }
            });
        }
    
        else if (options == "2") {
            library.listAllBook();
        }
    
        else if (options == "3") {
            
            r.question("Provide Title for returning Book to Library:- ", (titleOfBook) => {

                if (titleOfBook) {
                    library.releasedBookfromUser(titleOfBook);
                }
                else {
                    console.log("Enter non empty title");
                }
            })
        }
    
        else if (options == "4") {

            r.question("Provide Title of Book for adding in Library :- ", (titleOfBook) => {
                
                r.question("Provide Author of Book for adding in Library :- ", (authorOfBook) => {
                    
                    r.question("Provide the number of Book to add in Library value should be greater than 0 :- ", (numberOfCopies) => {
                        
                        if (parseInt(numberOfCopies) <= 0) {
                            
                            r.question("Enter copies value greater than 0 :- ", (copies)=> {
                                
                                if (parseInt(copies) <= 0) {
                                    
                                    console.log("Entered copies are incorrect for adding book in library .... process again.");
                                    displayMenu();
                                }
                                else {
                                    library.addBookInLibrary(titleOfBook, authorOfBook, parseInt(copies));
                                }
                            })
                        }
                        else {
                            library.addBookInLibrary(titleOfBook, authorOfBook, parseInt(numberOfCopies));    
                        }
                    })
                })
            })
        }
    
        else if (options == "5") {

            r.question("Provide Title of Book for removing Book from Library :- ", (titleOfBook) => {
                r.question("Provide the number of Book to remove from Library value should be greater than 1 :- ", (numberOfCopies) => {
                    library.removeBookInLibrary(titleOfBook, parseInt(numberOfCopies));
                })
            });
        }
        else if (options == "6") {
            r.close();
        }
        else {
            
            console.log("Enter the correct choice");
            displayMenu();
        }
    });

    
}

displayMenu();