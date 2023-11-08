import { read } from "fs";
import { exit } from "process";
import * as readline from "readline";

export const r = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
