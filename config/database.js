const mongoose = require('mongoose');

const uri = "mongodb+srv://robinpat:Nesrcepre35@dbimmo.tmfsfvw.mongodb.net/?retryWrites=true&w=majority&appName=DBImmo";

async function main() {
  await mongoose.connect(uri)
      console.log("Connexion à MongoDB réussie");
  }

main().catch(err => console.log(err));

mongoose.connection.on("connected", () => {
  console.log("Mongoose est connecté à", uri);
});

mongoose.connection.on("error", (err) => {
  console.log("Erreur de connexion Mongoose :", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose est déconnecté");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Connexion à MongoDB fermée");
  process.exit(0);
});
