const express = require("express");

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API en ejecución!")
});

app.listen(port, () => {
  console.log(`Server inicializado en el puerto ${port}`)
});