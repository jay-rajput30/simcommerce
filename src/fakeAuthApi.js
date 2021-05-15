const users = [
  { username: "userone", password: 123 },
  { username: "usertwo", password: 456 },
];


const findUserByUsername = (username) =>{
    return users.find((user) => user.username === username);
}

const fakeAuthApi = (username, password) =>{
   return new Promise((resolve, reject) =>{
       setTimeout(()=>{
        const user = findUserByUsername(username);
        if(user.password === password){
            resolve({success: true, status:200});
        }
        reject({success: false, status: 401});
       }
        , 3000)
   })
}


export default fakeAuthApi;