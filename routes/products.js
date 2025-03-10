const express = require("express");
const router = express.Router();
const dbSingleton = require("../config/dbSingleton");

const db = dbSingleton.getConnection();

// קבלת כל המוצרים
router.get("/", (req, res) => {
  const query = "SELECT * FROM products";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

// הוספת מוצר חדש
router.post("/", (req, res) => {
  const { name, price } = req.body;
  const query = "INSERT INTO products (name, price) VALUES (?, ?)";
  db.query(query, [name, price], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: "Product added!", id: results.insertId });
  });
});

// עדכון מוצר
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const query = "UPDATE products SET name = ?, price = ? WHERE id = ?";
  db.query(query, [name, price, id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: "Product updated!" });
  });
});

// מחיקת מוצר
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM products WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: "Product deleted!" });
  });
});

module.exports = router;
