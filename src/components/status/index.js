// import preact
import { h, render, Component } from 'preact';

import style from './style';

export default class Status extends Component{

	constructor(props)
	{
		super(props);
		this.state.statusText = "NO DATA";
		this.state.safe = false;
		this.state.statusBarColour = '#000';
	}

	updateStatus() {
		console.log("Updating status");

		if(typeof this.state.weather !== 'undefined')
		{
			var w = this.state.weather;
			console.log(this.state.weather.visibility);
			//Check all conditions for safe to fly
			if(w.windspeed < 15 && w.visibility > 1.2 && w.temp_c < 35 && w.temp_c>5 && w.humidity < 75 && w.weatherid > 800){
				this.setState({
					statusBarColour:"#1E1",
					statusText:"Safe to fly"
				},
					() => this.verifyState());
			}
			//windspeed handler
			else if(w.windspeed >= 15)
			{
				if(w.windspeed<20){
					this.setState({
						statusBarColour:"#EA0",
						statusText:"Caution: High winds"
					},
						() => this.verifyState());
				}
				else{
					this.setState(
					{
						statusBarColour:"#F00",
						statusText:"NOT SAFE TO FLY: Winds"
					},
						() => this.verifyState());
				}
			}

			else if(w.visibility <= 1.2){
				if(w.visibility>0.8){
					this.setState({
						statusBarColour:"#EA0",
						statusText:"Caution: Low visibility"
					},
						() => this.verifyState());
				}
				else{
					this.setState(
					{
						statusBarColour:"#F00",
						statusText:"NOT SAFE TO FLY: Visibility"
					},
						() => this.verifyState());
				}
			}

			else if(w.temp_c<=5){
				if(w.temp_c>0){
					this.setState({
						statusBarColour:"#EA0",
						statusText:"Caution: Low temperature"
					},
						() => this.verifyState());
				}
				else{
					this.setState(
					{
						statusBarColour:"#F00",
						statusText:"NOT SAFE TO FLY: low temp"
					},
						() => this.verifyState());
				}
			}

			else if(w.temp_c>=35){
				if(w.temp_c<40){
					this.setState({
						statusBarColour:"#EA0",
						statusText:"Caution: High temperature"
					},
						() => this.verifyState());
				}
				else{
					this.setState(
					{
						statusBarColour:"#F00",
						statusText:"NOT SAFE TO FLY: High temp"
					},
						() => this.verifyState());
				}
			}

			else if(w.humidity>=75){
				if(w.humidity<80){
					this.setState({
						statusBarColour:"#EA0",
						statusText:"Caution: High humidity"
					},
						() => this.verifyState());
				}
				else{
					this.setState(
					{
						statusBarColour:"#F00",
						statusText:"NOT SAFE TO FLY: Humidity"
					},
						() => this.verifyState());
				}
			}

			else if(w.weatherid<=5){
				if(w.weatherid<750 && w.weatherid>700){
					this.setState({
						statusBarColour:"#EA0",
						statusText:"Caution: Inclement weather"
					},
						() => this.verifyState());
				}
				else if(w.weatherid<800 && w.weatherid >750)
				{
					this.setState({
						statusBarColour:"#F00",
						statusText:"NATURAL DISASTER"
					},
						() => this.verifyState());
				}
				else{
					this.setState(
					{
						statusBarColour:"#F00",
						statusText:"NOT SAFE TO FLY: Precipitation"
					},
						() => this.verifyState());
				}
			}
		}
	}

	verifyState() {
		console.log("Current Status");
		console.log(this.state.statusText);
	}
	
	componentDidMount() {
		this.updateStatus();
	}

	componentWillReceiveProps(nextProps) {
		if(this.props!=nextProps)
		{
			this.setState({
				weather:nextProps.weather
			});
			this.updateStatus();
		}
	}

//temp
//Wind speed
//Precipitation
//visibility
//Humidity

	render(){
		//this.verifyState();
		return (
            <div className={ style.container } style={ {backgroundColor: this.state.statusBarColour, borderColor: this.state.statusBarColour} }>
                <h1>{this.state.statusText}</h1>
            </div>
		);
	}
}