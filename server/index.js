const express = require("express")
const app = express()
const mysql = require("mysql")
const generateAccessToken = require("./generateAccessToken")
const cors = require("cors")


require("dotenv").config()
const port = process.env.PORT || 3001;
const bcrypt = require("bcrypt")

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT
const db = mysql.createPool({
   connectionLimit: 100,
   host: DB_HOST,
   user: DB_USER,
   password: DB_PASSWORD,
   database: DB_DATABASE,
   port: DB_PORT
})



db.getConnection( (err, connection)=> {
   if (err) throw (err)
   console.log ("DB connected successful: " + connection.threadId)
})


app.listen(port, 
()=> console.log(`Server Started on port ${port}...`))


app.use(express.json())
app.use(cors());


//middleware to read req.body.<params>
//CREATE USER
app.post("/register", async (req,res) => {
const user = req.body.username;
const password = req.body.password;
const hashedPassword = await bcrypt.hash(password,10);
db.getConnection( async (err, connection) => {
 if (err) throw (err)
 const sqlSearch = "SELECT * FROM usertable WHERE user = ?"
 const search_query = mysql.format(sqlSearch,[user])
 const sqlInsert = "INSERT INTO usertable VALUES (0,?,?)"
 const insert_query = mysql.format(sqlInsert,[user, hashedPassword])
 // ? will be replaced by values
 // ?? will be replaced by string
 await connection.query (search_query, async (err, result) => {
  if (err) throw (err)
  console.log("------> Search Results")
  console.log(result.length)
  if (result.length != 0) {
   connection.release()
   console.log("------> User already exists")
   res.sendStatus(409) 
  } 
  else {
   await connection.query (insert_query, (err, result)=> {
   connection.release()
   if (err) throw (err)
   console.log ("--------> Created new User")
   console.log(result.insertId)
   res.sendStatus(201)
  })
 }
}) //end of connection.query()
}) //end of db.getConnection()
}) //end of app.post()


/// ## WITHOUT TOKENS login page

// app.post("/login", (req, res)=> {
//    const user = req.body.name
//    const password = req.body.password
//    db.getConnection ( async (err, connection)=> {
//     if (err) throw (err)
//     const sqlSearch = "Select * from usertable where user = ?"
//     const search_query = mysql.format(sqlSearch,[user])
//     await connection.query (search_query, async (err, result) => {
//      connection.release()
     
//      if (err) throw (err)
//      if (result.length == 0) {
//       console.log("--------> User does not exist")
//       res.sendStatus(404)
//      } 
//      else {
//         const hashedPassword = result[0].password
//         //get the hashedPassword from result
//        if (await bcrypt.compare(password, hashedPassword)) {
//        console.log("---------> Login Successful")
//        res.send(`${user} is logged in!`)
//        } 
//        else {
//        console.log("---------> Password Incorrect")
//        res.send("Password incorrect!")
//        } //end of bcrypt.compare()
//      }//end of User exists i.e. results.length==0
//     }) //end of connection.query()
//    }) //end of db.connection()
//    }) //end of app.post()


/// ## WITH TOKENS login page

//import the generateAccessToken function
//LOGIN (AUTHENTICATE USER, and return accessToken)
app.post("/login", (req, res)=> {
const user = req.body.username
const password = req.body.password
db.getConnection ( async (err, connection)=> {
if (err) throw (err)
 const sqlSearch = "Select * from usertable where user = ?"
 const search_query = mysql.format(sqlSearch,[user])
await connection.query (search_query, async (err, result) => {
connection.release()
  
  if (err) throw (err)
if (result.length == 0) {
   console.log("--------> User does not exist")
   res.sendStatus(404)
  } 
  else {
   const hashedPassword = result[0].password
   //get the hashedPassword from result
if (await bcrypt.compare(password, hashedPassword)) {
    console.log("---------> Login Successful")
    console.log("---------> Generating accessToken")
    const token = generateAccessToken({user: user})   
    console.log(token)
    res.json({accessToken: token})
   } else {
    res.send("Password incorrect!")
   } //end of Password incorrect
}//end of User exists
}) //end of connection.query()
}) //end of db.connection()
}) //end of app.post()

// router.get('/register', (req,res)=>{
//    res.render('register');
// })

