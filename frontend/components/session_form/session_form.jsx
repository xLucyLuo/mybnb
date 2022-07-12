import React from 'react';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          email: "",
          password: "",
          fname: "",
          lname: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setDemoUser = this.setDemoUser.bind(this);
    };

    componentDidMount() {
        this.props.clearSessionErrors();
    };

    handleSubmit(e) {
        console.log(this.state)
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
    };

    update(field) {
        return (e) => this.setState({[field]: e.target.value});
    };

    setDemoUser() {
        
        this.setState({
            email: "demo.user@mybnb.com",
            password: "123123",
            fname: "Demo",
            lname: "User",
        })

        console.log(this.state)
    }

    renderErrors() {
        return (
            <div>
                <ul>
                    {this.props.errors.map((err, i) => 
                        <li key={`${i}`}>{err}</li>
                    )}
                </ul>
                <br/>
            </div>
        );
    };

    render() {
        const { formType, navLink } = this.props;
        return (
            <div>
                <h1>{formType}</h1>
                {this.renderErrors()}
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="email-input">Email: </label>
                    <input id="email-input" type="text" onChange={this.update("email")} value={this.state.email}/>
                    <br/><br/>
                    <label htmlFor="password-input">Password: </label>
                    <input id="password-input" type="password" onChange={this.update("password")} value={this.state.password}/>
                    {formType === "Sign up" ? (
                        <div>
                            <br/>
                            <label htmlFor="fname-input">First Name: </label>
                            <input id="fname-input" type="text" onChange={this.update("fname")} value={this.state.fname}/>
                            <br/><br/>
                            <label htmlFor="lname-input">Last Name: </label>
                            <input id="lname-input" type="text" onChange={this.update("lname")} value={this.state.lname}/>
                        </div>    
                        ) : <div></div>
                    }
                    <br/><br/>
                    <button value={formType}>{formType}</button>
                    {formType === "Log in" ? <button onClick={this.setDemoUser}>Demo User</button> : <div></div>}
                </form>
                <br/><br/>
                {navLink}
            </div>
        )
    }
};

export default SessionForm;