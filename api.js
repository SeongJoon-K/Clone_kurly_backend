// const express = require('express');
// const app = express();

// const server = app.listen(3001, () => {
//     console.log('START sever : localhost:3001')
// });



app.get('/api/users/:type', async (req, res) => {
    let {
        type
    } = req.params;

    console.log(type);
    res.send('ok');
})


app.post('/products', async (req, res) => {
	const { category_id ,title, thumbnail, description, price } = req.body
    
	await myDataSource.query(
		`INSERT INTO products(
		    category_id,
		    title,
		    thumbnail,
            description,
            price
		) VALUES (?, ?, ?, ?, ?);
		`,
		[ category_id ,title, thumbnail, description, price]
	); 
     res.status(201).json({ message : "successfully created" });
	})

// sample.