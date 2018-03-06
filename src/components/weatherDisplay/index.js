import { h, render, Component } from 'preact';

import $ from 'jquery';

import style from './style';

import Status from '../status';

import FutureWeather from '../future_weather';

export default class weatherComponent extends Component{

	constructor(props){
			super(props);
			console.log("Run constructor");
			// temperature state
			this.state.units="metric";

			// button display state
			this.setState({ display: true, weather: {
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
			this.fetchLocation();
		}

// a call to fetch weather data via openweathermap
	fetchWeatherData = () => {
		console.log("Fetch Weather");
		// API URL with a structure of : 
		const url = `http://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.long}&units=${this.state.units}&appid=174eb67985ff52097d96a14736dc0014`;
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// // once the data grabbed, hide the button
		this.setState({ display: false });
	}

	fetchLocation(){
		console.log("Started");
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
			console.log("Location not found");
		}
	}
	
	componentDidMount(){
		this.fetchLocation();
	}



	render() {
		const weather = this.state.weather;
		const conditionsIconSrc = `http://openweathermap.org/img/w/${this.state.icon}.png`;
		// display all weather data
		return (
			<div class={ style.container } style={ {backgroundColor: this.state.background} }>
				<div class={ style.header }>
					<div class={ style.city }>{ weather.location }</div>
				
					<span>{ weather.temp_c }°C</span>
					<div class={ style.conditions }>Wind: { weather.windspeed } m/s</div>
					<div class={ style.conditions }>{ weather.condition } </div>
					<div class={ style.conditions }><img src={conditionsIconSrc} alt='Icon depicting current weather.'/></div>
					
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
		// set states for fields so they could be rendered later on
		this.setState({
			weather: {
				location,
				temp_c,
				condition,
				windspeed,
				description,
				weatherid
			},
			icon,
			background: weatherkey.findBackgroundById(weatherid)
		});

		//console.log(parsed_json);
	}
}