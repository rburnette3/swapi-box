export default class API {

  constructor(type) {
    this.type = type;
  }

  fetchDataFromAPI() {
    return fetch(`https://swapi.co/api/${this.type}`)
      .then(result => result.json())
      .then(parsedResult => this.cleanData(parsedResult))
      .catch(error => console.log('ERROR FROM API'));

  }

  cleanData(parsedResult) {
    // console.log('DATA FROM API: ', parsedResult.results);
    return parsedResult.results;
  }

}
