"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var input_1 = require("../input");
var Book = /** @class */ (function () {
    function Book(title, author) {
        this.title = title;
        this.author = author;
    }
    return Book;
}());
var BookData = /** @class */ (function () {
    function BookData(bookDetails, noOfAvailableBook) {
        this.bookDetails = bookDetails;
        this.noOfAvailableBook = noOfAvailableBook;
    }
    BookData.prototype.addBook = function (newBook) {
        this.noOfAvailableBook += newBook;
    };
    BookData.prototype.removeBook = function (removedBook) {
        this.noOfAvailableBook -= removedBook;
    };
    return BookData;
}());
var BookUser = /** @class */ (function () {
    function BookUser(name) {
        this.name = name;
        var randomId = Math.random() * 10;
        this.id = Math.round(randomId);
        this.issuedBooks = new Map();
    }
    BookUser.prototype.borrowBook = function (borrowedBook) {
        if (this.issuedBooks.size < 3) {
            this.issuedBooks.set(borrowedBook.title, borrowedBook);
            return "success";
        }
        else {
            console.log("Your Book issue limit already reached to 3 no more books are allowed to checkout.");
            return "failed";
        }
    };
    BookUser.prototype.releaseBook = function (releasedBook) {
        if (this.issuedBooks.has(releasedBook.title)) {
            this.issuedBooks.delete(releasedBook.title);
            return "success";
        }
        else {
            console.log("Give valid title to realse the book");
            return "failed";
        }
    };
    return BookUser;
}());
var Library = /** @class */ (function () {
    function Library() {
        this.usersOfLibrary = new Map();
        this.books = new Map();
    }
    Library.prototype.addBookInLibrary = function (titleOfBook, authorOfBook, numberOfBooks) {
        if (this.books.has(titleOfBook)) {
            var bookInformation = this.books.get(titleOfBook);
            if (bookInformation != null) {
                bookInformation.addBook(numberOfBooks);
                displayMenu();
            }
        }
        else {
            var newBook = new Book(titleOfBook, authorOfBook);
            var newBookData = new BookData(newBook, numberOfBooks);
            this.books.set(titleOfBook, newBookData);
            displayMenu();
        }
    };
    Library.prototype.removeBookInLibrary = function (titleOfBook, numberOfBooks) {
        if (this.books.has(titleOfBook)) {
            var bookInfo = this.books.get(titleOfBook);
            if (bookInfo) {
                var avilableBook = bookInfo.noOfAvailableBook;
                if (avilableBook == 0) {
                    console.log("".concat(titleOfBook, " this book is not present in library for removing."));
                    displayMenu();
                }
                var remainingBook = avilableBook - numberOfBooks;
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
            console.log("Book for this name :- ".concat(titleOfBook, " is not present in Library."));
            displayMenu();
        }
    };
    Library.prototype.issueBookToUser = function (titleOfBook) {
        var _this = this;
        if (this.books.size == 0) {
            console.log("No Books prsent in the library... first add books in library to issue a book");
            displayMenu();
        }
        else if (this.books.has(titleOfBook)) {
            console.log("1. Existing User");
            console.log("2. New User");
            input_1.r.question("Enter Your Choice :- ", function (loginInfo) {
                var checkoutBookInfo = _this.books.get(titleOfBook);
                if (loginInfo == "1") {
                    input_1.r.question("Please provide your Library Id :- ", function (idOfUser) {
                        var Id = parseInt(idOfUser);
                        if (_this.usersOfLibrary.has(Id)) {
                            var userInfo = _this.usersOfLibrary.get(Id);
                            if (userInfo) {
                                if (checkoutBookInfo && checkoutBookInfo.noOfAvailableBook > 0) {
                                    var response = userInfo.borrowBook(checkoutBookInfo.bookDetails);
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
                            input_1.r.question("Provide Valid Id :- ", function (idOfUser) {
                                var Id = parseInt(idOfUser);
                                if (_this.usersOfLibrary.has(Id)) {
                                    var userInfo = _this.usersOfLibrary.get(Id);
                                    if (userInfo) {
                                        if (checkoutBookInfo && checkoutBookInfo.noOfAvailableBook > 0) {
                                            var response = userInfo.borrowBook(checkoutBookInfo.bookDetails);
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
                    });
                }
                else {
                    input_1.r.question("Provide your name for registration in Library :- ", function (name) {
                        var user = new BookUser(name);
                        _this.usersOfLibrary.set(user.id, user);
                        console.log("Id for future refrence ".concat(user.id));
                        if (checkoutBookInfo) {
                            var response = user.borrowBook(checkoutBookInfo.bookDetails);
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
            });
        }
        else {
            console.log("".concat(titleOfBook, " Book is not present in Library .... first add book to library to issue the book."));
            displayMenu();
        }
    };
    Library.prototype.releasedBookfromUser = function (titleOfBook) {
        var _this = this;
        if (!this.books.has(titleOfBook)) {
            console.log("Invalid title provided for returning book. ");
            displayMenu();
        }
        var releasedBookInfo = this.books.get(titleOfBook);
        input_1.r.question("Please provide your Library Id :- ", function (idOfUser) {
            var Id = parseInt(idOfUser);
            if (_this.usersOfLibrary.has(Id)) {
                var userInfo = _this.usersOfLibrary.get(Id);
                if (userInfo && releasedBookInfo) {
                    var response = userInfo.releaseBook(releasedBookInfo.bookDetails);
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
                input_1.r.question("Provide valid Id for returning the book :- ", function (idOfUser) {
                    var Id = parseInt(idOfUser);
                    if (_this.usersOfLibrary.has(Id)) {
                        var userInfo = _this.usersOfLibrary.get(Id);
                        if (userInfo && releasedBookInfo) {
                            var response = userInfo.releaseBook(releasedBookInfo.bookDetails);
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
                });
            }
        });
    };
    Library.prototype.listAllBook = function () {
        if (this.books.size == 0) {
            console.log("No Books availble in Library.");
            displayMenu();
        }
        else {
            console.log("Availble Books in Library.");
            this.books.forEach(function (values, keys) {
                var bookInfor = values.bookDetails;
                if (values.noOfAvailableBook > 0) {
                    console.log("Title of Book is ".concat(bookInfor.title, " and author is ").concat(bookInfor.author, " and copies availble is ").concat(values.noOfAvailableBook));
                }
            });
            displayMenu();
        }
    };
    return Library;
}());
var library = new Library();
function displayMenu() {
    console.log();
    console.log("--------------------------------------------------------------------------");
    console.log("1. Book Issue");
    console.log("2. Show Books");
    console.log("3. Book release");
    console.log("4. Add Book to Library");
    console.log("5. Remove Book to Library");
    console.log("6. Cancel");
    input_1.r.question("Enter your choice :- ", function (options) {
        if (options == "1") {
            input_1.r.question("Provide Title of Book for checkout :- ", function (titleOfBook) {
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
            input_1.r.question("Provide Title for returning Book to Library:- ", function (titleOfBook) {
                if (titleOfBook) {
                    library.releasedBookfromUser(titleOfBook);
                }
                else {
                    console.log("Enter non empty title");
                }
            });
        }
        else if (options == "4") {
            input_1.r.question("Provide Title of Book for adding in Library :- ", function (titleOfBook) {
                input_1.r.question("Provide Author of Book for adding in Library :- ", function (authorOfBook) {
                    input_1.r.question("Provide the number of Book to add in Library value should be greater than 0 :- ", function (numberOfCopies) {
                        if (parseInt(numberOfCopies) <= 0) {
                            input_1.r.question("Enter copies value greater than 0 :- ", function (copies) {
                                if (parseInt(copies) <= 0) {
                                    console.log("Entered copies are incorrect for adding book in library .... process again.");
                                    displayMenu();
                                }
                                else {
                                    library.addBookInLibrary(titleOfBook, authorOfBook, parseInt(copies));
                                }
                            });
                        }
                        else {
                            library.addBookInLibrary(titleOfBook, authorOfBook, parseInt(numberOfCopies));
                        }
                    });
                });
            });
        }
        else if (options == "5") {
            input_1.r.question("Provide Title of Book for removing Book from Library :- ", function (titleOfBook) {
                input_1.r.question("Provide the number of Book to remove from Library value should be greater than 1 :- ", function (numberOfCopies) {
                    library.removeBookInLibrary(titleOfBook, parseInt(numberOfCopies));
                });
            });
        }
        else if (options == "6") {
            input_1.r.close();
        }
        else {
            console.log("Enter the correct choice");
            displayMenu();
        }
    });
}
displayMenu();
