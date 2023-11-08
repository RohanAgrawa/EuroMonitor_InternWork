import axios from 'axios';
import { profile } from 'console';
import { text } from 'stream/consumers';

async function fetchUsers() {
    
    try {
        const response = await axios.get('https://reqres.in/api/users');
        
       
       const users = response.data;
        
        return users.data;
    }
    catch (error) {
       console.error('Error fetching users:', error);
    }
 }


    const app = document.getElementById("root");

    let usersDetail = fetchUsers();

    usersDetail.then((data) => {
        
        data.forEach((element: any) => {
            const div = document.createElement("div");
            div.innerHTML = `<img src='${element.avatar}' />`;
            app?.appendChild(div);
            console.log(element)
       });
    });



// async function fetchUsers() {
//    try {
//        const response = await axios.get('https://reqres.in/api/users');
       
//       const users = response.data;
//       console.log('List of users:');
//       console.log(users);
//    } catch (error) {
//       console.error('Error fetching users:', error);
//    }
// }


// class usersDetail{

//     async fetchUsers() {

//         const profilesContainer = document.querySelector('.profiles')!;
//         const loadingIndicator = document.createElement('div');
//         loadingIndicator.textContent = 'Loading...';
//         profilesContainer.appendChild(loadingIndicator);
//         try {
//             const response = await axios.get('https://reqres.in/api/users');
            
           
//            const users = response.data;
//             if (users) {
//                 loadingIndicator.remove();
//                 users.data.forEach((profile: any, index : number) => {

//                     const profileElement = document.createElement('div');
//                     profileElement.classList.add('profile');
//                     profileElement.setAttribute('id',String(index))
//                     profileElement.innerHTML = `
//                                         <img src='${profile.avatar}' />
//                                         <p>${profile.first_name} ${profile.last_name}</p>
//                                             <p>Email: ${profile.email}</p>
//                                                              `;
//                     profilesContainer.appendChild(profileElement);
//                 });
//            }
            
//         } catch (error) {
//            console.error('Error fetching users:', error);
//         }
//      }
     
    
// }
// let u = new usersDetail();


