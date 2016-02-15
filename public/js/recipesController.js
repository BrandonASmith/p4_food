angular.module('recipeApp')
	.controller('RecipesController', recipesController)
	.controller('recipeDetailController', recipeDetailController)
    
    
recipesController.$inject = ['recipeFactory', '$window']
recipeDetailController.$inject = ['recipeFactory','$stateParams','$location']

function recipesController(recipeFactory, $window, $timeout){
	var self = this
	self.name = 'Recipe List'
	self.api = recipeFactory
	self.recipes = []
	self.newRecipe = {}

	self.api.list().success(function(response){
		self.recipes = response
	})

	self.addRecipe = function(name,cuisine,ingredients, instructions){
		var data = {name: name, cuisine: cuisine, ingredients: ingredients, instructions: instructions}
		self.api.addRecipe(data).then(function success(response){
			self.recipes.push(response.data.recipe)
			self.newRecipe = {}
			$window.document.querySelectorAll('#new-recipe-form input')[0].focus()
		})
	}
}

function recipeDetailController(recipeFactory,$stateParams,$location){
	var self = this
	self.name = 'Recipe Detail'
	self.api = recipeFactory
	self.recipe = null
	self.editing = false
	self.showRecipe = function(recipeId){
		self.api.show(recipeId).success(function(response){
			self.recipe = response
			console.log(response)
		})
	}
	self.showRecipe($stateParams.recipeId)

	self.updateRecipe = function(recipeId, name, cuisine, ingredients, instructions){
		var data = {name: name, cuisine: cuisine, ingredients: ingredients, instructions: instructions}
		self.api.updateRecipe(recipeId,data).success(function(response){
			console.log(response)
			self.recipe = response
			self.editing = false
		})
	}

	self.removeRecipe = function(recipeId){
		self.api.removeRecipe(recipeId).success(function(response){
			console.log(response)
			$location.path('/recipes')
		})
	}
}