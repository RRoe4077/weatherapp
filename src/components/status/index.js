// import preact
import { h, render, Component } from 'preact';

import style from './style';

import $ from 'jquery';

export default class Status extends Component{

	constructor(props)
	{
		super(props);
		this.state.statusText = "NO DATA";
		this.state.safe = true;
		this.state.statusBarColour = '#0F0';
	}

	updateStatus() {
		console.log("Running");
		if(this.props.weather.windspeed>0)
		{
			this.setState({
				statusBarColour:"#000",
				statusText:"It worked"
			},
				() => this.verifyState());
		}
	}

	verifyState() {
		console.log("Verify State");
		console.log(this.state.statusText);
	}
	
	componentDidMount() {
		this.updateStatus();
	}

	componentWillReceiveProps(nextProps) {
		if(this.props!=nextProps)
		{
			this.props = nextProps;
		}
	}

//temp
//Wind speed
//Precipitation
//visibility
//Humidity

	render(){
		return (
            <div className={ style.container } style={ {backgroundColor: this.state.statusBarColour, borderColor: this.state.statusBarColour} }>
                <h1>{this.state.statusText}</h1>
            </div>
		);
	}
}