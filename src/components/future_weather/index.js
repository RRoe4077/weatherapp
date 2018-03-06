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

import Geolocator from "../location";

import weatherkey from '../../weatherKey';

export default class FutureWeather extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.units="metric";
	
		// button display state
		this.setState({ display: true, weather: {
			location: "London",
			temp_c:"",
			condition:"",
			windspeed:"",
			description:"",
			weatherid:0,
		},
			icon: "",
			background: ""
		});
	}

	// a call to fetch weather data via openweathermap
	fetchWeatherData = () => {
		// API URL with a structure of : 
		const url = `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.weather.location},uk&units=${this.state.units}&cnt=40&appid=965550e9d53af22e17426db9af51d7b7`;
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// // once the data grabbed, hide the button
		this.setState({ display: false });
	}
	componentDidMount = () => {
		this.fetchWeatherData();
	}
	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
        const weather = this.state.weather;
        const tempStyles = `${style.temperature} ${style.filled}`;
		const conditionsIconSrc = `http://openweathermap.org/img/w/${this.state.icon}.png`;
		// display all weather data
		return (
			<div class={ style.container } style={ {backgroundColor: this.state.background} }>
				<div class={ style.header }>
					{/* <div class={ style.city }>{ weather.location }</div> */}
				
					<span class={ tempStyles }>{ weather.temp_c }°C</span>
					<div>{ weather.windspeed } m/s</div>
					<div>{ weather.condition } </div>
					<div><img src={conditionsIconSrc} alt='Icon depicting current weather.'/></div>
					
				</div>
				<div class={ style.details }></div>
				<div class= { style_iphone.container }>
					
				</div>
			</div>
		);
	}

	parseResponse = (parsed_json) => {
        let fiveday = parsed_json.list;
        fiveday.forEach((day, index) => {
            console.log(day);
        });
        let weather = fiveday[1].weather;
        let condition = fiveday[1].main;
        let temp_c = condition.temp;
		let weatherid = weather[0].id;
		let icon = weather[0].icon;
        let windspeed = fiveday[1].wind.speed;
        let winddir = fiveday[1].wind.deg;
		// set states for fields so they could be rendered later on
		this.setState({
			weather: {
				temp_c,
				condition,
				windspeed,
                weatherid,
                winddir
			},
			icon
		});

		//console.log(parsed_json);
	}
}