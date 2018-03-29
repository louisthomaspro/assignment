
# Assignment API


### Require

 - NodeJS - [https://nodejs.org/en/](https://nodejs.org/en/)
 - Postman - [https://www.getpostman.com/](https://www.getpostman.com/) (optional)


### Steps

1. Clone project (https://github.com/louisthomaspro/assignment.git)

2. Open console in "node-api" folder. Type >`npm install` to install dependencies and then >`node app` to start the app at [http://localhost:8080/](http://localhost:8080/)

3. You can use Postman to test the API. In the Postman header, put `Content-Type : application/x-www-form-urlencoded`. In body, set parameters.
For exemple :
```javascript
params : {"nbStudents":10,"nbProjects":13,"maxStudentsPerProjects":1,"minStudentsPerProjects":0,"ProjectsPerStudents":1}
array : [[7,1,8,4,12,13,11,2,10,9,3,5,6],[5,1,3,13,4,6,7,12,11,2,8,9,10],[6,7,5,4,3,2,8,1,9,10,11,12,13],[11,13,3,7,12,9,4,5,8,2,6,1,10],[13,1,3,10,5,2,9,6,12,11,7,4,8],[10,2,4,9,3,8,11,1,7,6,13,5,12],[5,2,12,1,6,13,10,4,7,9,3,11,8],[9,2,4,12,8,13,1,7,5,6,10,3,11],[13,1,12,2,4,11,3,10,5,7,8,9,6],[2,1,6,3,7,8,13,4,9,10,11,12,5]]
priority : [["","","","oui","oui","","","","","","","",""]]
```
