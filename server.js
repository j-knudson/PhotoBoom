const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const mysql = require("mysql");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const port = 3000;




app.get("/users",async function(request,response){
    try{
        let conn = mysql.createConnection({host: "localhost", user: "root", password: "mysql", database: "PhotoBoomDB"});
// connect/open to given connection "conn"
        await conn.connect();




        // setting query statement
        let sql = "SELECT * FROM users";
        // do query
        await conn.query(sql,function(err,result){
            if (err) {
                response.send(err);

            }
            response.send(result);
        })
        //always close connection at end
        conn.end();
    } catch (error){
        response.send("Ran into error ", error);
        console.log("Ran into error in / path",error);
    }
})

app.post("/users",async function(request,response){
    try{
        console.log(request.body);
        //response.send("This is the name: "+request.body.name+"This is the age: "+request.body.age);
        response.json({
            name: request.body.name,
            age: request.body.age,
        })

    } catch (error){
        response.status(500).send("Ran into error ", error);
        console.log("Ran into error in / path",error);
    }

})

app.put("/users",async function (request,response){
    try {
        let conn = mysql.createConnection({host: "localhost", user: "root", password: "mysql", database: "PhotoBoomDB"});
        // connect/open to given connection "conn"
        await conn.connect();
        let email = request.body.email;
        let pw = request.body.password;

        let sql = "INSERT INTO users(userEmail,userPassword) VALUES ('" + email + "','" + pw + "');";
        await conn.query(sql, function (err, result) {
            if (err) {
                response.send(err);
                return "ERROR";
            } else {
                return "SUCCESS";
            }
        })
        conn.end();
    } catch (error){
        response.send("Ran into error ", error);
        console.log("Ran into error in /users path ", error)
    }


})


app.listen(port,()=> console.log("App listening on ",port));
