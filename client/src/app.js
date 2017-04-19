var CountryList = require('./models/countryList')
var CountryListView = require('./views/countryListView')

var app = function(){

  var countryList = new CountryList("https://restcountries.eu/rest/v2/all")
  var countryListView = new CountryListView(document.querySelector('#country-selector'))

  console.log(countryList)

  countryList.getData(function(countries){
    console.log(countries)
    countryListView.render(countries)
  })

}

window.onload = app