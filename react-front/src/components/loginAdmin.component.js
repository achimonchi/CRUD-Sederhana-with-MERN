import React,{Component} from 'react';
import axios from 'axios'


export default class LoginAdmin extends Component{
    constructor(props){
        super(props)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            email : '',
            password : ''
        }
    }

    onChangeEmail = (e) =>{
        this.setState({
            email : e.target.value
        })
    }

    onChangePassword = (e) =>{
        this.setState({
            password : e.target.value
        })
    }

    onSubmit = (e) =>{
        e.preventDefault()
        const data = {
            email : this.state.email,
            password : this.state.password
        }

        axios.post('http://localhost:4000/loginAsAdmin', data)
        .then(res=>{
            localStorage.setItem('token', "Baerer "+res.data.token)
            console.log(res.data)
            alert('login berhasil !')
            window.location = 'http://localhost:3000/admin'
        })
    }

    render(){
        return (
            <div>
                
                <div className="container">
                    <div className="row mt-5 justify-content-center">
                        <div className="col-md-6">
                            <h3 className="text-center mb-3">Form Login </h3>
                            <form onSubmit={this.onSubmit}>
                                <label>Email</label>
                                <input type="text" className="form-control mb-3" value={this.state.email} onChange={this.onChangeEmail} />
                                <label>Password</label>
                                <input type="password" className="form-control mb-3" value={this.state.password} onChange={this.onChangePassword} />
                                <input type="submit" value="Login" className="btn btn-block btn-success" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}