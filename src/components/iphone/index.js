// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';

import WeatherComponent from '../weatherComponent';

import Geolocator from "../location";

import weatherkey from '../../weatherKey';

import FutureWeather from '../future_weather';

import moment from 'moment';


import "../../assets/icons/fontawesome-all";

export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
	}

	// the main render method for the iphone component
	render() {


		const conditionsIconSrc = `http://openweathermap.org/img/w/${this.state.icon}.png`;// display all weather data
		return (

			
			<div class={ style.container } style={ {backgroundColor: this.state.background} }>
				<WeatherComponent />
				
			</div>
		);
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

