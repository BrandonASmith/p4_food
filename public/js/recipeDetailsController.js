angular.module('recipeApp')
	.controller('RecipeDetailsController', RecipeDetailsController)

RecipeDetailsController.$inject = ['recipeFactory','$stateParams','$location']

function RecipeDetailsController(recipeFactory,$stateParams,$location){
	var vm = this
	vm.name = 'Recipe Detail'
	vm.api = recipeFactory
	vm.recipe = null
	vm.editing = false
	vm.showRecipe = function(recipeId){
		vm.api.show(recipeId).success(function(response){
			vm.recipe = response
			console.log(response)
			console.log("recipe:", vm.recipe)
		})
	}
	vm.showRecipe($stateParams.recipeId)

	vm.updateRecipe = function(recipeId, avatar_url, name, cuisine, ingredients, instructions){
		var data = {avatar_url: avatar_url, name: name, cuisine: cuisine, ingredients: ingredients, instructions: instructions}
		vm.api.updateRecipe(recipeId,data).success(function(response){
			console.log(response)
			vm.recipe = response
			vm.editing = false
		})
	}

	vm.removeRecipe = function(recipeId){
		vm.api.removeRecipe(recipeId).success(function(response){
			console.log(response)
			$location.path('/recipes')
		})
	}
}