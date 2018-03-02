// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';

import Status from '../status';

export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		this.state.location="London";
		this.state.units="metric";
		// button display state
		this.setState({ display: true });
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : 
		const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.location},uk&units=${this.state.units}&appid=174eb67985ff52097d96a14736dc0014`;
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// // once the data grabbed, hide the button
		this.setState({ display: false });
	}

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		
		// display all weather data
		return (
			<div class={ style.container }>
				<div class={ style.header }>
					<div class={ style.city }>{ this.state.locate }</div>
				
					<span class={ tempStyles }>{ this.state.temp }</span>
					<div class={ style.conditions }>{ this.state.cond }</div>
				</div>
				<div class={ style.details }></div>
				<div class= { style_iphone.container }>
					{ this.state.display ? <Button class={ style_iphone.button } name={"Fetch Weather"} clickFunction={ this.fetchWeatherData }/ > : null }
				</div>
				<Status />
			</div>
		);
	}

	parseResponse = (parsed_json) => {
		console.log(JSON.stringify(parsed_json.name));
		let location = parsed_json.name;
		let temp_c = parsed_json.main.temp;
		let weather = parsed_json.weather;
		let condition = weather[0].description;
		let windspeed = parsed_json.wind.speed;
		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			cond : condition
		});
	}
}

// {
//     "coord":
//     {
//         "lon": -0.13,
//         "lat": 51.51
//     },
//     "weather":
//     [
//         {
//             "id": 511,
//             "main": "Rain",
//             "description": "freezing rain",
//             "icon": "13n"
//         },
//         {
//             "id": 601,
//             "main": "Snow",
//             "description": "snow",
//             "icon": "13n"
//         },
//         {
//             "id": 701,
//             "main": "Mist",
//             "description": "mist",
//             "icon": "50n"
//         },
//         {
//             "id": 721,
//             "main": "Haze",
//             "description": "haze",
//             "icon": "50n"
//         }
//     ],
//     "base": "stations",
//     "main":
//     {
//         "temp": 271.6,
//         "pressure": 993,
//         "humidity": 100,
//         "temp_min": 270.15,
//         "temp_max": 273.15
//     },
//     "visibility": 2200,
//     "wind":
//     {
//         "speed": 7.7,
//         "deg": 80
//     },
//     "clouds":
//     {
//         "all": 90
//     },
//     "dt": 1520018400,
//     "sys":
//     {
//         "type": 1,
//         "id": 5091,
//         "message": 0.0033,
//         "country": "GB",
//         "sunrise": 1519972921,
//         "sunset": 1520012630
//     },
//     "id": 2643743,
//     "name": "London",
//     "cod": 200
// }

