import React, {Component} from 'react'
import './style.css'
import $ from 'jquery';

export default class SignIn extends Component{

	constructor(props){
		super(props);
		this.state = {
			signIn: props.signIn,
			Name: "",
			Password: ""
		};
		// this.handleClick = this.handleClick.bind(this);

	}

	componentWillReceiveProps(nextProps){
        this.setState(nextProps);
    }

	handleClick = () => {
		this.props.callback();
	    // this.setState({signIn: "hide"});
	}
	handleChangeName = (e) => {
        this.setState({Name: e.target.value});
    }
    handleChangePassword = (e) => {
        this.setState({Password: e.target.value});
    }

    sendForm = (e) => { // login
        e.preventDefault();
        $.ajax({
        	url: "http://localhost:5000/login",
        	type: "post",
        	contentType: 'application/json',
        	data: JSON.stringify({
        		"name": this.state.Name,
        		"password": this.state.Password
        	}),
        	success: function(){console.log("request successful");},
            error: function(){console.log("error occurred");},
        	headers:{ 'Access-Control-Allow-Origin': '*',
                      'Access-Control-Allow-Headers': 'application/json',
                      'Access-Control-Allow-Methods': 'POST',
                      'X-Content-Type-Options': 'nosniff',
                      'Content-Type': 'text/json',
                      'Access-Control-Allow-Credentials': 'true',
            }
        }).done((data) => console.log(data))
    }
	
	render(){
		var display = {"display": this.state.signIn==="show" ? "flex" : "none"}
		
		return(
		<section className="sign-in" style={display}>
            <div className="container">
                <div className="signin-content">
                    <div className="signin-image">
                        <figure><img src={require('../images/signin-image.jpg')} alt="" /></figure>
                        <a onClick={() => this.handleClick()} className="signup-image-link noselect">Create an account</a>
                    </div>

                    <div className="signin-form">
                        <h2 className="form-title">Sign in</h2>
                        <form action="/login" method="POST" className="register-form" id="login-form" onSubmit={this.sendForm}>
                            <div className="form-group">
                                <label htmlFor="your_name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" name="your_name" id="your_name" placeholder="Your Name" value={this.state.Name} onChange={this.handleChangeName} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="your_pass"><i className="zmdi zmdi-lock"></i></label>
                                <input type="password" name="your_pass" id="your_pass" placeholder="Password" value={this.state.Password} onChange={this.handleChangePassword} required />
                            </div>
                            <div className="form-group">
                                <input type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
                                <label htmlFor="remember-me" className="label-agree-term"><span><span></span></span>Remember me</label>
                            </div>
                            <div className="form-group form-button">
                                <input type="submit" name="signin" id="signin" className="form-submit" value="Log in"/>
                            </div>
                        </form>
                        <div className="social-login">
                            <span className="social-label">Or login with</span>
                            <ul className="socials">
                                <li><a href="#"><i className="display-flex-center zmdi zmdi-facebook"></i></a></li>
                                <li><a href="#"><i className="display-flex-center zmdi zmdi-twitter"></i></a></li>
                                <li><a href="#"><i className="display-flex-center zmdi zmdi-google"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        )
	}

}