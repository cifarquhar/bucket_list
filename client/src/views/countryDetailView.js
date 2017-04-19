var CountryDetailView = function(){
}

CountryDetailView.prototype = {

  render: function(country){
    var nameTag = document.querySelector('#name')
    nameTag.innerText = "Name: " + country.name
    var capitalCityTag = document.querySelector('#capital-city')
    capitalCityTag.innerText = "Capital City: " + country.capital
    var populationTag = document.querySelector('#population')
    populationTag.innerText = "Population: " + country.population
  }

}

module.exports = CountryDetailView;