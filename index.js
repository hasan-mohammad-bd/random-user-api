const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const userRoute = require('./routes/v1/users.route');



app.use(cors());
app.use(express.json());

app.use('/user', userRoute)

app.all('*', (req, res)=>{
    res.send('Route is not defined')
})



app.listen(port, ()=>{
    console.log('The server is running');
})


