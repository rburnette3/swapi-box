export default class API {

  constructor(type) {
    this.type = type;
    this.bigArray = [];
  }

  actualFetch(pageNum) {
    return fetch(`https://swapi.co/api/${this.type}/?page=${pageNum}`)
      .then(result => result.json())
      .then(jsonResult => {
        if (jsonResult.next) {
          // console.log('FIRST WUT:', jsonResult);
          this.bigArray = [...this.bigArray, ...jsonResult.results]
          return this.actualFetch(pageNum + 1)
        } else {
          this.bigArray = [...this.bigArray, ...jsonResult.results]
        }
    })
  }

  fetchDataFromAPI() {

    return this.actualFetch(1).then(result => { // start 0

      if (this.type === 'people') {

        let arrayOfHomeworldPromises;
        let arrayOfSpeciesPromises;

        arrayOfHomeworldPromises = this.bigArray.map(item => {
          return fetch(item.homeworld)
            .then(result => result.json())
            .catch(err => console.log('Error with homeworld lookup: ', err))
        })
        // console.log('how many homeworlds:', arrayOfHomeworldPromises.length);

        arrayOfSpeciesPromises = this.bigArray.map(item => {
          return fetch(item.species[0])
            .then(result => result.json())
            .catch(err => console.log('Error with species lookup: ', err))
        })
        // console.log('how many species:', arrayOfSpeciesPromises .length);

        return Promise.all(arrayOfHomeworldPromises)
          .then(result => { // start 1 // result is an array of the homeworlds
            // console.log('what is promise result', result);
            return result.map((homeworld, i) => {
              return Object.assign(
                {Type: 'people'},
                {Name: this.bigArray[i].name},
                {Homeworld: homeworld.name},
                {Population: homeworld.population}
              ) // end object.assign
            }) // end map
          }) // end 1
          .then(firstJoinResult => { // start 2 // result is array of people + homeworlds
            // console.log('result with Homeworld:', result);

            return Promise.all(arrayOfSpeciesPromises)
              .then(result => { // start 3 // result is array of species
                return result.map((species, i) => {
                  return Object.assign(
                    firstJoinResult[i],
                    {Species: species ? species.name : 'unknown '}
                  ) // end object.assign
                }) // end map
              }) // end 3
              // .then(result => {
              //   console.log('result with Homeworld and Species:', result);
              //   return result;
              // })
          }) // end 2
          // .then(result => {
          //   console.log('result with Homeworld and Species2222:', result);
          //   return result;
          // })
      } // ends poeple if statement
      else if (this.type === 'planets') {

        let arrayOfPlanetPromises;
        let arrayOfPlanetResidentPromises;

        arrayOfPlanetPromises = this.bigArray.map(item => {
          let residentLookupArray = item.residents;

          arrayOfPlanetResidentPromises = residentLookupArray.map(resident => {
            return fetch(resident)
              .then(result => result.json())
              .catch(err => console.log('Error with planet-resident lookup: ', err))
          })

          return Promise.all(arrayOfPlanetResidentPromises)
            .then(result => {
              return result.map((resident, i) => {
                return Object.assign(
                  {Type: 'planets'},
                  {Name: this.bigArray[i].name},
                  {Homeworld: homeworld.name},
                  {Population: homeworld.population}
                ) // end object.assign
              }) // end map
            })


        })
        // console.log('how many homeworlds:', arrayOfHomeworldPromises.length);


      } // ends planets if statement
      // return result;
    }) // end 0
    // .then(result => {
    //   console.log('final result:', result);
    //   return result;
 