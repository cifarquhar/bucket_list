var CountryDetailView = function(){
}

CountryDetailView.prototype = {

  render: function(country){
    var nameTag = document.querySelector('#name')
    nameTag.innerText = country.name
    var capitalCityTag = document.querySelector('#capital-city')
    capitalCityTag.innerText = country.capital
    var populationTag = document.querySelector('#population')
    populationTag.innerText = country.population
  }

}

module.exports = CountryDetailView;