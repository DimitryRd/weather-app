var getUser = (id, callback)=>{
    var user = {
        id: id,
        name: 'Victor'
    };
    setTimeout(() =>{
        callback(user)
    }, 3000);
};
getUser(1, (userObject)=>{
    console.log(userObject);
});