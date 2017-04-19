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

countryRouter.get("/:id",function(req,res){
  countryQuery.show(req.params.id, function(docs){
    res.json(docs)
  })
})

countryRouter.post("/",function(req,res){
  var countryToAdd = {
    name: req.body.name
  }
  countryQuery.add(countryToAdd,function(docs){
    res.json(docs)
  })
})

countryRouter.put("/:id",function(req,res){
  var newName = req.body.name
  countryQuery.update(req.params.id,newName,function(docs){
    res.json(docs)
  })
})
module.exports = countryRouter