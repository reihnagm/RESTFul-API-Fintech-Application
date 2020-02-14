RESTful API for Bank-In fintech application, this project for testing not using for real application
or if you find usefull feature, feel free to use.  

---
## Prerequiste
- Node.js - Download and Install [Node.js](https://nodejs.org/en/)
- Nodemon - Download and Install [Nodemon](https://nodemon.io/)
- Postman - Download and Install [Postman](https://www.getpostman.com/)
---


## Installation
### Clone
```bash
$ git clone https://github.com/reihnagm/RESTFul-API-Fintech-Application.git
$ cd RESTFul-API-Fintech-Application
$ npm install
```

### Create Environment Variable
```bash
$ cp .env.example .env
$ nano .env
```

---
### Start Development Server
```bash
$ npm run start
```
---

### ENDPOINT
GET api/v1/transactions  

<ul>  
  <li> Response </li>  
</ul>  

```
    {

      "Transaction": "Top Up",
      "Code": "TOP140220146",
      "Date": "2020-02-14T15:54:38.000Z",
      "Amount": "+ Rp10,000",
      "Recipient": "089670558381"
       
    }
```
POST api/v1/transactions  

<ul>  
  <li> Request Body </li>  
</ul>  

<ol>  
    <li>transactions (ex Top Up)</li>  
    <li>amount (ex 10000)</li>  
    <li>recipient (ex 089670558381)</li>  
</ol>

Transaction |  
------------ |  
Top Up |  
Transfer P2P (Out) |  
Transfer Fee |   
Transfer P2P (In) |   

### HOW TO USE
Import SQL "db.sql" to your database and running server  
You can test API via Postman or any similiar app.  
If you want to see relation of table, I attached file diagram database, name as "db-schema.svg".