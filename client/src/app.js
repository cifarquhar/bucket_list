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
    // button.addEventListener('click', function(){
    //   // console.log(this)
    //   // console.log(countryList.countries[0])
    //   // console.log(countries[this.value])
    //   countries[this.value].addData()
    // })
  })

  databaseListView.makeRequest(function(){
    databaseListView.render()
  })
  

}

window.onload = app