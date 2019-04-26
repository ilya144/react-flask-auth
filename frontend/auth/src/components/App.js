import React, {Component} from 'react'
import SignIn from './SignIn.js'
import SignUp from './SignUp.js'
import './style.css'
import '../fonts/material-icon/css/material-design-iconic-font.min.css'

export default class App extends Component{
	state = {
		/* display none if false */
		signUp: "show",
		signIn: "hide",
	}

	render() {
		return(
		<div className="main">
			<SignIn signIn={this.state.signIn} />
			<SignUp signUp={this.state.signUp} />
		</div>
		)
	}
}