const mongoose = require("mongoose");
// const config = require("config");
const db = process.env.MONGO_URI.replace("<password>", process.env.MONGO_PASSWORD);

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log("MongoDB conectado exitosamente")
  } catch(error) {
    console.log(error.message);
    process.exit(1)
  }
}

module.exports = connectDB;