export default class API {

  constructor(type) {
    this.type = type;
    this.bigArray = [];
  }

  actualFetch(pageNum) {
    fetch(`https://swapi.co/api/${this.type}/?page=${pageNum}`)
      .then(result => result.json())
      .then(jsonResult => {
        if (jsonResult.next) {
          console.log('FIRST WUT:', jsonResult);
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

    this.actualFetch(1)
    console.log('WUT:', wut);
    console.log('big array:', this.bigArray);
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
