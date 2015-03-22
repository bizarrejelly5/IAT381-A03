var index = angular.module('index', ['ngRoute']);

index.config(function($routeProvider){
	$routeProvider.
	//**Home Page**
		//index for app
		when('/', {
			templateUrl: 'partials/index.html'
		})
});
