var
	mongoose = require('mongoose'),
	Schema = mongoose.Schema

var recipeSchema = new Schema({
	avatar_url: String,
	name: String,
	cuisine: String,
    ingredients: String,
    instructions: String

})

var Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe
