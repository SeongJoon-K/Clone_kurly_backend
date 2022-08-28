const express = require('express');
const app = express();

const server = app.listen(3001, () => {
    console.log('START sever : localhost:3001')
});

app.get('/api/users/:type', async (req, res) => {
    let {
        type
    } = req.params;

    console.log(type);
    res.send('ok');
})