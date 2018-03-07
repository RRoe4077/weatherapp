// import preact
import { h, render, Component } from 'preact';

import style from './style';

import $ from 'jquery';

export default class Status extends Component{

	constructor(props)
	{
		super(props);
		this.state.statusText = "Default";
		this.state.displayContainer = "style.containerTest";
	}

	updateStatus() {
		var w = this.props.weather;
		console.log("Running");
		if(w.visibility>0)
		{
			this.setState({
				displayContainer:"style.containerNoFly",
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
		console.log(this.state.displayContainer);
		return (
            <div className={this.state.displayContainer}>
                <p>{this.state.statusText}</p>
            </div>
		);
	}
}