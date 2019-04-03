import React,{Component} from 'react';
import axios from 'axios'


export default class Create extends Component{
    constructor(props){
        super(props)
        this.onChangeNama = this.onChangeNama.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onChangeGender = this.onChangeGender.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            nama : '',
            email : '',
            password : '',
            gender : '',
        }
    }

    onChangeNama = (e) =>{
        this.setState({
            nama : e.target.value
        })
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

    onChangeGender = (e) =>{
        this.setState({
            gender : e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault()
        console.log(`The values are ${this.state.nama}, ${this.state.email}, ${this.state.password} dan ${this.state.gender}`)
        const user = {
            nama : this.state.nama,
            email : this.state.email,
            password : this.state.password,
            gender : this.state.gender
        }
        axios.post('http://localhost:4000/daftar', user )
        .then(res=>console.log(res.data))

        this.setState({
            nama : '',
            email : '',
            password :'',
            gender : ''
        })


    }

    render(){
        return (
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6">
                        <h3 className="text-center">Form Daftar</h3>
                        <br/>
                        <form onSubmit={this.onSubmit}>
                            <label>Nama Lengkap</label>
                            <input type="text" className="form-control mb-3" value={this.state.nama} onChange={this.onChangeNama} />
                            <div className="row">
                                <div className="col-md">
                                    <label>Email</label>
                                    <input type="text" className="form-control mb-3" value={this.state.email} onChange={this.onChangeEmail} />
                                </div>
                                <div className="col-md">
                                    <label>password</label>
                                    <input type="password" className="form-control mb-3" value={this.state.password} onChange={this.onChangePassword} />
                                </div>
                            </div>
                            <label>Gender</label>
                            <input type="text" className="form-control mb-3" value={this.state.gender} onChange={this.onChangeGender} />
                            <input type="submit" className="btn btn-block btn-primary" value="Daftar Sekarang" />
                        </form>
                        
                    </div>
                </div>
            </div>
        )
    }
}