# SAEP-Oficial

# Regras de Negócio

Cadastro de Usuários:
Todo usuário deve ser cadastrado com um nome e email válido.
O email deve ser único no sistema.

Cadastro de Tarefas:
Uma tarefa só pode ser cadastrada se vinculada a um usuário existente.
A tarefa deve ter:
Descrição obrigatória.
Prioridade definida como "baixa", "média" ou "alta".
Status inicial como "a fazer".
A data de cadastro da tarefa será preenchida automaticamente pelo sistema.

Gerenciamento de Tarefas:
Um usuário pode alterar o status de suas tarefas entre:
"a fazer", "fazendo" e "pronto".
Um usuário pode alterar a prioridade de suas tarefas a qualquer momento.
Um usuário pode excluir apenas suas próprias tarefas.

Visualização de Tarefas:
As tarefas devem ser exibidas em um formato Kanban (colunas divididas por status: "a fazer", "fazendo", "pronto").
Apenas as tarefas do usuário autenticado devem ser visíveis.

Validações Gerais:
Todos os campos obrigatórios devem ser preenchidos antes de salvar qualquer registro.
Não será permitido cadastrar usuários com o mesmo email.
O sistema deve impedir a alteração de uma tarefa por outro usuário que não seja o proprietário.

# Requisitos Funcionais
Cadastro de Usuários:
Validação de Email:
Cadastro de Tarefas:
Alteração de Tarefa:
Visualização de Tarefas:
O sistema deve exibir as tarefas em um formato Kanban (colunas divididas por status: a fazer, fazendo, pronto).

# Requisitos Não Funcionais
Integridade de Dados:
O sistema deve garantir que todos os campos obrigatórios sejam preenchidos ao cadastrar ou editar dados.
Validação de Campos:
O sistema deve validar os dados inseridos, impedindo o registro de informações inválidas (ex.: email duplicado ou vazio).

# Códigos SQL:
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE tarefas (
    id SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES usuarios(id),
    descricao TEXT NOT NULL,
    nome_setor VARCHAR(30) NOT NULL,
    prioridade VARCHAR(10) NOT NULL CHECK (prioridade IN ('baixa', 'media', 'alta')),
    status VARCHAR(10) NOT NULL DEFAULT 'a fazer' CHECK (status IN ('a fazer', 'fazendo', 'pronto')),
    data_cadastro DATE SET DEFAULT CURRENT_DATE;
);

INSERT INTO usuarios (nome, email)
VALUES ('João Silva', 'joao.silva@example.com');

INSERT INTO usuarios (nome, email)
VALUES ('Maria Oliveira', 'maria.oliveira@example.com');

INSERT INTO usuarios (nome, email)
VALUES ('Carlos Pereira', 'carlos.pereira@example.com');

INSERT INTO tarefas (id_usuario, descricao, nome_setor, prioridade, status)
VALUES (3, 'Finalizar documentação do projeto', 'Documentação', 'baixa', 'a fazer');

INSERT INTO tarefas (id_usuario, descricao, nome_setor, prioridade, status)
VALUES (1, 'Criar endpoints para API de cadastro', 'Desenvolvimento', 'alta', 'fazendo');

INSERT INTO tarefas (id_usuario, descricao, nome_setor, prioridade, status)
VALUES (2, 'Testar a integração com a API externa', 'Teste', 'media', 'pronto');

# Prompt importantes:
npm install express cors pg dotenv body-parser
npm i nodemon --save-dev
"start": "nodemon app.js"
npm install react-router-dom

