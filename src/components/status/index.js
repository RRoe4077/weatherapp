// import preact
import { h, render, Component } from 'preact';

import style from './style';

export default class Status extends Component{
	render(){
		return (
            <div class={style.container}>
                <h1> ⚠ Not Safe to Fly ⚠ </h1>
            </div>
		);
	}
}