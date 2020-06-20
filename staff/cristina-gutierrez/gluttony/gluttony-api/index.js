require("dotenv").config()
const MONGODB_URL = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@gluttony-stegt.gcp.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`
const { env: { PORT: port, SECRET } } = process

const express = require("express")
const app = express()
const router = express.Router()
app.use(express.json())

const { handleError, jwtPromised } = require("./helpers")
const { jwtVerifierExtractor } = require("./middlewares")
const verifyExtractJwt = jwtVerifierExtractor(SECRET, handleError)

const { 
  authenticateUser,
  registerUser,
  retrieveUser,
  findNearbyBars,
  findNearbyRestaurants
} = require("gluttony-server-logic")
const { mongoose } = require("gluttony-data")

mongoose.connect(MONGODB_URL)
  .then(() => {
    router.get("/users/auth", (req, res) => {
      const { query: { email, password } } = req
    
      try {
        authenticateUser(email, password)
          .then(userId => jwtPromised.sign({ sub: userId }, SECRET, { expiresIn: "1d" }))
          .then(token => res.send({ token }))
          .catch(error => handleError(error, res))
      } catch (error) {
        handleError(error, res)
      }
    });
    
    router.post("/users", (req, res) => {
      const { body: { id, name, surname, email, password } } = req
      
      try {
        registerUser(id, name, surname, email, password)
          .then(() => res.status(201).send())
          .catch(error => handleError(error, res))
      } catch (error) {
        handleError(error, res)
      }  
    });
    
    router.get("/users", verifyExtractJwt, (req, res) => {
      try {
        const { payload: { sub: userId } } = req
    
        retrieveUser(userId)
          .then(user => res.send(user))
          .catch(error => handleError(error, res))
      } catch (error) {
        handleError(error, res)
      }
    });

    router.get("/bars", (req, res) => {
      try {
        const { query: { latitude, longitude } } = req
    
        findNearbyBars(latitude, longitude)
          .then(coordinates => res.send({ coordinates }))
          .catch(error => handleError(error, res))
      } catch (error) {
        handleError(error, res)
      }
    })

    router.get("/restaurants", (req, res) => {
      try {
        const { query: { latitude, longitude } } = req
    
        findNearbyRestaurants(latitude, longitude)
          .then(coordinates => res.send({ coordinates }))
          .catch(error => handleError(error, res))
      } catch (error) {
        handleError(error, res)
      }
    })
    
    app.use("/api", router)
    
    app.listen(port, () => console.log(`Server running on port ${port}`));

    process.on('SIGINT', () => mongoose.disconnect())
  })
