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


app.put("/users",async function (request,response){
    try {
        let conn = mysql.createConnection({host: "localhost", user: "root", password: "mysql", database: "PhotoBoomDB"});
        // connect/open to given connection "conn"
        await conn.connect();

        // -------------------------------user sign up backend functions -------------------------------------------
        let email = request.body.email;
        let pw = request.body.password;

        let sql = "INSERT INTO users(userEmail,userPassword) VALUES ('" + email + "','" + pw + "');";
        await conn.query(sql, function (err, result) {
            if (err) {
                if(err.errno == 1062){
                    response.send("DUPEMAIL");}
                else{
                    response.send("ERROR");
                }
            } else {
                response.send("SUCCESS");}
        })
        conn.end();

        //--------------------------------end of user sign up backend functions-------------------------------------
    } catch (error){
        response.send("Ran into error ", error);
        console.log("Ran into error in /users path ", error)
    }


})

app.post("/users", async function (request, response){
    try{
        let conn = mysql.createConnection({host: "localhost", user: "root", password: "mysql", database: "PhotoBoomDB"});
        // connect/open to given connection "conn"
        await conn.connect();
//----------------This is the backend functionality for the login ---------------------------------------
        let email = request.body.email;
        let pw = request.body.password;

        let sql = "SELECT userEmail,userPassword FROM users WHERE userEmail = '"+email+"';";
        console.log(sql);
        await conn.query(sql, function (err, result) {
            if (err) {
                response.send("ERROR");
            } else if (result.length === 0){
                console.log("No records found");
                response.send("DNE");
            }
            else {
                if (pw === result[0].userPassword){
                    console.log(result);
                    console.log(result[0].userPassword);
                    response.send("SUCCESS");}
                else{
                    response.send("BADPW");
            }}
        });
        conn.end()
    }catch (error){
        response.send("Ran into error ", error);
        console.log("Ran into error in /users path ", error)
    }
    //------------------------------------end of backend login functionality----------------------------------------
});

app.listen(port,()=> console.log("App listening on ",port));
