
// 상품(products) 생성 POST API
app.post('/products', async (req, res) => {
	const { category_id ,title, thumbnail, description, price } = req.body
    
	await myDataSource.query(
		`INSERT INTO products(
		    category_id,
		    title,
		    thumbnail,
        description,
        price,
        discount
		) VALUES (?, ?, ?, ?, ?);
		`,
		[ category_id ,title, thumbnail, description, price ]
	); 
     res.status(201).json({ message : "successfully created" });
	})

// 상품(products) 조회 GET API
app.get('/products', async(req, res) => {
    await myDataSource.query(
	`SELECT 
            products.category_id,
            products.title,
            products.thumbnail,
            products.description,
            products.price
		FROM products`
		,(err, rows) => {
      res.status(200).json(rows);
	});
});

// 상품(products) 수정 PUT API

app.put('/products', async(req, res) => {
	const { category_id ,title, thumbnail, description, price } = req.body
    
	await myDataSource.query(
		`UPDATE products 
      SET 
        category_id = ?,
		    title = ?,
		    thumbnail = ?,
        description = ?,
        price = ?
		`,
		[ category_id ,title, thumbnail, description, price ]
	); 
      res.status(201).json({ message : "successfully updated" });
	});
  

// 상품(products) 삭제 DELETE API
app.delete('/products/:productId', async(req, res) => {
	const { productId } = req.params;

    await myDataSource.query(
		`DELETE FROM products
		WHERE products.id = ${productId}
		`); 
     res.status(204).json({ message : "successfully deleted" });
	});



// 고객문의(vocs) 생성 POST API
app.post('/vocs', async (req, res) => {
    const { user_id , product_id ,title, content } = req.body
    
    await myDataSource.query(
        `INSERT INTO vocs(
          user_id,
          product_id,
          title,
          content
        ) VALUES (?, ?, ?, ?);
        `,
        [ user_id , product_id ,title, content ]
    ); 
     res.status(201).json({ message : "successfully created" });
    })

// 고객문의(vocs) 조회 GET API
app.get('/vocs', async(req, res) => {
    await myDataSource.query(
    `SELECT 
            vocs.user_id,
            vocs.product_id,
            vocs.title,
            vocs.content
        FROM vocs`
        ,(err, rows) => {
      res.status(200).json(rows);
    });
});

// 고객문의(vocs) 수정 PUT API

app.put('/vocs', async(req, res) => {
    const { user_id , product_id ,title, content } = req.body
    
    await myDataSource.query(
        `UPDATE vocs 
      SET 
        user_id = ?,
        product_id = ?,
        title = ?,
        content = ?
        `,
        [ user_id ,product_id ,title, content ]
    ); 
      res.status(201).json({ message : "successfully updated" });
    });
  

// 고객문의(vocs) 삭제 DELETE API
app.delete('/vocs/:vocsId', async(req, res) => {
    const { vocsId } = req.params;

    await myDataSource.query(
        `DELETE FROM vocs
        WHERE vocs.id = ${vocsId}
        `); 
     res.status(204).json({ message : "successfully deleted" });
    });
// 상품 카테고리(category) 생성 POST API
app.post('/categories', async (req, res) => {
  const { parent_id, category_name } = req.body
  
  await myDataSource.query(
      `INSERT INTO categories(
        parent_id,
        category_name
      ) VALUES (?, ?);
      `,
      [ parent_id, category_name ]
  ); 
   res.status(201).json({ message : "successfully created" });
  })

// 상품 카테고리(category) 조회 GET API
app.get('/categories', async(req, res) => {
  await myDataSource.query(
  `SELECT 
          categories.parent_id,
          categories.category_name
      FROM categories`
      ,(err, rows) => {
    res.status(200).json(rows);
  });
});

// 상품 카테고리(category) 수정 PUT API
app.put('/categories', async(req, res) => {
  const { parent_id, category_name } = req.body
  
  await myDataSource.query(
      `UPDATE categories 
    SET 
      parent_id= ?,
      category_name = ?
      `,
      [ parent_id, category_name ]
  ); 
    res.status(201).json({ message : "successfully updated" });
  });


// 상품 카테고리(category) 삭제 DELETE API
app.delete('/categories/:categoryId', async(req, res) => {
  const { categoryId } = req.params;

  await myDataSource.query(
      `DELETE FROM categories
      WHERE categories.id = ${categoryId}
      `); 
   res.status(204).json({ message : "successfully deleted" });
  });

//

