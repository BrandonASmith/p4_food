angular.module('recipeApp')
	.controller('RecipesController', recipesController)
	.controller('recipeDetailController', recipeDetailController)
    
    
recipesController.$inject = ['recipeFactory', '$window']
recipeDetailController.$inject = ['recipeFactory','$stateParams','$location']

function recipesController(recipeFactory, $window, $timeout){
	console.log('Recipes Controller is active')
	var self = this
	self.name = 'Recipe List'
	self.api = recipeFactory
	self.recipes = []
	self.newRecipe = {}

	self.api.list().success(function(response){
		self.recipes = response
	})

	self.addRecipe = function( avatar_url, name, cuisine, ingredients, instructions){
		var data = { avatar_url: avatar_url, name: name, cuisine: cuisine, ingredients: ingredients, instructions: instructions}
		self.api.addRecipe(data).then(function success(response){
			self.recipes.push(response.data.recipe)
			self.newRecipe = {}
			$window.document.querySelectorAll('#new-recipe-form input')[0].focus()
		})
	}


	self.sthree = function(){

		 /*
      		Function to carry out the actual PUT request to S3 using the signed request from the app.
  		*/
		function upload_file(file, signed_request, url){
			console.log(file)
			console.log(signed_request)
			console.log(url)
			$window.localStorage.setItem('url', url)
			var xhr = new XMLHttpRequest();
			xhr.open("PUT", signed_request);
			xhr.setRequestHeader('x-amz-acl', 'public-read');
			xhr.onload = function() {
			  if (xhr.status === 200) {
			      document.getElementById("preview").src = url;            
			      document.getElementById("avatar_url").value = url;
			      self.newRecipe.avatar_url = url
			  }
			};
		  xhr.onerror = function() {
		      console.log("vanilla AJax call : " + JSON.stringify(xhr))
		      alert("Could not upload file."); 
		  };
		  xhr.send(file);
		}

		/*
		  Function to get the temporary signed request from the app.
		  If request successful, continue to upload the file using this signed
		  request.
		*/
		function get_signed_request(file){
			console.log("getting signed request")
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "http://localhost:3000/sign_s3?file_name="+file.name+"&file_type="+file.type);
		xhr.onreadystatechange = function(){
		  if(xhr.readyState === 4){
		    if(xhr.status === 200){
		      var response = JSON.parse(xhr.responseText);
		      upload_file(file, response.signed_request, response.url);
		    }
		    else{
		      alert("Could not get signed URL.");
		    }
		  }
		};
		xhr.send();
		}

		/*
		 Function called when file input updated. If there is a file selected, then
		 start upload procedure by asking for a signed request from the app.
		*/
		function init_upload(){
			console.log("here");
			var files = document.getElementById("file_input").files;
			var file = files[0];
			if(file == null){
			  alert("No file selected.");
			  return;
			}
				get_signed_request(file);
			}

		/*
		 Bind listeners when the page loads.
		*/



		(function() {
			console.log("IIFE for s3")
		    	window.document.querySelector("#file_input").addEventListener('change', init_upload)
		})();

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
			console.log("here i am", response)
		})
	}
	self.showRecipe($stateParams.recipeId)

	self.updateRecipe = function(recipeId, avatar_url, name, cuisine, ingredients, instructions){
		var data = {avatar_url: avatar_url, name: name, cuisine: cuisine, ingredients: ingredients, instructions: instructions}
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

	// self.uploadFile = function($window){
	// 	function init_upload(){
	// 		console.log("here")
	// 	}
		
	// }

	
}