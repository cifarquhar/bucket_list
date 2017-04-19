var CountryList = require('./models/countryList')
var CountryListView = require('./views/countryListView')
var CountryDetailView = require('./views/countryDetailView')

var app = function(){

  var countryList = new CountryList("https://restcountries.eu/rest/v2/all")
  var countryListView = new CountryListView(document.querySelector('#country-selector'))
  var countryDetailView = new CountryDetailView()

  countryList.getData(function(countries){
    countryListView.render(countries)
    countryListView.selectElement.addEventListener('change', function(){
      countryDetailView.render(countries[this.value])
    })
  })

}

window.onload = app