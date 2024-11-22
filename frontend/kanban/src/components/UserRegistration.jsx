import React, { useState } from "react";
import '../App.css';

const UserRegistration = () => {
  const [formData, setFormData] = useState({ nome: "", email: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Erro ao cadastrar usuário");
      alert("Usuário cadastrado com sucesso!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="cadastro-container">
      <form onSubmit={handleSubmit}>
        <h3>Cadastro de Usuário</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default UserRegistration;
