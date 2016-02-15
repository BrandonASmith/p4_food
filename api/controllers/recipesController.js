var Recipe = require('../models/Recipe.js');

function getAllRecipes(req,res){
	Recipe.find({}, function(err, recipes){
		res.json(recipes)	
	})
}

function createRecipe(req,res){
	var newRecipe = new Recipe
	newRecipe.name = req.body.name
	newRecipe.cuisine = req.body.cuisine
    newRecipe.ingredients = req.body.ingredients
	newRecipe.save(function(err, recipe){
		if(err) throw err
		res.json({message: "Recipe Saved!", recipe: recipe})
	})
}

function getOneRecipe(req,res){
	Recipe.findById(req.params.id, function(err,recipe){
		if(err) throw err
		res.json(recipe)
	})
}

function updateRecipe(req,res){
	Recipe.findOneAndUpdate({_id: req.params.id}, req.body, function(err,recipe){
		if(err) throw err
		Recipe.findById(req.params.id, function(err,updatedRecipe){
			res.json(updatedRecipe)
		})
	})
}

function deleteRecipe(req,res){
	Recipe.findOneAndRemove({_id: req.params.id}, req.body, function(err,recipe){
		if(err) throw err
		res.json({message:"Recipe deleted!"})
	})
}


module.exports = {
	getAllRecipes : getAllRecipes,
	createRecipe : createRecipe,
	getOneRecipe : getOneRecipe,
	updateRecipe : updateRecipe,
	deleteRecipe : deleteRecipe

}