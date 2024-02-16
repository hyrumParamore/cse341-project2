const validator = require('../helpers/validate');

const saveRecipe = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    description: 'required|string',
    instructions: 'required|string',
    servings: 'required|numeric',
    prepTime: 'required|numeric',
    cookTime: 'required|numeric',
    ingredients: 'required|array',
    'ingredients.*.name': 'required|string', // Each ingredient must have a name
    'ingredients.*.quantity': 'required|numeric', // Each ingredient must have a quantity
    'ingredients.*.unit': 'string' // The unit is optional but must be a string if present
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveRecipe
};
