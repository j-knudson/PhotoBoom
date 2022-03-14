//Routes.js File from Lecture 16 Slide 15

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'PhotoBoom'
})


const app = express();

