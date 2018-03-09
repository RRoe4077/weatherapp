// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
import moment from 'moment';
// import the Button component
import Button from '../button';
import WeatherComponent from '../weatherComponent';
import Geolocator from "../location";
import weatherkey from '../../weatherKey';
import FutureWeather from '../future_weather';


import "../../assets/icons/fontawesome-all";

export default class Iphone extends Component {
	//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props) {
		super(props);
	}

	// the main render method for the iphone component
	render() {


		const conditionsIconSrc = `http://openweathermap.org/img/w/${this.state.icon}.png`;// display all weather data
		return (
			<div class={style.container} style={{ backgroundColor: this.state.background }}>
				<WeatherComponent />
				
			</div>
		);
	}
}
