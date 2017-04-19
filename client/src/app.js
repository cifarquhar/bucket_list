var CountryList = require('./models/countryList')
var CountryListView = require('./views/countryListView')
var CountryDetailView = require('./views/countryDetailView')
var DatabaseListView = require('./views/databaseListView')

var app = function(){

  var countryList = new CountryList("https://restcountries.eu/rest/v2/all")
  var countryListView = new CountryListView(document.querySelector('#country-selector'))
  var countryDetailView = new CountryDetailView()
  var button = document.querySelector('#button')
  var databaseListView = new DatabaseListView(document.querySelector('#database-list'))

  countryList.getData(function(countries){
    countryListView.render(countries)
    countryDetailView.render(countries[0])
    countryListView.selectElement.addEventListener('change', function(){
      countryDetailView.render(countries[this.value])
    })
    button.addEventListener('click', function(){
      // console.log(countryListView.selectElement.value)
      var newIndex = countryListView.selectElement.value
      var newCountry = countries[newIndex]
      // console.log(newCountry)
      countryList.addData(newCountry,function(){
        databaseListView.makeRequest(function(){
            var countries = JSON.parse(this.responseText)
            databaseListView.render(countries)
          })
      })
    })
  })

  databaseListView.makeRequest(function(){
    var countries = JSON.parse(this.responseText)
    databaseListView.render(countries)
  })
  

}

window.onload = app