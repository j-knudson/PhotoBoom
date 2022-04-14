const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const mysql = require("mysql");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const port = 3000;

const cors = require('cors');
app.use(cors());


app.get("/users",async function(request,response){
    try{
        let conn = mysql.createConnection({host: "localhost", user: "root", password: "mysql", database: "PhotoBoomDB"});
// connect/open to given connection "conn"
        await conn.connect();




        // setting query statement
        let sql = "SELECT * FROM cookies";
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
        console.log("In /users .put");
        let conn = mysql.createConnection({host: "localhost", user: "root", password: "mysql", database: "PhotoBoomDB"});
        // connect/open to given connection "conn"
        await conn.connect();

        // -------------------------------user sign up backend functions -------------------------------------------
        let email = request.body.email;
        let pw = request.body.password;
        let fname = request.body.firstName;
        let lname = request.body.lastName;
        let DOB = request.body.dob;

        let sql = "INSERT INTO users(userEmail,userPassword,firstName,lastName,DOB) VALUES ('"
            + email + "','"
            + pw + "','"
            +fname+"','"
            +lname+"','"
            +DOB+"');";
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

app.put("/cookies",async function (request,response){
    try{
        console.log("Request received");
        let conn = mysql.createConnection({host: "localhost", user: "root", password: "mysql", database: "PhotoBoomDB"});
        // connect/open to given connection "conn"
        await conn.connect();
//----------------This is the backend functionality for the cookies ---------------------------------------
        let userEmail = request.body.user;
        let cookies = request.body.cArray;


        cookies.forEach(function(cookie){
            let sql = "REPLACE INTO cookies(cookieName,cookieValue,userID) VALUES ('"+cookie.name+"','"+cookie.value+"',(SELECT userID from users WHERE userEmail = '"+userEmail+"'));";
            console.log(sql);
            conn.query(sql, function (err, result) {
                if (err) console.log("Error occurred: " + err);
                else console.log("Record successfully updated");
            });
        })
        conn.end()
    } catch (error){
    console.log("Ran into error in /cookies path ", error)}
})



app.listen(port,()=> console.log("App listening on ",port));
