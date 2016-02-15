var
	mongoose = require('mongoose'),
	Schema = mongoose.Schema

var recipeSchema = new Schema({
	name: String,
	cuisine: String,
    ingredients: String

})

var Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe
