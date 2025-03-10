const express = require("express");
const router = express.Router();
const dbSingleton = require("../config/dbSingleton");

const db = dbSingleton.getConnection();

// קבלת כל המאמרים
router.get("/", (req, res) => {
  const query = "SELECT * FROM articles";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

// קבלת מאמר בודד לפי ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM articles WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(results[0]);
  });
});

// הוספת מאמר חדש
router.post("/", (req, res) => {
  const { title, content, author } = req.body;
  const query =
    "INSERT INTO articles (title, content, author) VALUES (?, ?, ?)";
  db.query(query, [title, content, author], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: "Article added!", id: results.insertId });
  });
});

// עדכון מאמר קיים
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;
  const query =
    "UPDATE articles SET title = ?, content = ?, author = ? WHERE id = ?";
  db.query(query, [title, content, author, id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: "Article updated!" });
  });
});

// מחיקת מאמר
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM articles WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: "Article deleted!" });
  });
});

module.exports = router;
