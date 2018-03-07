// import preact
import { h, render, Component } from 'preact';

import style from './style';

import $ from 'jquery';

export default class Status extends Component{

	updateStatus() {
		var w = this.props.weather;
		if(w.visibility>0)
		{
			this.setState({
				displayContainer:"style.containerTest",
				statusText:"It worked"
			});
		}
	}
	
	componentDidMount() {
		this.updateStatus();
	}

	componentWillReceiveProps(nextProps) {
		if(this.props!=nextProps)
		{
			this.updateStatus();
		}
	}

//temp
//Wind speed
//Precipitation
//visibility
//Humidity

	render(){
		//console.log(this.props.weather);
		return (
            <div class={style.containerSafeToFly}>
                <h1>{this.state.statusText}</h1>
            </div>
		);
	}
}