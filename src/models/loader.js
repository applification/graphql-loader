var DataLoader = require('dataloader');
var axios = require('axios');

module.exports = function () {
  // ensure cached per request...
  return {
    film: Film(),
    character: Character(),
    planet: Planet(),
  };
};

function Film() {
  return new DataLoader(function (ids) {
    return axios.all(ids.map(id => {
      var url = Number.isInteger(id) ? `http://swapi.co/api/films/${id}/` : id;
      return axios.get(url).then(res => res.data);
    }));
  });
}

function Character() {
  return new DataLoader(function (ids) {
    return axios.all(ids.map(id => {
      var url = Number.isInteger(id) ? `http://swapi.co/api/people/${id}/` : id;
      return axios.get(url).then(res => res.data);
    }));
  });
}

function Planet() {
  return new DataLoader(function (ids) {
    return axios.all(ids.map(id => {
      var url = Number.isInteger(id) ? `http://swapi.co/api/planets/${id}/` : id;
      return axios.get(url).then(res => res.data);
    }));
  });
}

/*
var film = Film();
film.loadMany([1, 'http://swapi.co/api/films/3']).then(data => console.log(data));
*/