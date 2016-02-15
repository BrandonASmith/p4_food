angular.module('recipeApp')
	.controller('RecipeDetailsController', RecipeDetailsController)

RecipeDetailsController.$inject = ['recipeFactory','$stateParams','$location']

function RecipeDetailsController(carsFactory,$stateParams,$location){
	var vm = this
	vm.name = 'Car Detail'
	vm.api = carsFactory
	vm.car = null
	vm.editing = false
	vm.showCar = function(carId){
		vm.api.show(carId).success(function(response){
			vm.car = response
			console.log(response)
		})
	}
	vm.showCar($stateParams.carId)

	vm.updateCar = function(carId, make, model, year){
		var data = {make: make, model: model, year: year}
		vm.api.updateCar(carId,data).success(function(response){
			console.log(response)
			vm.car = response
			vm.editing = false
		})
	}

	vm.removeCar = function(carId){
		vm.api.removeCar(carId).success(function(response){
			console.log(response)
			$location.path('/cars')
		})
	}
}