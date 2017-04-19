/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

var CountryList = __webpack_require__(1)
var CountryListView = __webpack_require__(2)
var CountryDetailView = __webpack_require__(3)
var DatabaseListView = __webpack_require__(326)

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

/***/ },

/***/ 1:
/***/ function(module, exports) {

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

/***/ },

/***/ 2:
/***/ function(module, exports) {

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

module.exports = CountryListView;

/***/ },

/***/ 3:
/***/ function(module, exports) {

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

/***/ },

/***/ 326:
/***/ function(module, exports) {

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

/***/ }

/******/ });
//# sourceMappingURL=bundle.js.map