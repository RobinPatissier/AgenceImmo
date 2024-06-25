const express = require("express");
const Annonce = require("../models/Annonce");
const router = express.Router();

// CREATE
router.get("/create", async (req, res) => {
    res.render("create", {});
  });
  
  router.post("/create-form", async (req, res) => {
    try {
      const nouvelleAnnonce = new Annonce({
        titre: req.body.titre,
        prix: req.body.prix,
        description: req.body.description,
        categorie: req.body.categorie,
        localisation: req.body.localisation,
        vendeur: req.body.vendeur,
      });
      await nouvelleAnnonce.save();
      res.redirect("/");
    } catch (error) {
      res.status(400).send(error);
    }
  });

// READ
router.get("/", async (req, res) => {
    try {
      const annonces = await Annonce.find();
      res.render("index", { annonces });
    } catch (error) {
      res.status(400).send(error);
    }
  });

// Route pour obtenir une annonce par ID
router.get("/annonce/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const findOne = await Annonce.findById(id);
      res.render("annonce", { findOne });
    } catch (error) {
      res.status(500).send(error);
    }
  });

// EDIT
router.get("/edit/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const findOne = await Annonce.findById(id);
      res.render("edit", { findOne });
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  router.post("/edit-form/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const updateOne = await Annonce.findByIdAndUpdate(
        { _id: id },
        {
          titre: req.body.titre,
          description: req.body.description,
          prix: req.body.prix,
          categorie: req.body.categorie,
          localisation: req.body.localisation,
          vendeur: req.body.vendeur,
        }
      );
      const findOne = await Annonce.findById(id);
      res.render("annonce", { findOne });
    } catch (error) {
      res.status(500).send(error);
    }
  });

// DELETE
router.get("/delete/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
  
    try {
      const deleteOne = await Annonce.deleteOne({ _id: id });
      const NewAnnonce = await Annonce.find({});
      res.redirect("/");
    } catch {
      res.status(400);
    }
  });

module.exports = router;
