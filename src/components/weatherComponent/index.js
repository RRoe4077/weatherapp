import { h, render, Component } from 'preact';

import $ from 'jquery';

import style from './style';

import Status from '../status';

import FutureWeather from '../future_weather';

import style_iphone from '../button/style_iphone';

import weatherkey from '../../weatherKey';

import moment from 'moment';

import "../../assets/icons/fontawesome-all";

import ReactAnimatedWeather from 'react-animated-weather';



export default class weatherComponent extends Component{

	constructor(props){
			super(props);
			// temperature state
			this.state.units="metric";
			// button display state
			this.setState({
				weather: {
					location: "No Location Found",
					temp_c:"",
					condition:"",
					windspeed:"",
					description:"",
					weatherid:0,

				},
				icon: "",
				background: "",
				lat: "INIT",
				long: "INIT"
			});
			console.log("Constructor run");
		}

	fetchLocation(){
		console.log("Fetch location Started");
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				this.setState({
					lat: position.coords.latitude,
					long: position.coords.longitude
				},
				 () => this.fetchWeatherData());
			});
		}
		else{
			this.setState({
				lat: "NULL",
				long: "NULL",
			},
				 () => this.fetchWeatherData());
			console.warn("Location not found");
		}
	}

	// a call to fetch weather data via openweathermap
	fetchWeatherData = () => {
		console.log("Fetch weather started");
		// API URL with a structure of : 
		const url = `http://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.long}&units=${this.state.units}&appid=174eb67985ff52097d96a14736dc0014`;
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		console.log("Finished");
	}

	componentDidMount(){
		console.log("ComponentDidMount called");
		this.fetchLocation();
	}

	render() {
		const weather = this.state.weather;
		const conditionsIconSrc = `http://openweathermap.org/img/w/${this.state.icon}.png`;
		// display all weather data
		return (
			
	
			<div class={ style.container } style={ {backgroundColor: this.state.background} }>
				<div class={ style.header }>
					<div class={ style.city }><i class="far fa-compass fa-xs" ></i> { weather.location }</div>
					<div class={style.temperature}>{ weather.temp_c }°C</div>
					<div class={ style.conditions }>Wind: { weather.windspeed } m/s</div>
					<div class={ style.conditions }>{ weather.condition } </div>
					<div class={ style.conditions }><img src={conditionsIconSrc} alt='Icon depicting current weather.'/></div>
				</div>

				<div class={style.row}> 
					<div class={style.suncolumn}>{weather.sunrise}</div>
					<div class={style.suncolumn}> {weather.sunset}</div>
				</div>
				<div class={ style.details }></div>
				<div class= { style_iphone.container }>
					
				</div>
				<Status />
				<FutureWeather />
			</div>
		);
	}

	parseResponse = (parsed_json) => {
		//console.log(JSON.stringify(parsed_json));
		let location = parsed_json.name;
		let temp_c = parsed_json.main.temp;
		let weather = parsed_json.weather;
		let condition = weather[0].main;
		let description = weather[0].description;
		let weatherid = weather[0].id;
		let icon = weather[0].icon;
		let windspeed = parsed_json.wind.speed;
		let winddir = parsed_json.wind.deg;
		let sunrise = moment.unix(parsed_json.sys.sunrise).format('LT');
		let sunset = moment.unix(parsed_json.sys.sunset).format('LT');
		// set states for fields so they could be rendered later on
		this.setState({
			weather: {
				location,
				temp_c,
				condition,
				windspeed,
				description,
				weatherid,
				sunrise,
				sunset
			},
			icon,
			background: weatherkey.findBackgroundById(weatherid)
		});
		console.log(parsed_json);
	}
}