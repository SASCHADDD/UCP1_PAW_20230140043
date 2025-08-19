require("dotenv").config(); 
const express = require("express");
const app = express();
const db = require("./database/db.js"); 
const port = process.env.PORT || 3000; 

app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); 

app.get('/', (req, res) => {
  db.query('SELECT * FROM Buku', (err, results) => {
    if (err) throw err;
    res.render('index', { books: results }); 
  });
});

app.post("/ucp1", (req, res) => {
  const { nama } = req.body;
  db.query("INSERT INTO Buku (nama) VALUES (?)", [nama], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send("Buku ditambahkan");
  });
});

app.use((req, res) => {
  res.status(404).render("404"); 
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
