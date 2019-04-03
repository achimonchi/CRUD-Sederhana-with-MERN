import React , {Component} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

class tableUser extends Component{

    componentDidMount(){

    }

    delete=()=>{
        var id = this.props.obj._id
        var token = localStorage.getItem('token')
        axios({
            method : 'DELETE',
            url : 'http://localhost:4000/admin/hapusUser/'+id,
            headers : {
                'authorization' : token
            }
        }).then(res=>{
            alert('Hapus Data Berhasil !')
            window.location.reload(true)
        })
    }

    render(){
        var i = 1;
        return (
            <tr>
                <td>{this.props.obj.nama}</td>
                <td>{this.props.obj.email}</td>
                <td>{this.props.obj.gender}</td>
                <td>
                    <Link to={'/admin/ubahUser/'+this.props.obj._id} className="btn btn-sm btn-success">Edit</Link>
                    <span> </span>
                    <button onClick={this.delete} className="btn btn-sm btn-danger">Delete</button>
                </td>
            </tr>
        )
    }
}

export default tableUser