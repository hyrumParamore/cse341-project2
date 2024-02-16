const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


// Get All Recipes
const getAllRecipes = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('recipes').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET Recipe by ID
const getSingleRecipe = async (req, res) => {
  try {
    const recipeId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('recipes').find({ _id: recipeId });
    const lists = await result.toArray();
    if (lists.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new Recipe
const createRecipe = async (req, res ) => {  
  try {
    const recipe = {
      title: req.body.title,
      description: req.body.description,
      instructions: req.body.instructions,
      servings: req.body.servings,
      prepTime: req.body.prepTime,
      cookTime: req.body.cookTime,
      ingredients: req.body.ingredients
    };
    const response = await mongodb.getDb().db().collection('recipes').insertOne(recipe);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Failed to create recipe.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Update Recipe by ID
const updateRecipe = async (req, res) => {
  try {
    const recipeId = new ObjectId(req.params.id);

    const recipe = {
      title: req.body.title,
      description: req.body.description,
      instructions: req.body.instructions,
      servings: req.body.servings,
      prepTime: req.body.prepTime,
      cookTime: req.body.cookTime,
      ingredients: req.body.ingredients
    };

    const response = await mongodb.getDb().db().collection('recipes').replaceOne({ _id: recipeId }, recipe);

    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Failed to update recipe.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Recipe by ID
const deleteRecipe = async (req, res) => {
  try {
    const recipeId = new ObjectId(req.params.id);

    const response = await mongodb.getDb().db().collection('recipes').deleteOne({ _id: recipeId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Recipe not found.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports = { 
  getAllRecipes, 
  getSingleRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe
  };