// import preact
import { h, render, Component } from 'preact';

import style from './style';

export default class Geolocator extends Component{
	constructor(props){
		super(props);
		this.state = {
			lat: "Latitude",
			long: "Longitude",
		};
	}

	fetchLocation(){
		console.log("Started");
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				this.setState({
					lat: position.coords.latitude,
					long: position.coords.longitude
				}
					);
			});
		}
		else{
			this.setState({
				lat: "Didn't even work",
				long: "Nope",
			});
		}
	}

	render(){ 
		return (

            <div class={style.container}>
            	<div>{this.fetchLocation()}</div>
                <p>{ this.state.lat }</p>
                <p>{ this.state.long }</p>

				
				
		
			
            </div>
		);
	}
}