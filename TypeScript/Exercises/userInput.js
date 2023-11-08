"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var process = require("process");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var more = 1;
read();
function read() {
    rl.question("Do you want more ", function (answer) {
        if (answer == "no") {
            more = 0;
            console.log("bye");
            rl.close();
        }
        else {
            more++;
            console.log("next round.." + more);
            read();
        }
    });
}
