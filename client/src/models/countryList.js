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
  }
}