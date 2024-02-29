const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipes');
// const authController = require('../controllers/auth');

const validation = require('../middleware/validate');
// const authMiddleware = require('../middleware/auth')


function isAuthenticated(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        // Here, you would validate the bearer token (e.g., check if it's valid, not expired, etc.)
        // For simplicity, let's assume the token is valid
        return next();
    } else {
        res.status(401).send('Unauthorized');
    }
}

// router.get('/profile', isAuthenticated, (req, res) => {
//     res.send('This is your profile');
// });

// router.get('/api/protected-route', isAuthenticated, (req, res) => {
//     res.send('This is a protected route');
// });

// GET - Route to retrieve All Recipes from database.
router.get('/', recipesController.getAllRecipes);

// GET - Recipe by ID
router.get('/:id', recipesController.getSingleRecipe);

// POST - Route to create a Recipe. 
router.post('/', isAuthenticated, validation.saveRecipe, recipesController.createRecipe);



// PUT - Update Recipe.
router.put('/:id', isAuthenticated, validation.saveRecipe, recipesController.updateRecipe)

// DELETE - Delete Recipe
router.delete('/:id', isAuthenticated, recipesController.deleteRecipe)



module.exports = router;