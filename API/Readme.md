

# Assignment API


### Require

 - NodeJS - [https://nodejs.org/en/](https://nodejs.org/en/)
 - MySQL database - [http://wampserver.com/](http://www.wampserver.com/) (exemple)
 - Postman - [https://www.getpostman.com/](https://www.getpostman.com/) (optional)
 
 
### Steps

1. Clone project

2. Configure database in *dbconnection.js* file and load the table exemple *task.sql*

3. Open console in your project folder. Type >`npm install` to install **dependencies** and then >`node app` to **start** the app at [http://localhost:8080/](http://localhost:8080/)

4. In the Postman header, don't forget the Auth0 token `authorization: 'Bearer {{token}}'`. To get the token, create *tokenclient.js* file in root folder and copy/paste your client information on [https://auth0.com/](https://auth0.com/) > API > assignment API > Test > Select language <kbd>jQuery</kbd>. The file should be like :
	```javascript
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "****",
		"method": "POST",
		"headers": {
		"content-type": "application/json"
	},
		"data": "{\"client_id\":\"****\",\"client_secret\":\"****\",\"audience\":\"https://easy-assignment.com\",\"grant_type\":\"client_credentials\"}"
	}

	$.ajax(settings).done(function (response) {
		console.log(response);
	});
	```
	Now open *token.html* and get your token...
	

### Sources

 - Secure backend API - [https://scotch.io/tutorials/building-and-securing-a-modern-backend-api](https://scotch.io/tutorials/building-and-securing-a-modern-backend-api)
 - Angular + API - [https://medium.com/craft-academy/connecting-an-api-to-an-angular-4-front-end-application-e0fc9ea33202](https://medium.com/craft-academy/connecting-an-api-to-an-angular-4-front-end-application-e0fc9ea33202)
 - Angular - [https://angular.io/docs](https://angular.io/docs)
