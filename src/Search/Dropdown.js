import React , {Component} from 'react';
import {connect} from 'react-redux';

import   './Dropdown.css';
import axios from 'axios';
import Aux from '../hoc/Axiliury/Axilury';
import Input from '../Input/Input';
 
import * as actionType from '../Store/action';







class Profile extends Component{

    state={
          country:{ 
                elementType: 'select',
             elementName:'country',
             value:'country',
             enableValid:true
            },
   
        error:false,
       countryAdd:'',
       errorFetch:false,
       user:'Administrator'
        
    };

componentDidMount(){ 
 
  
    axios.get('http://13.57.235.126:5000/countries').then(  respose=> {
          
       this.props.onCountries(respose.data);
     
} 
        
    ).catch(error=>{
                    
                    
        this.setState({errorFetch: true})
                    
 
 });







}

submitHandler=(event)=>{
 
   const countryAdding = this.state.countryAdd;
   
    const apiData = 'http://13.57.235.126:5000/addcountry?name='+countryAdding;


 axios.get(apiData).then(  respose2=> {
    
    this.props.onData(respose2.data);
} 
       
    ).catch(error=>{
                                      
        this.setState({error: true})
                    
 });
    event.preventDefault(); 
    this.componentDidMount();
}

onChangeHandler=(event)=>{
const valueData = {...this.state.country};
valueData.value = event.value;
this.setState({country:valueData});
}

onTextHandler=(event)=>{

    this.setState({countryAdd: event.target.value});

}









render(){
    let addCountriesElement = null;  
    let internalError= null; 
if(this.state.errorFetch){

 internalError = <h2 style = {{color:'Red'}}> Internal API Error</h2>;
}
  


  if(this.state.user == 'Administrator'){
    addCountriesElement = <div className = {"SideDiv"}>
    <form onSubmit={this.submitHandler}>
        
        <button style={{backgroundColor: "#298af2"}} onClick = {this.addValue}>ADD Country</button>
        <Input changed = {(event)=>this.onTextHandler(event)} labelName = 'Enable Disable:' type='textbox'  />
        </form>
       
       { this.state.error ? <p>Country Already Exist</p> : this.props.addCountry ? <p>Country suceesfully Added </p> : null}
        </div> 
  }
            



    return(
    
    <Aux  >
      {internalError}
    <h3> Login With {this.state.user}</h3>
{addCountriesElement}
 <div className = {"mainDiv"}>
 <Input changed = {(event)=>this.onChangeHandler(event)} elementData = {this.props.countryOption} value={this.state.country.value}   type={this.state.country.elementType}   />    
</div>
      
     </Aux> 

    );
}

}

const onStateToProps= state=>{

    return{

        error:state.error,   
        addCountry:state.addCountry,
        countryOption: state.Option
    }
}
const onDispatchToState= dispatch=>{

    return{

      onCountries: (countries)=>dispatch({type:actionType.COUNTRY, country:countries}),
     onData:(addCountry)=>dispatch({type:actionType.ADDCOUNTRY, addCountry:addCountry})
       
    };
};


export default connect(onStateToProps,onDispatchToState)( Profile);