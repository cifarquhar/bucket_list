var DatabaseListView = function(listElement){
  this.listElement = listElement
}

DatabaseListView.prototype = {

  makeRequest: function(callback){
    var request = new XMLHttpRequest()
    request.open("GET", "http://localhost:3000/api/countries")
    request.onload = callback
    request.send()
  },

  render: function(countries){
    while (this.listElement.hasChildNodes()) {
      this.listElement.removeChild(this.listElement.lastChild);
    }
    countries.forEach(function(country){
      var li = document.createElement('li')
      li.innerText = country.name
      this.listElement.appendChild(li)
    }.bind(this))
  }

}

module.exports = DatabaseListView