import React,{Component} from 'react';
import axios from 'axios'


export default class Create extends Component{
    constructor(props){
        super(props)
        this.onChangeNama = this.onChangeNama.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangeGender = this.onChangeGender.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            nama : '',
            email : '',
            gender : ''
        }
    }

    componentDidMount = () =>{
        var token = localStorage.getItem('token')
        axios.get('http://localhost:4000/admin/lihatUser/'+this.props.match.params.id,{
            headers :{
                "authorization" : token
            }
        }).then(res=>{
            console.log(res.data.user)
            this.setState({
                nama : res.data.user.nama,
                email : res.data.user.email,
                gender : res.data.user.gender
            })
        })
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

    onChangeGender = (e) =>{
        this.setState({
            gender : e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault()
        var token = localStorage.getItem('token')
        console.log(`The values are ${this.state.nama}, ${this.state.email}, ${this.state.password} dan ${this.state.gender}`)
        const user = {
            nama : this.state.nama,
            email : this.state.email,
            gender : this.state.gender
        }

        const data = [user]
        // axios.put('http://localhost:4000/admin/ubahUser/'+this.props.match.params.id,{
        //     headers : {
        //         'authorization' : token
        //     }
        // }, data )
        // .then(res=>{
        //     console.log(res.data)
        //     alert('Update data berhasil !')
        // })

        axios({
            method : 'PUT',
            url : 'http://localhost:4000/admin/ubahUser/'+this.props.match.params.id,
            headers : {
                'authorization' : token
            },
            data : user
        }).then(res=>{
            console.log(res.data)
            window.location = 'http://localhost:3000/admin'
        })
        
        console.log(data)
        console.log(token)


    }

    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md">
                       
                    </div>
                </div>
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6">
                        <h3 className="text-center">Edit Data {this.state.nama}</h3>
                        <br/>
                        <form onSubmit={this.onSubmit}>
                            <label>Nama Lengkap</label>
                            <input type="text" className="form-control mb-3" value={this.state.nama} onChange={this.onChangeNama} />
                            <div className="row">
                                <div className="col-md">
                                    <label>Email</label>
                                    <input type="text" className="form-control mb-3" value={this.state.email} onChange={this.onChangeEmail} />
                                </div>
                            </div>
                            <label>Gender</label>
                            <input type="text" className="form-control mb-3" value={this.state.gender} onChange={this.onChangeGender} />
                            <input type="submit" className="btn btn-block btn-primary" value="Ubah Data" />
                        </form>
                        
                    </div>
                </div>
                
            </div>
        )
    }
}