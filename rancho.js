const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const connection = require('./database.js');

// Rota para criar um novo animal
app.post('/animais', (req, res) => {

  const dadosAnimal = {
    nome: req.body.nome,
    sexo: req.body.sexo,
    origem: req.body.origem,
    raca: req.body.raca,
    data_nascimento: req.body.data_nascimento,
    situacao: req.body.situacao,
    mae_animal: req.body.mae_animal,
    ativo: 1
  };

  const INSERT_QUERY = 'INSERT INTO tb_animais SET ?';
  connection.query(INSERT_QUERY, dadosAnimal, (err, result) => {
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
  const SELECT_QUERY = 'SELECT * FROM tb_animais WHERE tb_animais.ativo = 1';
  connection.query(SELECT_QUERY, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erro ao buscar animais.');
    } else {
      res.status(200).json(results);
    }
  });
});

// Rota para atualizar um animal
app.put('/animais/:id', (req, res) => {
  const { nome, sexo, origem, raca, data_nascimento, situacao, mae_animal } = req.body;
  const id_animal = req.params.id;
  const UPDATE_QUERY = 'UPDATE tb_animais SET nome = ?, sexo = ?, origem = ?, raca = ?, data_nascimento = ?, situacao = ?, mae_animal = ? WHERE id_animal = ?';
  connection.query(UPDATE_QUERY, [nome, sexo, origem, raca, data_nascimento, situacao, mae_animal, id_animal], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erro ao atualizar animal.');
    } else {
      const animal = req.body;
      animal.id = id_animal;
      res.status(200).json({
        message: "Atualizado com sucesso!",
        animal: animal
      })
    }
  });
});

// Rota para deletar um animal
app.delete('/animais/:id', (req, res) => {
  const id_animal = req.params.id;
  if (!id_animal || isNaN(id_animal)) {
    res.status(400).send('ID do animal inválido');
    return;
  }
  const DELETE_QUERY = 'UPDATE tb_animais SET ativo = 0 WHERE id_animal = ?';
  connection.query(DELETE_QUERY, [id_animal], (err, result) => {
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

  const INSERT_QUERY = 'INSERT INTO tb_usuarios SET ?';
  connection.query(INSERT_QUERY, dadosUsuario, (err, result) => {
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
  const SELECT_QUERY = 'SELECT * FROM tb_usuarios';
  connection.query(SELECT_QUERY, (err, results) => {
    if (err) {
      res.status(500).send('Erro ao buscar usuários!');
    } else {
      res.status(200).json(results);
    }
  });
});

// Rota para atualizar um usuário
app.put('/usuarios/:id', (req, res) => {
  const { nome, email, telefone, senha } = req.body;
  const id_usuario = req.params.id;
  const UPDATE_QUERY = 'UPDATE tb_usuarios SET nome = ?, email = ?, telefone = ?, senha = ? WHERE id_usuario = ?';
  connection.query(UPDATE_QUERY, [nome, email, telefone, senha, id_usuario], (err, result) => {
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
app.delete('/usuarios/:id', (req, res) => {
  const id_usuario = req.params.id;
  const DELETE_QUERY = 'DELETE FROM tb_usuarios WHERE id_usuario = ?';
  connection.query(DELETE_QUERY, [id_usuario], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erro ao deletar o usuário!');
    } else {
      res.status(200).send('Usuário deletado com sucesso!');
    }
  });
});

// Rota para criar um novo controle de parto
app.post('/controledeparto', (req, res) => {
  const dadosControleParto = {
    data_cio: req.body.data_cio,
    data_inseminacao: req.body.data_inseminacao,
    touro: req.body.touro,
    protocolo: req.body.protocolo,
    data_protocolo: req.body.data_protocolo,
    id_animal_cp: req.body.animal_cp,
    ativo : 1
  }

  const INSERT_QUERY = 'INSERT INTO tb_controle_de_partos SET ?';
  connection.query(INSERT_QUERY, dadosControleParto, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erro ao cadastrar controle de parto!');
    } else {
      dadosControleParto.id = result.insertId;
      res.status(201).json({
        message: 'Controle de parto criado com sucesso!',
        usuario: dadosControleParto,
      });
    }
  });
});

// Rota para buscar todos os controles de parto
app.get('/controledeparto', (req, res) => {
  const SELECT_QUERY = 'SELECT * FROM tb_controle_de_partos WHERE ativo = 1';
  connection.query(SELECT_QUERY, (err, results) => {
    if (err) {
      res.status(500).send('Erro ao buscar controle de partos!');
    } else {
      res.status(200).json(results);
    }
  });
});

// Rota para atualizar um controle de parto
app.put('/controledeparto/:id', (req, res) => {
  const { data_cio, data_inseminacao, protocolo, data_protocolo, touro, id_animal_cp } = req.body;
  const id_controle_de_parto = req.params.id;
  const UPDATE_QUERY = 'UPDATE tb_controle_de_partos SET data_cio = ?, data_inseminacao = ?, protocolo = ?, data_protocolo = ?, touro = ?, id_animal_cp = ? WHERE id_controle_de_parto = ? AND ativo = 1';
  connection.query(UPDATE_QUERY, [data_cio, data_inseminacao, protocolo, data_protocolo, touro, id_animal_cp, id_controle_de_parto], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erro ao atualizar.');
    } else {
      res.status(200).send('Atualizado com sucesso!');
    }
  });
});

// Rota para deletar um controle de parto
app.delete('/controledeparto/:id', (req, res) => {
  const id_controle_de_parto = req.params.id;
  if (!id_controle_de_parto || isNaN(id_controle_de_parto)) {
    res.status(400).send('ID inválido');
    return;
  }
  const DELETE_QUERY = 'UPDATE tb_controle_de_partos SET ativo = 0 WHERE id_controle_de_parto = ?';
  connection.query(DELETE_QUERY, [id_controle_de_parto], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erro ao deletar');
    } else {
      if (result.affectedRows === 0) {
        res.status(404).send('Não encontrado');
      } else {
        res.status(200).send('Deletado com sucesso');
      }
    }
  });
});

