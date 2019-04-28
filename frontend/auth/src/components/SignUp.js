import React, {Component} from 'react'
import './style.css'
import $ from 'jquery';

export default class SignUp extends Component{

	constructor(props){
		super(props);
		this.state = {
			signUp: props.signUp,
            checkbox: "off",
            Name: "",
            Mail: "",
            Password: "",
            Password2: ""
		}
        // this.handleClick = this.handleClick.bind(this);

	}

    componentWillReceiveProps(nextProps){
        this.setState(nextProps);
    }

    handleClick = () => {
        this.props.callback()
        // this.setState({signUp: "hide"});
    }

    handleChangeName = (e) => {
        this.setState({Name: e.target.value});
    }
    handleChangeMail = (e) => {
        this.setState({Mail: e.target.value});
    }
    handleChangePassword = (e) => {
        this.setState({Password: e.target.value});
    }
    handleChangePassword2 = (e) => {
        this.setState({Password2: e.target.value});
    }

    sendForm = (e) => { // register
        e.preventDefault();
        $.ajax({
            url: "http://localhost:5000/register",
            type: "post",
            contentType: 'application/json',
            data: JSON.stringify({
                "name": this.state.Name,
                "mail": this.state.Mail,
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
        var display = {"display": this.state.signUp==="show" ? "flex" : "none"}
        
        return(
		<section className="signup" style={display}>
            <div className="container">
                <div className="signup-content">
                    <div className="signup-form">
                        <h2 className="form-title">Sign up</h2>
                        <form action="/register" method="POST" className="register-form" id="register-form" onSubmit={this.sendForm}>
                            <div className="form-group">
                                <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" name="name" id="name" placeholder="Your Name" value={this.state.Name} onChange={this.handleChangeName} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                                <input type="email" name="email" id="email" placeholder="Your Email" value={this.state.Mail} onChange={this.handleChangeMail} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pass"><i className="zmdi zmdi-lock"></i></label>
                                <input type="password" name="pass" id="pass" placeholder="Password" value={this.state.Password} onChange={this.handleChangePassword} pattern="[A-Za-z0-9]{8,15}"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="re-pass"><i className="zmdi zmdi-lock-outline"></i></label>
                                <input type="password" name="re_pass" id="re_pass" placeholder="Repeat your password" value={this.state.Password2} onChange={this.handleChangePassword2} pattern={this.state.Password}/>
                            </div>
                            <div className="form-group">
                                <input type="checkbox" name="agree-term" id="agree-term" className="agree-term"/>
                                <label htmlFor="agree-term" className="label-agree-term"><span><span></span></span>I agree all statements in  <a href="#" className="term-service">Terms of service</a></label>
                            </div>
                            <div className="form-group form-button">
                                <input type="submit" name="signup" id="signup" className="form-submit" value="Register"/>
                            </div>
                        </form>
                    </div>
                    <div className="signup-image">
                        <figure><img src={require('../images/signup-image.jpg')} alt="" /></figure>
                        <a className="signup-image-link noselect" onClick={() => this.handleClick()}>I am already member</a>
                    </div>
                </div>
            </div>
        </section>
        )
	}

}