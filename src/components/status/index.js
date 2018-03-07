// import preact
import { h, render, Component } from 'preact';

import style from './style';

import $ from 'jquery';

export default class Status extends Component{

	constructor(props)
	{
		super(props);
		this.state.statusText = "Default";
		this.state.safe = true;
		this.state.statusBarColour = '#0F0';
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
		console.log(this.state.statusText);
		return (
            <div className={ style.container } style={ {backgroundColor: this.state.statusBarColour, borderColor: this.state.statusBarColour} }>
                <h1>{this.state.statusText}</h1>
            </div>
		);
	}
}