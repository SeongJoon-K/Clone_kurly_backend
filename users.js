// 사용자(users) 생성 POST API
app.post('/users', async (req, res) => {
    const { login_id, password, name, email, phone } = req.body
    
    await myDataSource.query(
        `INSERT INTO users(
          login_id,
          password,
          name,
          email,
          phone
        ) VALUES (?, ?, ?, ?);
        `,
        [ login_id, password, name, email, phone ]
    ); 
     res.status(201).json({ message : "successfully created" });
    })

// 사용자(users) 조회 GET API
app.get('/users', async(req, res) => {
    await myDataSource.query(
    `SELECT 
            users.login_id,
            users.password,
            users.name,
            users.email,
            users.phone
        FROM users`
        ,(err, rows) => {
      res.status(200).json(rows);
    });
});

// 사용자(users) 수정 PUT API

app.put('/users', async(req, res) => {
    const { login_id, password, name, email, phone } = req.body
    
    await myDataSource.query(
        `UPDATE users 
      SET 
        login_id = ?,
        password = ?,
        name = ?,
        email = ?,
        phone = ?
        `,
        [ login_id, password, name, email, phone ]
    ); 
      res.status(201).json({ message : "successfully updated" });
    });
  

// 사용자(users) 삭제 DELETE API
app.delete('/users/:usersId', async(req, res) => {
    const { usersId } = req.params;

    await myDataSource.query(
        `DELETE FROM users
        WHERE users.id = ${usersId}
        `); 
     res.status(204).json({ message : "successfully deleted" });
    });

//
