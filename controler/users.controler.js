const fs = require('fs');

let allUserParced = [];


fs.readFile('user.json', (err, user) => {
    if (err) {
      console.log("Error reading file from disk:", err);
      return;
    }
    try {
      const allUser = JSON.parse(user);
      console.log("User address is:");
      allUserParced = allUser;
    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  });
  



module.exports.getRandomUser = async (req, res, next)=> {

   const users = await allUserParced;
   const randomIndex = Math.floor(Math.random() * users.length);
   const singleRandomUser = users[randomIndex];

   res.send(singleRandomUser);
}

module.exports.getAllUser = async (req, res, next)=>{
    
    const users = await allUserParced;
    const query = req.query.limit
    const limitUser = await users.slice(0,query)
    res.send(limitUser)
}

module.exports.saveUser = async (req, res, next)=>{
  const users = await allUserParced;
    const bodyContent = await req.body;
    users.push(bodyContent)
    fs.writeFile('user.json', JSON.stringify(users), (err, newUserAdded)=>{
      if(err){
        console.log(err);
      }
      else{
        console.log(newUserAdded);
      }
    })
    res.send('user added')
}

