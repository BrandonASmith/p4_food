angular.module('reviewApp', ['ui.router'])
	.directive('navBar', navBar)
	.directive('recipeForm', recipeForm)

function recipeForm(){
	var directive = {
		restrict: 'E',
		templateUrl: '/partials/recipe-form.html'
	}
	return directive
}

function navBar(){
	var directive = {
		//only display the navbar partial is its an element
		restrict: 'E',
		templateUrl: '/partials/nav.html',
		//include across things
		transclude: true
	}
	return directive
}