# Theatres Admin Dashboard

> **Admin Dashboard API for Theatre admins**

This repository exposes a [JSON:API Spec](http://jsonapi.org/) Compliant `REST API` that can be used by external services to build a Theatre Admin platform enabling user management and email notifications.

**API Documentation:**
-  A postman collection of the API requests is available at https://documenter.getpostman.com/view/2815732/RztkN99o

**Postman Collection:**
- Postman collection for the API is available at
https://www.getpostman.com/collections/d73bfecae5fbd760e634

## Technology Stack
* Database - [MongoDB](https://www.mongodb.org/)
* ORM - [Mongoose](https://mongoosejs.com)
* Runtime - [Nodejs](https://nodejs.org/en/)
* App server - [Express](https://expressjs.com/)

### Installation
to install this project on your local system follow these steps -
- clone this repo: use `git clone https://github.com/avinashb98/notify-movies-server.git`
- change directory: `cd notify-movies-server`
- install npm modules: `npm install`
- create `.env` from `.env_sample`
- enter environment variable values in .env

### Running the API
* use command `npm start` to start the api
* using API testing tools like postman hit the endpoint `localhost:3000/api`
* for more details go the API docs
