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

import moment from 'moment';

export default class FutureWeather extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// button display state
		this.setState({ 
			display: true, 
			location: "London",
			weather: [],
			icon: "",
			background: "",
			searchLocation: ""
		});
	}

	// a call to fetch weather data via openweathermap
	fetchWeatherData = () => {
		// API URL with a structure of : 
		console.log(this.state.location)
		const url = `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.location}&units=metric&appid=965550e9d53af22e17426db9af51d7b7`;
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

	componentWillReceiveProps(nextProps) {
		if(this.props!=nextProps)
		{
			this.setState({
				location: nextProps.location
			});
			this.fetchWeatherData();
		}
	}
	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
        const weather = this.state.weather;
		const tempStyles = `${style.temperature} ${style.filled}`;
		// display all weather data
		return (
			<div class={ style.container } style={ {backgroundColor: this.state.background} }>
				<div class={ style.header }>
				{this.state.weather.map((day, index) => {
				const conditionsIconSrc = `http://openweathermap.org/img/w/${day.icon}.png`;
				return (
					<div class={ style.weather }>
						<div style="font-weight: bold">{ moment().add(`${ index+1 }`, "day").format('ddd') }</div>
						<span class={ tempStyles }>{ day.temp_c }°C</span>
						<div>{ day.windspeed } m/s</div>
						<div>{ day.condition } </div>
						<div><img src={conditionsIconSrc} alt='Icon depicting current day.'/></div>
					</div>
				);
				})}
				</div>
				<div class={ style.details } />
				<div class= { style_iphone.container } />
			</div>
		);
	}

	parseResponse = (parsed_json) => {
		let fiveday = parsed_json.list;
		let weather ="";
		let condition="";
		let temp_c = "";
		let weatherid="";
		let icon = "";
		let windspeed = "";
		let winddir ="";
		let daysArr = [];
		console.log(fiveday.length);
		console.log(fiveday[8].main.temp)
		fiveday.map((day, index) => {
			if (index % 8 === 0) {
				daysArr.push({
					weather: day.weather,
					condition: day.main,
					temp_c: day.main.temp,
					weatherid: day.id,
					icon: day.weather[0].icon,
					windspeed: day.wind.speed,
					winddir: day.wind.deg,
				});
			}
		});
		// set states for fields so they could be rendered later on
		this.setState({
			weather: daysArr,
			icon
		});
		console.log(this.state.temp_c)
	}
}