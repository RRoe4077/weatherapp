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
		//console.log("Updating status");
		if(typeof this.state.weather !== 'undefined')
		{
			var w = this.state.weather;
			//Check all conditions for safe to fly
			if(w.windspeed < 25 && w.visibility > 1200 && w.temp_c < 35 && w.temp_c>5 && w.humidity < 75 && w.weatherid > 800){
				this.setState({
					statusBarColour:"#DAF7A6",
					statusText:"Safe to fly"
				},
					() => this.verifyState());
			}
			//windspeed handler
			else if(w.windspeed >= 25)
			{
				if(w.windspeed<50){
					this.setState({
						statusBarColour:"#FFC300",
						statusText:"Caution: High winds"
					},
						() => this.verifyState());
				}
				else{
					this.setState(
					{
						statusBarColour:"#F67E7E",
						statusText:"Not Safe To Fly"
					},
						() => this.verifyState());
				}
			}

			else if(w.visibility <= 1200){
				if(w.visibility>800){
					this.setState({
						statusBarColour:"#FFC300",
						statusText:"Caution: Low visibility"
					},
						() => this.verifyState());
				}
				else{
					this.setState(
					{
						statusBarColour:"#F67E7E",
						statusText:"Not Safe to Fly"
					},
						() => this.verifyState());
				}
			}

			else if(w.temp_c<=5){
				if(w.temp_c>0){
					this.setState({
						statusBarColour:"#FFC300",
						statusText:"Caution: Low temperature"
					},
						() => this.verifyState());
				}
				else{
					this.setState(
					{
						statusBarColour:"#F67E7E",
						statusText:"Not Safe to Fly"
					},
						() => this.verifyState());
				}
			}

			else if(w.temp_c>=35){
				if(w.temp_c<40){
					this.setState({
						statusBarColour:"#FFC300",
						statusText:"Caution: High temperature"
					},
						() => this.verifyState());
				}
				else{
					this.setState(
					{
						statusBarColour:"#F67E7E",
						statusText:"Not Safe to Fly"
					},
						() => this.verifyState());
				}
			}

			else if(w.temp_c<=5){
				if(w.temp_c>0){
					this.setState({
						statusBarColour:"#FFC300",
						statusText:"Caution: Low temperature"
					},
						() => this.verifyState());
				}
				else{
					this.setState(
					{
						statusBarColour:"#F67E7E",
						statusText:"Not Safe to Fly"
					},
						() => this.verifyState());
				}
			}

			else if(w.humidity>=75){
				if(w.humidity<80){
					this.setState({
						statusBarColour:"#FFC300",
						statusText:"Caution: High humidity"
					},
						() => this.verifyState());
				}
				else{
					this.setState(
					{
						statusBarColour:"#F67E7E",
						statusText:"Not Safe to Fly"
					},
						() => this.verifyState());
				}
			}

			else if(w.weatherid<=5){
				if(w.weatherid<750 && w.weatherid>700){
					this.setState({
						statusBarColour:"#FFC300",
						statusText:"Caution: Inclement weather"
					},
						() => this.verifyState());
				}
				else if(w.weatherid<800 && w.weatherid >750)
				{
					this.setState({
						statusBarColour:"#F67E7E",
						statusText:"Natural Disaster"
					},
						() => this.verifyState());
				}
				else{
					this.setState(
					{
						statusBarColour:"#C70039",
						statusText:"Not Safe to Fly: Precipitation"
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
		<div class="head">
            <div className={ style.container } style={ {backgroundColor: this.state.statusBarColour, borderColor: this.state.statusBarColour} }>
                <a id="status">{this.state.statusText}</a>

			
            </div>
	<div class="drone">
	<img src="../../../assets/icons/drone.png" alt="drone" width="150" height="150"/>
	</div>		
	</div>
			
		);
	}
}