import react from "react"
import {Bar} from 'react-chartjs-2';

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

    let north = new RegExp(/N[]{0,1}[0-9]{1,2}[A-Z]{0,1}/m);
    let nW = new RegExp(/NW{1,2}[0-9]{1,2}[A-Z]{0,1}/m);
    let sE = new RegExp(/[SE]{2,2}[0-9]{1,2}[A-Z]{0,1}/m)
    let sW = new RegExp(/[SW]{2,2}[0-9]{1,2}[A-Z]{0,1}/m);
    let east = new RegExp(/^[E]{1,1}[0-9]{1,2}[A-Z]{0,1}/m);
    let eC = new RegExp(/[EC]{2,2}[0-9]{1,2}[A-Z]{0,1}/m);
    let west = new RegExp(/^[W]{1,1}[0-9]{1,2}[A-Z]{0,1}/m);
    let wc = new RegExp(/WC[A-Z]{0,1}[0-9]{1,2}[A-Z]{0,1}/m);

  //console.log(data['features'][0]['properties']['Name'])

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
      console.log(area)
    }
    if(wc.test(area) === true ){
      counter.wc++
    }
    // const element = data['features'][i]['properties']['Name'];
  }

  postcodeArray.push(counter.north, counter.nW, counter.sE, counter.sW,counter.east,counter.eC, counter.west,counter.wc,0)
// console.log(postcodeArray)
  let graphData = {
    labels: ['North', 'North-West', 'South-East','South-West', 'East','East-Central-London', 'West','West-Central-London'],
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
          getElementsAtEvent= {e => {(console.log(e[0]['_model']['label']))
          e = e[0]['_model']['label']
          console.log(e)
          let divElement = document.createElement(e)
          console.log(divElement)
        }
          
        }
        />
        

          </div>
        )}
    </div>
  }

}