# LAB -  API Integration

## Overview
This is a REST api that stores users and the tasks that they create in a SQL database. The users can sign up, which will create a new user record in the users table. The sign in route will authenticate the user with basic auth. To get, add, update, and delete tasks, the user must use bearer auth. Users are given user capabilities by default. This means they can only change the todo list associated with their id. In order to see and manage all the users, an admin must be logged in.

## Deployed Server
[https://todo-server-401.herokuapp.com/](https://todo-server-401.herokuapp.com/)

## Architecture and Routes

### User Routes
- base URL: https://todo-server-401.herokuapp.com/
- Sign UP: POST /signup
    - send the username and password in the request
    - returns a user record with the token attached
    - example request with axios
    ```js
    const config = {
      method: 'post',
      url: 'https://todo-server-401.herokuapp.com/signup',
      data: {
        username: 'user',
        password: 'foo'
      }
    }
    const response = await axios(config);
    ```
    - example response
    ```js
    response.data = {
      user: {
        username: 'user',
        password: 'foo',
        id: 1,
        token: '<jsonwebtoken>',
        role: 'user'
      },
      token: '<jsonwebtoken>'
    }
    ```
- Sign IN: POST /signin
    - send the username and password in the header as basic auth
        - 'authorization': 'Basic username-base64-encoded:password-base64-encoded'
    - returns a user record with the token attached
    - example request with axios
    ```js
    const config = {
      method: 'post',
      url: 'https://todo-server-401.herokuapp.com/signin',
      auth: {
        username: 'user',
        password: 'foo'
      }
    }
    const response = await axios(config);
    ```
    - example response
    ```js
    response.data = {
      user: {
        username: 'user',
        password: 'foo',
        id: 1,
        token: '<jsonwebtoken>',
        role: 'user'
      },
      token: '<jsonwebtoken>'
    }
    ```

### CRUD Task Routes
- Base URL 'https://todo-server-401.herokuapp.com/api/v1
- Read Tasks: GET /tasks/:user_id
    - send the user id as a parameter
    - returns a list of tasks that are associated with user id
    - example request with axios
    ```js
    const config = {
      method: 'get',
      url: 'https://todo-server-401.herokuapp.com/api/v1/tasks/1',
    }
    const response = await axios(config);
    ```
    - example response
    ```js
    response.data = {
      [
        {
          id: 1,
          user_id: 1,
          text: 'do the dishes',
          assignee: 'user',
          complete: false,
          difficulty: 5
        }
      ]
    }
    ```
- Create Task: POST /tasks
    - send the task as a json object in the body
    - returns the task record
    - example request with axios
    ```js
    const config = {
      method: 'post',
      url: 'https://todo-server-401.herokuapp.com/api/v1/tasks',
      data: {
        user_id: 1,
        text: 'do the dishes',
        assignee: 'user',
        complete: false,
        difficulty: 5
      }
    }
    const response = await axios(config);
    ```
    - example response
    ```js
    response.data = {
      id: 1,
      user_id: 1,
      text: 'do the dishes',
      assignee: 'user',
      complete: false,
      difficulty: 5
    }
    ```
- Update Task: PUT /tasks/:task_id
    - send the task as a json object in the body
    - returns the task record
    - example request with axios
    ```js
    const config = {
      method: 'put',
      url: 'https://todo-server-401.herokuapp.com/api/v1/tasks/1',
      data: {
        user_id: 1,
        text: 'do the dishes',
        assignee: 'user',
        complete: true,
        difficulty: 5
      }
    }
    const response = await axios(config);
    ```
    - example response
    ```js
    response.data = {
      id: 1,
      user_id: 1,
      text: 'do the dishes',
      assignee: 'user',
      complete: true,
      difficulty: 5
    }
    ```
- Delete Task: DELETE /tasks/:task_id
    - send the task id as a parameter
    - example request with axios
    ```js
    const config = {
      method: 'delete',
      url: 'https://todo-server-401.herokuapp.com/api/v1/tasks/1'
    }
    await axios(config);
    ```
