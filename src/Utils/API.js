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

    let keepGoing = true;
    let pageNum = 1;
    let fallback = 0;
    let finalDataSet = [];

    return this.actualFetch(1).then(result => { // start 0

      let arrayOfHomeworldPromises;
      let arrayOfSpeciesPromises;

      // if (this.type === 'people') {

        arrayOfHomeworldPromises = this.bigArray.map(item => {
          return fetch(item.homeworld)
            .then(result => result.json())
            .catch(err => console.log('Error with homeworld lookup: ', err))
        })
        console.log('how many homeworlds:', arrayOfHomeworldPromises.length);

        arrayOfSpeciesPromises = this.bigArray.map(item => {
          return fetch(item.species[0])
            .then(result => result.json())
            .catch(err => console.log('Error with species lookup: ', err))
        })
        console.log('how many species:', arrayOfSpeciesPromises .length);

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
//      // } // ends poeple if statement
      // return result;
    }) // end 0
    // .then(result => {
    //   console.log('final result:', result);
    //   return result;
    // })

    // console.log('WUT:', wut);
    //
    // while(keepGoing && fallback < 11) {
    //
    //
    //
    // fetch(`https://swapi.co/api/${this.type}/?page=${pageNum}`)
    //   .then(result => result.json())
    //   .then(resultJson => {
    //   }
    // )
    //
    // fetch(`https://swapi.co/api/${this.type}/?page=${pageNum}`)
    //   .then(result => result.json())
    //   .then(resultJson => {
    //     // console.log('finalDataSet:', finalDataSet);
    //     console.log('resultJson:', resultJson);
    //     // console.log('next page:', resultJson.next);
    //     finalDataSet = [...finalDataSet, ...resultJson.results];
    //     // if (!resultJson.next) {
    //     //   keepGoing = false;
    //     // } else {
    //     //   pageNum++;
    //     // }
    //     console.log('CURRENT DATA SET:', finalDataSet);
    //   })
    //   // .then(parsedResult => this.cleanData(parsedResult))
    //   // .catch(error => console.log('ERROR FROM API'));
    //   fallback++;
    // }
    // console.log('FINAL DATA SET: ', finalDataSet);
    // return finalDataSet;

  }

  cleanData(parsedResult) {
    // console.log('DATA FROM API: ', parsedResult.results);
    return parsedResult.results;
  }

}


//
//
// componentDidMount() {
//     fetch('http://localhost:3001/api/frontend-staff')
//     .then(res => res.json())
//     .then(data => this.fetchStaffData(data.bio))
//   }
//
//   fetchStaffData(data) {
//     const specificStaffData = data.map(person => {
//       return fetch(person.info)
//       .then(res => res.json())
//     })
//
//     return Promise.all(specificStaffData)
//     .then(res => {
//       return res.map((info, i) => {
//         return Object.assign(data[i], info)
//       })
//     })
//     .then(newData => {
//       this.setState({ staff: newData })
//     })
//   }
