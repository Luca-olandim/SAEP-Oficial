module.exports = (pool) => {
    const router = require("express").Router();
  
    // Listar todos os usuários
    router.get("/", async (req, res) => {
      try {
        const result = await pool.query("SELECT * FROM usuarios");
        res.status(200).json(result.rows);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
  
    // Cadastrar um usuário
    router.post("/", async (req, res) => {
      const { nome, email } = req.body;
      try {
        const result = await pool.query(
          "INSERT INTO usuarios (nome, email) VALUES ($1, $2) RETURNING *",
          [nome, email]
        );
        res.status(201).json(result.rows[0]);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    });
  
    return router;
  };
  