const fs = require('fs');
const { getDb } = require('../utility/dbConnect');
const dbConnect = require('../utility/dbConnect');

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

/*   try {
    const db = getDb();
    const tool = req.body;

    const result = await db.collection('tools').insertOne(tool)
    console.log(result);
    res.send('successful')
  } catch (error) {
    
  } */


/*   const users = await allUserParced;
    const bodyContent = await req.body;
    users.push(bodyContent)
    fs.writeFile('user.json', JSON.stringify(users), (err, newUserAdded)=>{
      if(err){
        console.log(err);
      }
      else{
        console.log(newUserAdded);
      }
    }) */
    res.send('user added')
}
module.exports.updateUser = async (req, res, next)=>{
  const users = await allUserParced;
  console.log(users);
    const params = await req.params;
    console.log(params);
    const singleUser = await users.find( user => user.id == Number(params.id))
    console.log(singleUser);
    singleUser.id = await req.body.id;
    singleUser.name = await req.body.name;
    singleUser.gender = await req.body.gender;
    singleUser.contact = await req.body.contact;
    singleUser.address = await req.body.address;
    singleUser.photoUrl = await req.body.photoUrl;
    fs.writeFile('user.json', JSON.stringify(allUserParced), (err, newUserAdded)=>{
      if(err){
        console.log(err);
      }
      else{
        console.log(newUserAdded);
      }
    })
    res.send('user has been updated')
}

