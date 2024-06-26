const express = require("express");
const Annonce = require("../models/Annonce");
const router = express.Router();

// CREATE

/**
 * @swagger
 * /post:
 *   post:
 *     summary: Create a new annonce and respond with JSON
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *               prix:
 *                 type: number
 *               description:
 *                 type: string
 *               categorie:
 *                 type: string
 *               localisation:
 *                 type: string
 *               vendeur:
 *                 type: string
 *     responses:
 *       200:
 *         description: Annonce created
 *       400:
 *         description: Bad Request
 */
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

  router.post("/post", async (req, res) => {
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
      res.json({response:"Nouvelle annonce créée"});
    } catch (error) {
      res.status(400).send(error);
    }
  })

// READ
/**
 * @swagger
 * components:
 *   schemas:
 *     Annonce:
 *       type: object
 *       required:
 *         - titre
 *         - description
 *         - prix
 *       properties:
 *         titre:
 *           type: string
 *           description: The title of the annonce
 *         description:
 *           type: string
 *           description: The description of the annonce
 *         prix:
 *           type: number
 *           description: The price of the annonce
 *       example:
 *         titre: "Annonce 1"
 *         description: "This is a description"
 *         prix: 100
 */

/**
 * @swagger
 * /annonces:
 *   get:
 *     summary: Returns a list of all annonces
 *     responses:
 *       200:
 *         description: A list of annonces
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Annonce'
 */

router.get("/", async (req, res) => {
    try {
      const annonces = await Annonce.find();
      res.json( annonces );
    } catch (error) {
      res.status(400).send(error);
    }
  });

// Route pour obtenir une annonce par ID

/**
 * @swagger
 * /annonce/{id}:
 *   get:
 *     summary: Get an annonce by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The annonce ID
 *     responses:
 *       200:
 *         description: Annonce details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 titre:
 *                   type: string
 *                 prix:
 *                   type: number
 *                 description:
 *                   type: string
 *                 categorie:
 *                   type: string
 *                 localisation:
 *                   type: string
 *                 vendeur:
 *                   type: string
 *       500:
 *         description: Server error
 */
router.get("/annonce/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const findOne = await Annonce.findById(id);
      res.json( findOne );
    } catch (error) {
      res.status(500).send(error);
    }
  });

// EDIT

/**
 * @swagger
 * /edit/{id}:
 *   get:
 *     summary: Render the edit page for an annonce
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The annonce ID
 *     responses:
 *       200:
 *         description: Render edit page
 *       500:
 *         description: Server error
 */
router.get("/edit/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const findOne = await Annonce.findById(id);
      res.render("edit", { findOne });
    } catch (error) {
      res.status(500).send(error);
    }
  });
  

  /**
 * @swagger
 * /edit-form/{id}:
 *   post:
 *     summary: Update an existing annonce
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The annonce ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *               prix:
 *                 type: number
 *               description:
 *                 type: string
 *               categorie:
 *                 type: string
 *               localisation:
 *                 type: string
 *               vendeur:
 *                 type: string
 *     responses:
 *       200:
 *         description: Render annonce page
 *       500:
 *         description: Server error
 */
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



  /**
 * @swagger
 * /put/{id}:
 *   put:
 *     summary: Update an existing annonce and respond with JSON
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The annonce ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *               prix:
 *                 type: number
 *               description:
 *                 type: string
 *               categorie:
 *                 type: string
 *               localisation:
 *                 type: string
 *               vendeur:
 *                 type: string
 *     responses:
 *       200:
 *         description: Annonce details
 *       500:
 *         description: Server error
 */
  router.put("/put/:id", async (req, res)=> {
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
      res.json( findOne );
    } catch (error) {
      res.status(500).send(error);
    }
  })

// DELETE

/**
 * @swagger
 * /delete/{id}:
 *   get:
 *     summary: Delete an annonce
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type
 */
router.get("/delete/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
  
    try {
      const deleteOne = await Annonce.deleteOne({ _id: id });
      const NewAnnonce = await Annonce.find({});
      res.json({response:"supprimé"});
    } catch {
      res.status(400);
    }
  });

module.exports = router;
