import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CadastroUsuario from './components/UserRegistration.jsx';
import ListaTarefas from './components/TaskList.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Página de Cadastro de Usuário (Primeira Página que o Usuário Acessa) */}
        <Route path="/" element={<CadastroUsuario />} />

        {/* Página de Lista de Tarefas */}
        <Route path="/tarefas" element={<ListaTarefas />} />
      </Routes>
    </Router>
  );
}

export default App;

