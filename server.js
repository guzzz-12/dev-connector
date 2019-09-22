const express = require("express");
//Tomar las variables de entorno
const dotenv = require("dotenv");
dotenv.config({path: "./config.env"});

const connectDB = require("./config/db");

//Inicializar la aplicación
const app = express();

//Conectarse con la base de datos
connectDB();

//Middlewares
app.use(express.json({extended: false}))

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API en ejecución!")
});

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

app.listen(port, () => {
  console.log(`Server inicializado en el puerto ${port}`)
});