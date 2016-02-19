angular.module('recipeApp')
	.factory('recipeFactory', recipeFactory)

recipeFactory.$inject = ['$http']

function recipeFactory($http){
	var recipesUrl = 'https://lit-inlet-27097.herokuapp.com/api/recipes'
	var recipes = {}

	recipes.list = function(){
		return $http.get(recipesUrl)
	}

	recipes.show = function(recipeId){
		return $http.get(recipesUrl + '/' + recipeId)
	}

	recipes.addRecipe = function(data){
		return $http.post(recipesUrl, data)
	}

	recipes.updateRecipe = function(recipeId,data){
		return $http.patch(recipesUrl + '/' + recipeId, data)
	}

	recipes.removeRecipe = function(recipeId){
		return $http.delete(recipesUrl + '/' + recipeId)
	}
	
	return recipes
}