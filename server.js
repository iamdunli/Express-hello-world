const express = require('express');

const port = 1000;
const app = express();

const middleware1 = (req, res, next)=>{
    console.log(`${req.method} : ${req.url}`);
    next();
}
app.use(middleware1);
app.use( (req, res, next)=>{
    if (req.query.key == '123456'){
        next();
    }    
    else{
        res.status(401).send({msg : 'not authorized'})
    }
})

app.get('/accounts', (req, res, next)=>{
    console.log('accounts inline middleware');
    next(new Error('oopps accounts page unable to use'))
}, (req, res)=>{    
    res.send({msg: 'accounts'});
})
app.get('/transactions', (req, res)=>{    
    res.send({msg: 'transactions'});
})
app.get('/', (req, res)=>{
    res.send('hello world!!');
})
// middleware , handler error msg
app.use( (error, req, res, next)=>{
    res.status(500).send(`msg: ${error}`)
})

console.log(`listening port ${port} ...`);
app.listen(port);