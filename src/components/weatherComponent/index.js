import { h, render, Component } from 'preact';

import $ from 'jquery';

import style from './style';

import Status from '../status';

import FutureWeather from '../future_weather';

import style_iphone from '../button/style_iphone';

import weatherkey from '../../weatherKey';

import moment from 'moment';

export default class weatherComponent extends Component {

	constructor(props) {
		super(props);
		// button display state
		this.state = {
			weather: {
				location: "No Location Found",
				temp_c: "0",
				condition: "Not Found",
				windspeed: 0,
				description: "",
				weatherid: 0,
			},
			icon: "",
			background: "",
			lat: "INIT",
			long: "INIT",
			value: ''
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		console.log("Fetch weather started");
		this.fetchWeatherData(`q=${event.target.value}`);
	}

	fetchLocation() {
		console.log("Fetch location Started");
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				this.setState({
					lat: position.coords.latitude,
					long: position.coords.longitude
				},
					() => this.fetchWeatherData());
			});
		}
		else {
			this.setState({
				lat: "NULL",
				long: "NULL",
			},
				() => this.fetchWeatherData());
			console.warn("Location not found");
		}
	}

	// a call to fetch weather data via openweathermap
	fetchWeatherData = (search = `lat=${this.state.lat}&lon=${this.state.long}`) => {
		console.log(this.state.units);
		// API URL with a structure of : 
		const url = `http://api.openweathermap.org/data/2.5/weather?${search}&units=metric&appid=174eb67985ff52097d96a14736dc0014`;
		$.ajax({
			url: url,
			dataType: "jsonp",
			success: this.parseResponse,
			error: function (req, err) { console.log('API call failed ' + err); }
		})
		//console.log("Finished");
	}

	componentDidMount() {
		console.log("ComponentDidMount called");
		this.fetchLocation();
	}

	render() {
		const weather = this.state.weather;
		const conditionsIconSrc = `http://openweathermap.org/img/w/${this.state.icon}.png`;
		// display all weather data
		return (
			<div>
				<nav className="navbar navbar-dark bg-dark justify-content-between">
					<a className="navbar-brand">DroneSafe</a>
					<form className="form-inline">
						<input className="form-control mr-sm-6" type="search" placeholder="Search Location" aria-label="Search" value={this.state.value} onChange={this.handleChange} />
					</form>
				</nav>
			
		<div className={style.container} style={{ backgroundColor: this.state.background }}>
			
		
				<div className={style.header}>
					<div class={ style.city }> <i class="fas fa-map-marker-alt"></i> { weather.location }  </div>
					<div class={style.temperature}><i class="fas fa-thermometer-full"></i> { weather.temp_c }°C </div>
					<div class={ style.conditions }><i class="fas fa-flag"></i> Wind: { weather.windspeed } m/s</div>
					<div class={ style.conditions }><i class="fas fa-clipboard"></i> { weather.condition } </div>
	
				</div>	

				
					<div class={style.img }><img src={conditionsIconSrc} alt='Icon depicting current weather.' weight="50"  height="80" /></div>

				<div class={style.row}>
					<div class={style.suncolumn}>{weather.sunrise} <i class="fas fa-arrow-up"></i></div>
					<div class={style.suncolumn}>{weather.sunset} <i class="fas fa-arrow-down"></i></div>
				</div>


					<div className={style.details}></div>
					<div className={style_iphone.container}>

			</div>
					<Status weather={this.state.weather}/>
					<FutureWeather />
			</div>
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
		let visibility = (parsed_json.visibility) / 1000;
		let humidity = parsed_json.main.humidity;
		// set states for fields so they could be rendered later on
		this.setState({
			weather: {
				location,
				temp_c,
				condition,
				windspeed,
				description,
				weatherid,
				visibility,
				humidity,
				sunrise,
				sunset
			},
			icon,
			background: weatherkey.findBackgroundById(weatherid),
		});
		//console.log(parsed_json);
	}
}