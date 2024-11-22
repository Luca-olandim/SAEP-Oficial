module.exports = (pool) => {
    const router = require("express").Router();

    // Listar todas as tarefas
    router.get("/", async (req, res) => {
        try {
            const result = await pool.query("SELECT * FROM tarefas");
            res.status(200).json(result.rows);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Cadastrar uma nova tarefa
    router.post("/", async (req, res) => {
        const { id_usuario, descricao, nome_setor, prioridade } = req.body;
        try {
            const result = await pool.query(
                `INSERT INTO tarefas (id_usuario, descricao, nome_setor, prioridade, status) 
                VALUES ($1, $2, $3, $4, 'a fazer') RETURNING *`,
                [id_usuario, descricao, nome_setor, prioridade]
            );
            res.status(201).json(result.rows[0]);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    // Atualizar o status e prioridade da tarefa
    router.put("/:id", async (req, res) => {
        const { id } = req.params;
        const { prioridade, status } = req.body;
        try {
            const result = await pool.query(
                `UPDATE tarefas
                SET prioridade = COALESCE($1, prioridade),
                    status = COALESCE($2, status)
                WHERE id = $3
                RETURNING *`,
                [prioridade, status, id]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({ error: "Tarefa não encontrada" });
            }

            res.status(200).json(result.rows[0]);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    return router;
};
