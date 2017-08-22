export default class API {

  constructor(type) {
    this.type = type;
  }

  fetchDataFromAPI() {
    fetch(``)
      .then(result => result.json())
      .then(parsedResult => cleanData(parsedResult))
      .catch(error => console.log('ERROR FROM API'));

  }

}
