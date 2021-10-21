-get an access token - api example:
http://localhost:8080/api/token

**after you have the token, save the value under request headers with key 'x-access-token' **

-get all pets - api example (provide a page + limit):
GET : http://localhost:8080/api/pets?page=1&limit=10

(without - apply with default values: page=1, limit=10)
GET REQUEST: http://localhost:8080/api/pets

-call calculate ages - api example:
GET REQUEST: http://localhost:8080/api/calculates/pets-ages

-post a new pet - api example:
POST REQUEST: http://localhost:8080/api/pet
in request body create an object:
{
    "name" : "myDog",
    "type" : "Dog",
    "age" : 8
}

delete a pet by name - api example:
DELETE REQUEST:http://localhost:8080/api/pet?name=talor

**you can test the restApi by postman or by mocha+chai**
1.npm run dev - open the endpoint server

2.npm test - test by mocha+chai

