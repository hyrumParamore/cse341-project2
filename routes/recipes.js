const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipes');



const validation = require('../middleware/validate');
const authMiddleware = require('../middleware/auth')


// function isAuthenticated(req, res, next) {
//     const bearerHeader = req.headers['authorization'];
//     if (typeof bearerHeader !== 'undefined') {
//         const bearerToken = bearerHeader.split(' ')[1];
//         req.token = bearerToken;
//         // This is where you would validate the bearer token, but for now I am just going to
//         // assume that the token is valid. It makes it easier to work with right now.
//         jwt.verify(bearerToken, 'your_secret_key', (err, decoded) => {
//             if (err) {
//                 res.status(403).send('Invalid token');
//             } else {
//                 // Token is valid, you can proceed to the next middleware
//                 // or route handler
//                 req.decodedToken = decoded;
//                 next();
//             }
//         });
//     } else {
//         res.status(401).send('Unauthorized');
//     }
// }


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