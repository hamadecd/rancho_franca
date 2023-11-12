# Gerenciamento de Animais - Sistema CRUD

Este é um sistema simples de gerenciamento de animais que permite criar, listar, atualizar e excluir animais no banco de dados. O sistema usa Node.js como servidor back-end e MySQL para armazenar os dados dos animais.

## Configuração

Antes de executar o aplicativo, certifique-se de ter Node.js e MySQL instalados no seu sistema. Você também deve criar um banco de dados MySQL chamado `rancho`. O script para criar as tabelas:

[tables](sql/tables.sql)

E configurar o arquivo `database.js` com suas credenciais de banco de dados.

```javascript
// database.js

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'seu_usuario_mysql',
  password: 'sua_senha_mysql',
  database: 'rancho',
});

connection.connect((err) => {
  if (err) {
    console.error('Erro na conexão com o banco de dados: ' + err.stack);
    return;
  }
  console.log('Conexão bem-sucedida ao banco de dados');
});

module.exports = connection;
```
## Instalação
Clone o repositório para o seu sistema:
```
git clone https://github.com/seu-usuario/seu-repositorio.git
```
Navegue até o diretório do projeto:
```
cd seu-repositorio
```
Instale as dependências usando o npm:
```
npm install
```
## Uso
Inicie o servidor:
```
node rancho.js
```
1. O servidor estará em execução na porta 3000.
2. Você pode acessar a API CRUD por meio das seguintes rotas:

* POST /animais: Crie um novo animal.
* GET /animais: Liste todos os animais.
* PUT /animais/:id: Atualize um animal existente.
* DELETE /animais/:id: Exclua um animal.

Certifique-se de usar um cliente HTTP (como Postman) para interagir com a API.
