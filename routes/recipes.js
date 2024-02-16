const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipes');

const validation = require('../middleware/validate');





// GET Route to retrieve All Recipes from database.
router.get('/', recipesController.getAllRecipes);

// GET - Recipe by ID
router.get('/:id', recipesController.getSingleRecipe);

// Middleware to check if input fields are filled in or not. (Haven't added this yet)
// const middleware = require('../middleware/recipes'); 

// POST Route to create a Recipe. Also created middleware to check if the inputs are empty or not.
router.post('/', validation.saveRecipe, recipesController.createRecipe);

// PUT - Update Recipe, Also used middleware to check if inputs are empty or not.
router.put('/:id', validation.saveRecipe, recipesController.updateRecipe)

// DELETE - Delete Recipe
router.delete('/:id', recipesController.deleteRecipe)



module.exports = router;