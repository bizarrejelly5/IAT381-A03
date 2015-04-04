var redirected = false;
$(document).ready(
	function(){
		//redirects back to the index page after 5 seconds
		if(redirected == false){
			setTimeout(function(){ 
				window.location.replace("./partials/main.html");
			}, 1000);
			redirected = true;
		}
	}
);
