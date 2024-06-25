const mongoose = require("mongoose");

const annonceSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
    trim: true,
  },
  prix: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  datePublication: {
    type: Date,
    default: Date.now,
  },
  categorie: {
    type: String,
    required: true,
  },
  localisation: {
    type: String,
    required: true,
  },
  vendeur: {
    type: String, 
    required: true,
  },
});

annonceSchema.methods.rateAnnonce = function() {
  console.log(`Annonce ${this.titre} est évaluée`);
  return 5; 
};

const Annonce = mongoose.model("Annonce", annonceSchema);

module.exports = Annonce;
