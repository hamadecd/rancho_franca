const express = require('express');
const app = express();
app.use(express.json());
const connection = require('./database.js');

// Rota para criar um novo animal
app.post('/animais', (req, res) => {
  const ativo = 1;

  const dadosAnimal = {
    nome: req.body.nome,
    sexo: req.body.sexo,
    origem: req.body.origem,
    raca: req.body.raca,
    data_nascimento: req.body.data_nascimento,
    situacao: req.body.situacao,
    ativo,
  };

  const INSERT_ANIMAL_QUERY = 'INSERT INTO tb_animais SET ?';
  connection.query(INSERT_ANIMAL_QUERY, dadosAnimal, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erro ao cadastrar animal. Detalhes do erro: ' + err.message);
    } else {
      dadosAnimal.id = result.insertId;

      /*
      O cabeçalho Location em uma resposta HTTP é utilizado para indicar a URI (Uniform Resource Identifier) do recurso recém-criado. 
      Essa prática tem vantagens significativas, especialmente em ambientes RESTful e em APIs onde a criação de recursos é uma parte essencial do fluxo de trabalho.
      */
      res.status(201)
      .location(`/animais/${result.insertId}`)
      .json({
        message: 'Animal criado com sucesso!',
        animal: dadosAnimal,
      });
    }
  });
});

// Rota para buscar todos os animais
app.get('/animais', (req, res) => {
  const SELECT_ANIMAL_QUERY = 'SELECT * FROM tb_animais WHERE tb_animais.ativo = 1';
  connection.query(SELECT_ANIMAL_QUERY, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erro ao buscar animais.');
    } else {
      res.status(200).json(results);
    }
  });
});

// Rota para atualizar um animal
app.put('/animais/:id_animal', (req, res) => {
  const { nome, sexo, origem, raca, data_nascimento, situacao } = req.body;
  const { id_animal } = req.params;
  const UPDATE_ANIMAL_QUERY = 'UPDATE tb_animais SET nome = ?, sexo = ?, origem = ?, raca = ?, data_nascimento = ?, situacao = ? WHERE id_animal = ?';
  connection.query(UPDATE_ANIMAL_QUERY, [nome, sexo, origem, raca, data_nascimento, situacao, id_animal], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erro ao atualizar animal.');
    } else {
      res.status(200).send('Animal atualizado com sucesso!');
    }
  });
});

// Rota para deletar um animal
app.delete('/animais/:id_animal', (req, res) => {
  const { id_animal } = req.params;
  if (!id_animal || isNaN(id_animal)) {
    res.status(400).send('ID do animal inválido');
    return;
  }
  const DELETE_ANIMAL_QUERY = 'UPDATE tb_animais SET ativo = 0 WHERE id_animal = ?';
  connection.query(DELETE_ANIMAL_QUERY, [id_animal], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erro ao deletar o animal');
    } else {
      if (result.affectedRows === 0) {
        // Nenhuma linha foi afetada, ou seja, o animal não foi encontrado
        res.status(404).send('Animal não encontrado');
      } else {
        // Exclusão bem-sucedida
        res.status(200).send('Animal deletado com sucesso');
      }
    }
  });
});

// Rota para criar um novo usuário
app.post('/usuarios', (req, res) => {
  const dadosUsuario = {
    nome: req.body.nome,
    email: req.body.email,
    telefone: req.body.telefone,
    senha: req.body.senha,
    ativo : 1
  }

  const INSERT_USER_QUERY = 'INSERT INTO tb_usuarios SET ?';
  connection.query(INSERT_USER_QUERY, dadosUsuario, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erro ao cadastrar usuário!');
    } else {
      dadosUsuario.id = result.insertId;
      res.status(201).json({
        message: 'Usuário criado com sucesso!',
        usuario: dadosUsuario,
      });
    }
  });
});

// Rota para buscar todos os usuários
app.get('/usuarios', (req, res) => {
  const SELECT_USERS_QUERY = 'SELECT * FROM tb_usuarios';
  connection.query(SELECT_USERS_QUERY, (err, results) => {
    if (err) {
      res.status(500).send('Erro ao buscar usuários!');
    } else {
      res.status(200).json(results);
    }
  });
});

// Rota para atualizar um usuário
app.put('/usuarios/:id_usuario', (req, res) => {
  const { nome, email, telefone, senha } = req.body;
  const ativo = 1;
  const { id_usuario } = req.params;
  const UPDATE_USER_QUERY = 'UPDATE tb_usuarios SET nome = ?, email = ?, telefone = ?, senha = ?, ativo = ? WHERE id_usuario = ?';
  connection.query(UPDATE_USER_QUERY, [nome, email, telefone, senha, ativo, id_usuario], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erro ao atualizar o usuário');
    } else {
      if(result.affectedRows === 1)
      res.status(200).send('Usuário atualizado com sucesso!');
    }
  });
});

// Rota para deletar um usuário
app.delete('/usuarios/:id_usuario', (req, res) => {
  const { id_usuario } = req.params;
  const DELETE_USER_QUERY = 'DELETE FROM tb_usuarios WHERE id_usuario = ?';
  connection.query(DELETE_USER_QUERY, [id_usuario], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erro ao deletar o usuário!');
    } else {
      res.status(200).send('Usuário deletado com sucesso!');
    }
  });
});

// Inicie o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor em execução na porta 3000');
});
