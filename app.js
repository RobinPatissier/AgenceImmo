const express = require("express");
const mongoose = require("mongoose");
const mustacheExpress = require("mustache-express");
require("./config/database"); // Inclure la connexion à la base de données

const app = express();
const port = 3000;

// Middleware pour analyser les requêtes JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Pour analyser les requêtes URL-encoded

// Configurer le moteur de templates Mustache
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// Servir des fichiers statiques (optionnel)
app.use(express.static('public'));

// Importer et utiliser les routes des annonces
const annonceRoutes = require("./routes/annonces");
app.use("/", annonceRoutes);


// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
