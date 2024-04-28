const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.get('/registration', (req, res) => {
   res.sendFile(__dirname + '/index.html');
});

app.post('/registration', (req, res) => {
  const formData = req.body;
  res.json({ success: true, data: formData });
});

//Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

