const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const userRoute = require('./routes/v1/users.route');
const { connectToServer } = require('./utility/dbConnect');



app.use(cors());
app.use(express.json());

connectToServer((err)=> {
    if(!err){
        app.listen(port, ()=>{
            console.log('The server is running');
        }) 
    }
    else {
        console.log(err);
    }
})


app.use('/user', userRoute)

app.all('*', (req, res)=>{
    res.send('Route is not defined')
})






