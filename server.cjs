const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração para permitir o parsing de JSON no corpo da requisição
app.use(bodyParser.json());
app.use(cors());

// Endpoint para renderizar a página do formulário
// app.get('/registration', (req, res) => {
//   // Simplesmente envia um arquivo HTML como resposta
//   //res.sendFile(__dirname + '/index.html');
//   res.send("<h1>Bem vindo!</h1>");
// });

// Endpoint para receber os dados do formulário
app.post('/registration', (req, res) => {
  
  
  // Extrai os dados do corpo da requisição
  const formData = req.body;

  // console.log(formData);

  // Validação: verifica se todos os campos obrigatórios foram preenchidos e não estão vazios
// if (!formData.name || !formData.email || !formData.phone || 
//   formData.name.trim() === '' || formData.email.trim() === '' || formData.phone.trim() === '') {
// // Se algum campo estiver faltando ou vazio, retorna um erro 400 (Bad Request)
// return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
// }


  // Caso os dados estejam completos, retorna uma resposta de sucesso com os dados recebidos
  res.json({ success: true, data: formData });
});

//Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

