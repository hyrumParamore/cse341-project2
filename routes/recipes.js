const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipes');

const validation = require('../middleware/validate');

// ************************************************************
// ERROR HANDLING is happening in the controller/recipes file
// I didn't find it necessary to have multiple error checks 
// basically covering the same things. It would have been redundant.
// ************************************************************

// GET - Route to retrieve All Recipes from database.
router.get('/', recipesController.getAllRecipes);

// GET - Recipe by ID
router.get('/:id', recipesController.getSingleRecipe);

// POST - Route to create a Recipe. 
router.post('/', validation.saveRecipe, recipesController.createRecipe);

// PUT - Update Recipe.
router.put('/:id', validation.saveRecipe, recipesController.updateRecipe)

// DELETE - Delete Recipe
router.delete('/:id', recipesController.deleteRecipe)



module.exports = router;