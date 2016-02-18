angular.module('recipeApp')
	.config(MainRouter)
	.config(interceptor)

function interceptor($httpProvider) {
	$httpProvider.interceptors.push('authInterceptorFactory')
}

function MainRouter($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/login')

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'partials/home.html',
			controller: 'UsersController as usersCtrl'
		})
		.state('login', {
			url: '/login',
			templateUrl: 'partials/login.html',
			controller: 'UsersController as usersCtrl'
		})
		.state('signup', {
			url: '/signup',
			templateUrl: 'partials/signup.html',
			controller: 'UsersController as usersCtrl'
		})
		.state('loggedOut', {
			url: '/loggedOut',
			templateUrl: 'partials/home.html',
			controller: 'UsersController as usersCtrl'
		})
		.state('recipes', {
			url: '/recipes',
			templateUrl: 'partials/myrecipes.html',
			controller: 'RecipesController as recipesCtrl'
		})
		.state('addrecipe', {
			url: '/addrecipe',
			templateUrl: 'partials/recipe-form.html',
			controller: 'RecipesController as recipesCtrl'
		})

		.state('detail', {
			url: '/recipes/:recipeId',
			templateUrl: 'partials/recipe-detail.html',
			controller: 'RecipeDetailsController as recipeDetailsCtrl'
		})
}