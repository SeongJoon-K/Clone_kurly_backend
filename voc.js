// Health Check Code

app.get("/ping", (req, res) => {
    res.json({ message: "pong" });
  });
  
  
  // 고객문의(vocs) 생성 POST API
  app.post('/vocs', async (req, res) => {
      const { user_id , } = req.body
      
      await myDataSource.query(
          `INSERT INTO vocs(
            user_id,
            product_id,
            title,
            content,
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
      const { user_id ,title, thumbnail, description, price } = req.body
      
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
  