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
