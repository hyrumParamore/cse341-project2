const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipes');

const validation = require('../middleware/validate');
const authMiddleware = require('../middleware/auth')


// GET - Route to retrieve All Recipes from database.
router.get('/', recipesController.getAllRecipes);

// GET - Recipe by ID
router.get('/:id', recipesController.getSingleRecipe);

// POST - Route to create a Recipe. 
router.post('/', authMiddleware.isAuthenticated, validation.saveRecipe, recipesController.createRecipe);



// PUT - Update Recipe.
router.put('/:id', authMiddleware.isAuthenticated, validation.saveRecipe, recipesController.updateRecipe)

// DELETE - Delete Recipe
router.delete('/:id', authMiddleware.isAuthenticated, recipesController.deleteRecipe)



module.exports = router;