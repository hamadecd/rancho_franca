// Defina as rotas CRUD
const express = require('express');
const app = express();
app.use(express.json());
const connection = require('./database.js');

// Rota para criar um novo usuário
app.post('/animais', (req, res) => {
  const { nome, sexo, origem, raca, data_nasc, situacao, ativo } = req.body;
  const INSERT_USER_QUERY = 'INSERT INTO animais (nome, sexo, origem, raca, data_nasc, situacao, ativo) VALUES (?, ?, ?, ?, ?, ?, ?)';
  connection.query(INSERT_USER_QUERY, [nome, sexo, origem, raca, data_nasc, situacao, ativo], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao cadastrar animal');
    } else {
      res.status(201).send('Animal criado com sucesso');
    }
  });
});

// Rota para buscar todos os usuários
app.get('/animais', (req, res) => {
  const SELECT_USERS_QUERY = 'SELECT * FROM animais';
  connection.query(SELECT_USERS_QUERY, (err, results) => {
    if (err) {
      res.status(500).send('Erro ao buscar animais');
    } else {
      res.status(200).json(results);
    }
  });
});

// Rota para atualizar um usuário
app.put('/animais/:id', (req, res) => {
  const { nome, sexo, origem, raca, data_nasc, situacao, ativo } = req.body;
  const { id } = req.params;
  const UPDATE_USER_QUERY = 'UPDATE animais SET nome = ?, sexo = ?, origem = ?, raca = ?, data_nasc = ?, situacao = ?, ativo = ? WHERE id = ?';
  connection.query(UPDATE_USER_QUERY, [nome, sexo, origem, raca, data_nasc, situacao, ativo, id], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao atualizar animal');
    } else {
      res.status(200).send('Animal atualizado com sucesso');
    }
  });
});

// Rota para deletar um usuário
app.delete('/animais/:id', (req, res) => {
  const { id } = req.params;
  const DELETE_USER_QUERY = 'DELETE FROM animais WHERE id = ?';
  connection.query(DELETE_USER_QUERY, [id], (err, result) => {
    if (err) {
      res.status(500).send('Erro deletar ao animal usuário');
    } else {
      res.status(200).send('Animal deletado com sucesso');
    }
  });
});

// Inicie o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor em execução na porta 3000');
});
