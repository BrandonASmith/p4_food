var express = require('express')
var apiRouter = express.Router() //get an instance of express router
var usersController = require('../controllers/usersController')
var recipesController = require('../controllers/recipesController')

var User = require('../models/User')


// Non-Authenticated routes ===========

//make a user
apiRouter.route('/users')
	.post(usersController.create)

//login
apiRouter.route('/authenticate')
	.post(usersController.authenticate)

// Authenticated routes  ==============
//config middleware for auth
apiRouter.use(usersController.checkUser)

//users index
apiRouter.route('/users')
	.get(usersController.index)

//logged in user detail
apiRouter.route('/me')
	.get(function(req, res){
		res.send(req.decoded)
	})

//user CRUD
apiRouter.route('/users/:user_id')
	.get(usersController.show)
	.put(usersController.update)
	.delete(usersController.destroy)

//recipes CRUD
apiRouter.route('/recipes')
	.get(recipesController.getAllRecipes)
	.post(recipesController.createRecipe)

apiRouter.route('/recipes/:id')
	.get(recipesController.getOneRecipe)
	.patch(recipesController.updateRecipe)
	.delete(recipesController.deleteRecipe)

module.exports = apiRouter