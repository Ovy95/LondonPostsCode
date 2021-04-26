import react from "react"
import {Bar} from 'react-chartjs-2';

let graphData = {
  labels: ['North', 'South', 'East', 'West'],
  datasets: [{
    label: '# PostCodes in the area Direction',
    data: [10,2,3,5,0],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ],
    borderWidth: 1
  }]
}

export default class Graph extends react.Component{



  state = {
    loading: true,
    dataLoaded: null
  }


  async componentDidMount() {
    let postcodeArray = []
    const url = ('https://raw.githubusercontent.com/sjwhitworth/london_geojson/master/london_postcodes.json')
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)

    let north = new RegExp(/N[A-Z]{0,1}[0-9]{1,2}[A-Z]{0,1}/g);
    let nW = new RegExp(/NW{1,2}[0-9]{1,2}[A-Z]{0,1}/g);
    let sE = new RegExp(/SE{1,2}[0-9]{1,2}[A-Z]{0,1}/g)
    let sW = new RegExp(/SW{1,2}[0-9]{1,2}[A-Z]{0,1}/g);
    let east = new RegExp(/E[A-Z]{0,1}[0-9]{1,2}[A-Z]{0,1}/g);
    let eC = new RegExp(/EC{1,2}[0-9]{1,2}[A-Z]{0,1}/g);
    let west = new RegExp(/W[A-Z]{0,1}[0-9]{1,2}[A-Z]{0,1}/g);
    let wc = new RegExp(/WC[A-Z]{0,1}[0-9]{1,2}[A-Z]{0,1}/g);


  console.log(data['features'][0]['properties']['Name'])
  let counter = {north:0,nW:0,sE:0,sW:0,east:0,eC:0,west:0,wc:0}
                              // 177 
  for (let index = 0; index < data['features'].length; index++) {
    let area = data['features'][index]['properties']['Name']

    if(north.test(area) === true ){
      counter.north++
    }
    if(nW.test(area) === true ){
      counter.nW++
    }
    if(sE.test(area) === true ){
      counter.sE++
    }
    if(sW.test(area) === true ){
      counter.sW++
    }
    if(east.test(area) === true ){
        counter.east++
    }
    if(eC.test(area) === true ){
      counter.eC++
    }
    if(west.test(area) === true ){
      counter.west++
    }
    if(wc.test(area) === true ){
      counter.wc++
    }
    // const element = data['features'][i]['properties']['Name'];
  }
  postcodeArray.push(counter.north, counter.nW, counter.sE, counter.sW,counter.east,counter.eC, counter.west,counter.wc,0)
console.log(postcodeArray)
  let graphData = {
    labels: ['North', 'North-West', 'South-East','South-West', 'East','East Central London', 'West','West Central London'],
    datasets: [{
      label: '# PostCodes in the area Direction',
      data: postcodeArray,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(99, 255, 0, 0.2)',
        'rgba(255, 0, 207, .2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(99, 255, 0, 1)',
        'rgba(255, 0, 207, 1)'
      ],
      borderWidth: 3
    }]
  }

return this.setState({ dataLoaded: graphData, loading:false })
    
   
  }


  render() {
    return <div>
        {this.state.loading || !this.state.dataLoaded ?(
          <div>loading...</div>
        ) : (<div>
          <h1>Postcode Data</h1>

            <Bar
          data={this.state.dataLoaded}
          width={800}
          height={200}
          options={{
            maintainAspectRatio: false
          }}
        />
          </div>
        )}
    </div>
  }

}