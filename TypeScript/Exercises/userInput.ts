import * as readline from 'readline';
import * as process from 'process';
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let more = 1;
read();

function read() {
    rl.question("Do you want more ", function (answer) {
        if (answer == "no") {
            more = 0;
            console.log("bye");
            rl.close();
        } else {
            more++;
            console.log("next round.." + more);
            read();
        }
    });
}