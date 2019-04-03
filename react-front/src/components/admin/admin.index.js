import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.css'
import Axios from 'axios';
import TableRow from './table-user'

export default class AdminIndex extends Component{
    constructor(props){
        super(props)
        this.state = {
            user : []
        }
    }

    
    componentDidMount(){
        var token = localStorage.getItem('token')
        Axios.get(
            'http://localhost:4000/admin/lihatUser',
            {
                headers :{
                    "authorization" : token
                }
            })
        .then(res =>{
            this.setState({
                user : res.data.users
            })
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    tabRow(){
        return this.state.user.map((object,i)=>{
            return <TableRow obj={object} key={i}/>
        })
    }

    render(){
        const token = localStorage.getItem('token')
        if(token){
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-md">
                            <table className="table table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th>Nama</th>
                                        <th>Email</th>
                                        <th>Gender</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.tabRow()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                </div>
            )
        }
        else{
            return(
                <div>
                    <p>Anda Belum Login ! </p>
                </div>
            )
        }
        
        
    }
}