// Rota para criar uma nova produção animal
app.post('/producaoanimal', (req, res) => {
  const dadosProducaoAnimal = {
    id_animal: req.body.id_animal,
    data_producao: req.body.data_producao,
    hora_producao: req.body.hora_producao,
    quantidade: req.body.quantidade,
    ativo : 1
  }

  const INSERT_QUERY = 'INSERT INTO tb_producao_animal SET ?';
  connection.query(INSERT_QUERY, dadosProducaoAnimal, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erro ao cadastrar produção animal!');
    } else {
      dadosProducaoAnimal.id = result.insertId;
      res.status(201).json({
        message: 'Produção animal criado com sucesso!',
        usuario: dadosProducaoAnimal,
      });
    }
  });
});

// Rota para buscar todas as produções animal
app.get('/producaoanimal', (req, res) => {
  const SELECT_QUERY = 'SELECT * FROM tb_producao_animal WHERE ativo = 1';
  connection.query(SELECT_QUERY, (err, results) => {
    if (err) {
      res.status(500).send('Erro ao buscar produção animal!');
    } else {
      res.status(200).json(results);
    }
  });
});

// Rota para atualizar uma producao animal
app.put('/producaoanimal/:id', (req, res) => {
  const { data_producao, quantidade } = req.body;
  const id_producao_animal = req.params.id;
  const UPDATE_QUERY = 'UPDATE tb_producao_animal SET data_producao = ?, quantidade = ? WHERE id_producao_animal = ? AND ativo = 1';
  connection.query(UPDATE_QUERY, [data_producao, quantidade, id_producao_animal], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erro ao atualizar.');
    } else {
      res.status(200).send('Atualizado com sucesso!');
    }
  });
});

// Rota para deletar uma produção animal
app.delete('/producaoanimal/:id', (req, res) => {
  const id_producao_animal = req.params.id;
  if (!id_producao_animal || isNaN(id_producao_animal)) {
    res.status(400).send('ID inválido');
    return;
  }
  const DELETE_QUERY = 'UPDATE tb_producao_animal SET ativo = 0 WHERE id_producao_animal = ?';
  connection.query(DELETE_QUERY, [id_producao_animal], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erro ao deletar');
    } else {
      if (result.affectedRows === 0) {
        res.status(404).send('Não encontrado');
      } else {
        res.status(200).send('Deletado com sucesso');
      }
    }
  });
});

// Inicie o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor em execução na porta 3000');
});
