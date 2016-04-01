# Routes #

####Login View
`GET /api/auth'

* **Use**: To login
* **Request**: Request must include username or email and password in query string
* **Response**: Responds with user object
  * On successfully finding user with matching password, responds with 200 and
    `{"id": 3, "username": "tasio", token: }`
  * On successfully finding user with incorrect password, responds with 400 and "Invalid Login"
  * On failure, responds with 500 and "Failed verify user request: ${error}"


####Sign Up View
`POST /api/auth'

* **Use**: To sign up
* **Request**: Request must include email and password in query string
* **Response**: Responds with user object
  * On successful request where user does not already exist, responds with 201 and
  `{"id": 3, "email": "tasio@email.com", token: }`
  * On success where user already exists, responds with 406 and "Email already exists"
  * On failure, responds with 500 and "Failed signup request: ${error}"


####Select a Username View
`PUT /api/auth`

* **Use**: To select a username
* **Request**: Request must include username and pass authentication with passport
* **Response**: Responds with request status
  * On success, responds with 204 and "Successfully updated"
  * On passing authentication where username already exists, responds with 409 and "already exists"
  * On failure, responds 500 and "Failed signup request: ${error}"


####Video View
`POST /api/quilt`

* **Use**: To send quilt info. Including quilt title, theme, selected friends, and init video.
* **Request**: Accepts urlencoded form data with these props

  ```
  {
      "id": int,
      "filename": string,
      "status": int,
      "createdAt": Date,
      "updatedAt": Date,
      "UserQuilt": {
        "status": int,
        "createdAt": Date,
        "updatedAt": Date,
        "quiltId": int,
        "userId": int
      }
  }
  ```
* **Response**: Responds with quilt object
  * On failure, responds with 500 and "Failed submission"
  * On success, responds with 200 and

  ```
  {
      "status": 0,
      "quiltId": 33,
      "userId": 3,
      "createdAt": "2016-03-14T07:18:26.016Z",
      "updatedAt": "2016-03-14T07:18:26.016Z"
  }
  ```

// TODO: update /api/cross
`POST /api/cross'

* **Use**:
* **Request**:
* **Response**:
  *
  *
  *

####Quilts View
`GET api/quilt`

* **Use**: To get all the quilts with their title, theme, status
* **Request**: Request must include username in query string or api will respond with 400
* **Response**: Responds with array of UserQuilt objects
  * On failure, responds with 500 and "Failed request"
  * On success, responds with 200 and

  ```
  [ {
      "id": int,
      "filename": string,
      "status": int,
      "createdAt": Date,
      "updatedAt": Date,
      "UserQuilt": {
        "status": int,
        "createdAt": Date,
        "updatedAt": Date,
        "quiltId": int,
        "userId": int
      }
  } ]
  ```

####Individual Quilt Video View
`GET api/quilt/:id`

* **Use**: To get an individual quilt video by id
* **Request**: Get request passing in the id as a parameter
* **Response**: Responds with an individual quilt object
  * On failure, responds with 500 and "Failed request"
  * On success, responds with 200 and

  ```
  {
      "id": 2,
      "filename": "quilt2",
      "status": 0,
      "createdAt": "2016-03-14T04:30:09.475Z",
      "updatedAt": "2016-03-14T04:30:09.475Z"
  }
  ```

####Post Quilt Video View
`POST api/quilt/:id`

* **Use**: To send a video to the server for concatenation
* **Request**: Post request with the video and quilt id
* **Response**: Responds with quilt video
  * On failure, responds with 500 and "Failed request"
  * On success, responds with 200 and "Received video submission"


####Find Friends View
`GET api/users`

* **Use**: To get a user id by their username
* **Request**: Get request with username
* **Response**: Responds with user object
  * On failure, responds with 400
  * On success, responds with 200 and
  ```
  {
      "id": 3,
      "username": "Tasio",
  }
  ```


###On Hold:
-----------------------------
* post /api/friends/:id
* get /api/user/:username
* get /api/notifications/:id

####Select Friends For Quilt View
`GET /api/friends/:id`

* **Use**: To get the friends of the identified user
* **Request**: Get request made to server with the user_id
* **Response**: Responds with friends array
  * On failure, responds with 500 and "Failed get friends request: ${error}"
  * On success, responds with 200"
