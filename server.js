const express = require('express');

const port = 1000;
const app = express();

app.get('/', (req, res)=>{
    res.send('hello world!!');
})

console.log(`listening port ${port} ...`);
app.listen(port);