const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


// Week 2 - Get All Contacts
const getAllRecipes = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('recipes').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  
};

// Week 2 - Get Single Contact From ID
const getSingleRecipe = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('recipes')
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  
};


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
      res.status(500).json(response.error || 'Some error occurred while creating the recipe.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports = { 
  getAllRecipes, 
    getSingleRecipe,
    createRecipe,
    // updateContact,
    // deleteContact
  };