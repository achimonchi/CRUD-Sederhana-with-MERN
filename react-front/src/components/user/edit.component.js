import React,{Component} from 'react';
import Axios from 'axios';
import { request } from 'https';

export default class Edit extends Component{
    constructor(props){
        super(props)

        this.state = {
            nama : '',
            email : '',
            gender : ''
        }
    }

    componentDidMount = () => {
        var token = localStorage.getItem('token')
        Axios({
            method : 'GET',
            url : 'http://localhost:4000/user/'+this.props.match.params.id,
            headers : {
                "authorization" : token
            }
        }).then(res=>{
            console.log(res.data.user.nama)
            this.setState({
                nama : res.data.user.nama,
                email : res.data.user.email,
                gender : res.data.user.gender
            })
        })
    }

    onChangeNama=(e)=>{
        this.setState({
            nama : e.target.value
        })
    }

    onChangeEmail = (e) =>{
        this.setState({
            email : e.target.value
        })
    }

    onChangeGender = (e) =>{
        this.setState({
            gender : e.target.value
        })
    }

    onSubmit=(e) => {
        e.preventDefault()
        var token = localStorage.getItem('token')

        const user = {
            nama : this.state.nama,
            email : this.state.email,
            gender : this.state.gender
        }

        Axios({
            method : 'PUT',
            url : 'http://localhost:4000/user/'+this.props.match.params.id,
            headers : {
                'authorization' : token
            },
            data : user
        }).then(res=>{
            console.log(res.data)
            alert('Ubah Data Berhasil !')
        })

        

    }


    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h3>Welcome {this.state.nama}</h3>
                        <form className="mt-5" onSubmit={this.onSubmit}>
                            <label>Nama Lengkap</label>
                            <input className="form-control mb-3" value={this.state.nama} onChange={this.onChangeNama} />
                            <label>Email</label>
                            <input className="form-control mb-3" value={this.state.email} onChange={this.onChangeEmail} />
                            <label>Gender</label>
                            <input className="form-control mb-3" value={this.state.gender} onChange={this.onChangeGender} />
                            <input className="btn btn-success btn-block" type="submit" value="Ubah Data" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}