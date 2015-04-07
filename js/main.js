var index = angular.module('index', ['ngRoute']);

index.config(function($routeProvider){
	$routeProvider.
	//**Home Page**
		//index for app
		when('/', {
			templateUrl: 'partials/notindex.html'
		})
		.when('/index',{
			templateUrl: 'partials/notindex.html'
		})
		.when('/playBack',{
			templateUrl: 'partials/index.html'
		})
		.when('/comPose',{
			templateUrl: 'partials/notindex.html'
		})
});
