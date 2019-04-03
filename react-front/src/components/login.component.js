import React,{Component} from 'react';
import axios from 'axios'


export default class Login extends Component{
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

    onChangeEmail = (e)=>{
        this.setState({
            email : e.target.value
        })
    }

    onChangePassword = (e) =>{
        this.setState({
            password : e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        const data = {
            email : this.state.email,
            password : this.state.password
        }

        
        axios.post('http://localhost:4000/login', data)
        .then(res => {
            localStorage.setItem('token',"Baerer "+res.data.token)
            console.log(res.data.user[0]._id)

            alert('Selamat, anda berhasil login !')
            window.location = 'http://localhost:3000/user/'+res.data.user[0]._id
            
        })
        
        
        this.setState({
            email : '',
            password :''
        })
        
    }

    render(){
        return(
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h3 className="text-center">Login as User</h3>
                        <form onSubmit={this.onSubmit}>
                            <label>Email</label>
                            <input className="form-control mb-3" value={this.state.email} onChange={this.onChangeEmail} />
                            <label>Password</label>
                            <input className="form-control mb-3" value={this.state.password} onChange={this.onChangePassword} />
                            <input type="submit" className="btn btn-success btn-block" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}