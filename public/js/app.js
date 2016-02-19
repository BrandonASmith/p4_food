angular.module('recipeApp', ['ui.router', 'ui.bootstrap'])
	.directive('navBar', navBar)
	.directive('recipeForm', recipeForm)
	.filter('reverse', reverse)

function reverse() {
	return function(items) {
		return items.slice().reverse();
	};
}


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