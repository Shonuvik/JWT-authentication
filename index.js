const express = require('express');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const auth = require('./src/middleware/auth');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.post('/api/login', (req, res)=> {
    const {username, password} = req.body;
    //validação de usuario
    let id = uuid.v4();
    const payload = {
        user: {
            userId: id,
            name: username
        }
    }

    jwt.sign(payload, "security",{expiresIn: 40000}, (err, token) => {
        if(err)throw err;
        res.json({token});
    })       
});

app.get('/api/private', auth,(req, res)=> {
    const {userId, name} = req.user;
    let user = {
        userId,
        name,

    }
    res.json(user);
});

app.listen(9090, () => {
    console.log('Server is Running in Port 9090');
});