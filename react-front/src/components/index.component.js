import React,{Component} from 'react';

export default class Index extends Component{
    state = {
        token : false
    }

    constructor(props){
        super(props)
        var token = localStorage.getItem('token')
        console.log(token)
        

        if(token){
            this.state.token = true
        }
    }
    render(){
        return(
            <div>
                {this.state.token}
            </div>       
        )
    }
}