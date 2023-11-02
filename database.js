// Importe o módulo mysql
const mysql = require('mysql');

// Configure a conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'rancho',
});

// Conecte ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro na conexão com o banco de dados: ' + err.stack);
    return;
  }
  console.log('Conexão bem-sucedida ao banco de dados');
});

module.exports = connection;