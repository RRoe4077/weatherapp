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
		// button display state
		this.setState({ display: true });
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		const url = "http://api.wunderground.com/api/c78f1a13d2ca6971/conditions/q/UK/London.json";
		// $.ajax({
		// 	url: url,
		// 	dataType: "jsonp",
		// 	success : this.parseResponse,
		// 	error : function(req, err){ console.log('API call failed ' + err); }
		// })
		// // once the data grabbed, hide the button
		this.setState({ display: false });
		this.setState( {
			locate: "London",
			temp: "-3",
			cond: "loadsa snoe"
		});
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
					{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchWeatherData }/ > : null }
				</div>
				<Status />
			</div>
		);
	}

	parseResponse = (parsed_json) => {
		let location = parsed_json['current_observation']['display_location']['city'];
		let temp_c = parsed_json['current_observation']['temp_c'];
		let conditions = parsed_json['current_observation']['weather'];

		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			cond : conditions
		});
	}
}