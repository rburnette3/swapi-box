export default class API {

  constructor(type) {
    this.type = type;
    this.bigArray = [];
  }

  actualFetch(pageNum) {
    return fetch(`https://swapi.co/api/${this.type}/?page=${pageNum}`)
      .then(result => result.json())
      .then(jsonResult => {
        if (jsonResult.next && false) {
          this.bigArray = [...this.bigArray, ...jsonResult.results]
          return this.actualFetch(pageNum + 1)
        } else {
          console.log('FIRST WUT:', jsonResult);
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
            return Promise.all(arrayOfSpeciesPromises)
              .then(result => { // start 3 // result is array of species
                // console.log('STUFFFF:', result);
                return result.map((species, i) => {
                  return Object.assign(
                    firstJoinResult[i],
                    {Species: species ? species.name : 'unknown '}
                  ) // end object.assign
                }) // end map
              }) // end 3
          }) // end 2
      } // ends poeple if statement
      else if (this.type === 'planets') {

        let arrayOfPlanetResidentPromises;
        let arrayOfResidentPromises;

        arrayOfPlanetResidentPromises = this.bigArray.map(item => {
          let residentLookupArray = item.residents;

          arrayOfResidentPromises = residentLookupArray.map(resident => {
            return fetch(resident)
              .then(result => result.json())
              .catch(err => console.log('Error with planet-resident lookup: ', err))
          })

          return Promise.all(arrayOfResidentPromises)
            .then(result => {
              return result.map(resident => {
                return resident.name
              }) // end map (inner)
            })

        }) // end map (outer)

        return Promise.all(arrayOfPlanetResidentPromises)
          .then(result => {
            return result.map((residents, i) => {
              return Object.assign(
                {Type: 'planets'},
                {Name: this.bigArray[i].name},
                {Terrain: this.bigArray[i].terrain},
                {Population: this.bigArray[i].population},
                {Climate: this.bigArray[i].climate},
                {Residents: residents}
              ) // end object.assign
            }) // end map
          })

      } // ends planets if statement
      else if (this.type === 'vehicles') {

        return new Promise((resolve, reject) => {
          let vehicleArray = this.bigArray.map(vehicle => {
            return Object.assign(
              {Type: 'vehicles'},
              {Name: vehicle.name},
              {Model: vehicle.model},
              {Class: vehicle.vehicle_class},
              {NumOfPassengers: vehicle.passengers},
            ) // end object.assign
          }) // end map
          resolve(vehicleArray)
        })

      } // ends vehicles if statement
    }) // end 0

  } // end function

} // end class
