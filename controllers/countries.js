var express = require("express")
var app = express()
var countryRouter = express.Router()

var CountryQuery = require("../db/countryQuery.js")
var countryQuery = new CountryQuery()


countryRouter.get("/",function(req,res){
  countryQuery.all(function(docs){
    res.json(docs)
  })
})

module.exports = countryRouter