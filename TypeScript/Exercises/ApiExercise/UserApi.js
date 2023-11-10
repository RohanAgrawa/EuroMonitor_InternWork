"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fetchUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://reqres.in/api/users');
            const users = yield response.json();
            return users.data;
        }
        catch (error) {
            console.error('Error fetching users:', error);
        }
    });
}
const apps = document.getElementById("root");
let usersDetails = fetchUsers();
usersDetails.then((data) => {
    data.forEach((element) => {
        const div = document.createElement("div");
        div.innerHTML = `<img src='${element.avatar}' onClick = "getUserById(${element.id})"/>
            <h4 style = "text-align:center;">${element.first_name}</h4>
            <p>${element.email}</p>`;
        apps === null || apps === void 0 ? void 0 : apps.appendChild(div);
    });
});
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://reqres.in/api/users/${id}`);
            const root = document.getElementById("root");
            root.textContent = '';
            const users = yield response.json();
            const div = document.createElement("div");
            div.innerHTML = `<img src='${users.data.avatar}'/>
       <h4 style = "text-align:center;">${users.data.first_name}</h4>
       <p>${users.data.email}</p>`;
            root === null || root === void 0 ? void 0 : root.appendChild(div);
        }
        catch (error) {
            console.error('Error fetching users:', error);
        }
    });
}
