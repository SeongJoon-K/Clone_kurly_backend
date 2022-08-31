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
        `UPDATE vocs 
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
