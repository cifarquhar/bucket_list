var CountryList = function(url){
  this.url = url
  this.countries = []
}

CountryList.prototype = {
  getData: function(callback){
    var request = new XMLHttpRequest()
    request.open("GET",this.url)
    request.onload = function(){
      if (request.status === 200){
        var jsonString = request.responseText
        this.countries = JSON.parse(jsonString)
        callback(this.countries)
      }
    }.bind(this)
    request.send()
  },

  addData: function(newCountry,callback){
    var request = new XMLHttpRequest()

    console.log(request)
    var payload = newCountry
    console.log(payload)
    request.open("POST","http://localhost:3000/api/countries")
    request.setRequestHeader("Content-Type", "application/json")
    request.onload = callback
    
    request.send(JSON.stringify(payload))



  }
}

module.exports = CountryList;