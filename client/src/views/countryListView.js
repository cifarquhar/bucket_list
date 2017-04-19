var CountryListView = function(selectElement){
  this.selectElement = selectElement
}

CountryListView.prototype = {

  render: function(countries){
    countries.forEach(function(country, index){
      var optionElement = document.createElement('option')
      optionElement.value = index
      optionElement.text = country.name
      this.selectElement.appendChild(optionElement)
    }.bind(this))
  }

}