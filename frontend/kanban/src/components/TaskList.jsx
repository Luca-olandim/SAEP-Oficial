import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

// Função para gerenciar a lista de tarefas
const TaskList = () => {
  const [tarefas, setTarefas] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [nomeSetor, setNomeSetor] = useState("");
  const [prioridade, setPrioridade] = useState("baixa");
  const [status, setStatus] = useState("a fazer");
  const [dataCadastro, setDataCadastro] = useState("");

  // Função para carregar as tarefas
  useEffect(() => {
    axios
      .get("http://localhost:3000/tarefas")
      .then((response) => {
        setTarefas(response.data);
      })
      .catch((error) => console.error("Erro ao carregar tarefas:", error));
  }, []);

  // Função para criar tarefa
  const handleAddTask = (e) => {
    e.preventDefault();

    // Verificar se todos os campos obrigatórios estão preenchidos
    if (!descricao || !nomeSetor || !dataCadastro) {
      alert("Por favor, preencha todos os campos antes de adicionar uma tarefa.");
      return;
    }

    const novaTarefa = {
      descricao,
      nome_setor: nomeSetor,
      prioridade,
      status,
      data_cadastro: dataCadastro || new Date().toISOString().split("T")[0], // Usa a data atual se não for preenchida
    };

    axios
      .post("http://localhost:3000/tarefas", novaTarefa)
      .then((response) => {
        setTarefas([...tarefas, response.data]);
        setDescricao("");
        setNomeSetor("");
        setPrioridade("baixa");
        setStatus("a fazer");
        setDataCadastro("");
      })
      .catch((error) => console.error("Erro ao adicionar tarefa:", error));
  };

  // Função para alterar o status de uma tarefa (move a tarefa para outra coluna)
  const handleUpdateStatus = (id, novoStatus) => {
    axios
      .put(`http://localhost:3000/tarefas/${id}`, { status: novoStatus })
      .then(() => {
        const updatedTarefas = tarefas.map((tarefa) =>
          tarefa.id === id ? { ...tarefa, status: novoStatus } : tarefa
        );
        setTarefas(updatedTarefas);
      })
      .catch((error) => console.error("Erro ao atualizar status:", error));
  };

  // Função para alterar a prioridade da tarefa
  const handleUpdatePrioridade = (id, novaPrioridade) => {
    axios
      .put(`http://localhost:3000/tarefas/${id}`, { prioridade: novaPrioridade })
      .then(() => {
        const updatedTarefas = tarefas.map((tarefa) =>
          tarefa.id === id ? { ...tarefa, prioridade: novaPrioridade } : tarefa
        );
        setTarefas(updatedTarefas);
      })
      .catch((error) => console.error("Erro ao atualizar prioridade:", error));
  };

  // Função para formatar a data sem o horário
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Exibe a data no formato local (sem o horário)
  };

  return (
    <div>
      <h1>Gerenciamento de Tarefas</h1>

      {/* Formulário de criação de nova tarefa */}
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Descrição da Tarefa"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nome do Setor"
          value={nomeSetor}
          onChange={(e) => setNomeSetor(e.target.value)}
          required
        />
        <select
          value={prioridade}
          onChange={(e) => setPrioridade(e.target.value)}
          required
        >
          <option value="baixa">Baixa</option>
          <option value="media">Média</option>
          <option value="alta">Alta</option>
        </select>
        <input
          type="date"
          value={dataCadastro}
          onChange={(e) => setDataCadastro(e.target.value)}
          required
        />
        <button type="submit">Adicionar Tarefa</button>
      </form>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Tarefas a Fazer */}
        <div className="afazer" style={{ width: "30%" }}>
          <h2>Tarefas a Fazer</h2>
          {tarefas
            .filter((tarefa) => tarefa.status === "a fazer")
            .map((tarefa) => (
              <div
                key={tarefa.id}
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  marginBottom: "10px",
                }}
              >
                <p>{tarefa.descricao}</p>
                <p>{tarefa.nome_setor}</p>
                <p>
                  Prioridade:
                  <select
                    value={tarefa.prioridade}
                    onChange={(e) =>
                      handleUpdatePrioridade(tarefa.id, e.target.value)
                    }
                  >
                    <option value="baixa">Baixa</option>
                    <option value="media">Média</option>
                    <option value="alta">Alta</option>
                  </select>
                </p>
                <p>Data Cadastro: {formatDate(tarefa.data_cadastro)}</p>
                <button
                  onClick={() => handleUpdateStatus(tarefa.id, "fazendo")}
                >
                  Fazendo
                </button>
                <button onClick={() => handleUpdateStatus(tarefa.id, "pronto")}>
                  Pronto
                </button>
              </div>
            ))}
        </div>

        {/* Tarefas Fazendo */}
        <div className="fazendo" style={{ width: "30%" }}>
          <h2>Tarefas Sendo Feitas</h2>
          {tarefas
            .filter((tarefa) => tarefa.status === "fazendo")
            .map((tarefa) => (
              <div
                key={tarefa.id}
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  marginBottom: "10px",
                }}
              >
                <p>{tarefa.descricao}</p>
                <p>{tarefa.nome_setor}</p>
                <p>
                  Prioridade:
                  <select
                    value={tarefa.prioridade}
                    onChange={(e) =>
                      handleUpdatePrioridade(tarefa.id, e.target.value)
                    }
                  >
                    <option value="baixa">Baixa</option>
                    <option value="media">Média</option>
                    <option value="alta">Alta</option>
                  </select>
                </p>
                <p>Data Cadastro: {formatDate(tarefa.data_cadastro)}</p>
                <button onClick={() => handleUpdateStatus(tarefa.id, "a fazer")}>
                  A Fazer
                </button>
                <button
                  onClick={() => handleUpdateStatus(tarefa.id, "pronto")}
                >
                  Pronto
                </button>
              </div>
            ))}
        </div>

        {/* Tarefas Prontas */}
        <div className="prontas" style={{ width: "30%" }}>
          <h2>Tarefas Prontas</h2>
          {tarefas
            .filter((tarefa) => tarefa.status === "pronto")
            .map((tarefa) => (
              <div
                key={tarefa.id}
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  marginBottom: "10px",
                }}
              >
                <p>{tarefa.descricao}</p>
                <p>{tarefa.nome_setor}</p>
                <p>
                  Prioridade:
                  <select
                    value={tarefa.prioridade}
                    onChange={(e) =>
                      handleUpdatePrioridade(tarefa.id, e.target.value)
                    }
                  >
                    <option value="baixa">Baixa</option>
                    <option value="media">Média</option>
                    <option value="alta">Alta</option>
                  </select>
                </p>
                <p>Data Cadastro: {formatDate(tarefa.data_cadastro)}</p>
                <button
                  onClick={() => handleUpdateStatus(tarefa.id, "a fazer")}
                >
                  A Fazer
                </button>
                <button
                  onClick={() => handleUpdateStatus(tarefa.id, "fazendo")}
                >
                  Fazendo
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
