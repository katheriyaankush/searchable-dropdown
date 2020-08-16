import React , {Component} from 'react';
import {connect} from 'react-redux';

import   './Dropdown.css';
import axios from 'axios';
import Aux from '../hoc/Axiliury/Axilury';
import Input from '../Input/Input';
import * as actionType from '../Store/action';






let numberItems = 5;

class Dropdown extends Component{

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
       users: [ ],
      result:  [],
      noOfItems: 5,
     expanded: false
        
    };
   
componentDidMount(){ 
 
  
    axios.get('http://13.57.235.126:5000/countries').then(  respose=> {
          
       this.props.onCountries(respose.data);
       this.props.resultData(respose.data);
     
} 
        
    ).catch(error=>{
                    
                    
        this.setState({errorFetch: true})
                    
 
 });





}


filterList=(event)=> {
    let value = event.target.value;
      if(!value.length){
        this.componentDidMount();
        console.log("HH");
      }

    this.setState({countryAdd: event.target.value});

    let users = this.props.result, result=[];
    result = users.filter((user)=>{
        return user.label.toLowerCase().search(value.toLowerCase()) !== -1;
    });

    console.log("Reult===",result);
    this.props.resultShow(result);

   
}




onChangeHandler=(event)=>{
const valueData = {...this.state.country};
valueData.value = event.value;
this.setState({country:valueData});
}



showMoreCountry=()=>{
console.log("numberItems=",numberItems, "===", this.state.noOfItems)
     numberItems = numberItems+this.state.noOfItems;
     this.setState({expanded:false});



}







render(){
    let addCountriesElement = null;  
    let internalError= null; 

if(this.state.errorFetch){

 internalError = <h2 style = {{color:'Red'}}> Internal API Error</h2>;
}
  


 
  
            let userList = null;
            let searchableCountries = this.props.result;
            if(searchableCountries.length){
                if(numberItems){
                  
                 userList = searchableCountries.slice(0, numberItems).map((user) => {
                    return <li key = {user.value} style={{textAlign:"left"}}>{user.label} </li>;
                  });
                }
                else{
                    userList = searchableCountries.slice(0, this.state.noOfItems).map((user) => {
                        return <li key = {user.value} style={{textAlign:"left"}}>{user.label} </li>;
                      });   
                }
            }
            else{
                 userList = <p style={{textAlign:"left"}}>No Record found</p>;
                
            }
            
    return(
    
    <Aux  >
      {internalError}
   

 <div className = {"mainDiv"}>
 <Input changed = {(event)=>this.onChangeHandler(event)} elementData = {this.props.countryOption} value={this.state.country.value}   type={this.state.country.elementType}   />    
 <Input type="textbox"  changed={(e)=>this.filterList(e)}/>
 
  <ul>{userList}</ul>
        

        <a  onClick={this.showMoreCountry}>
 
    <span> {this.state.noOfItems} more</span>
 
</a>
    
</div>
      
     </Aux> 

    );
}

}






const onStateToProps= state=>{

    return{

        error:state.error,   
        addCountry:state.addCountry,
        countryOption: state.Option,
        result:state.result
    }
}
const onDispatchToState= dispatch=>{

    return{

      onCountries: (countries)=>dispatch({type:actionType.COUNTRY, country:countries}),
     onData:(addCountry)=>dispatch({type:actionType.ADDCOUNTRY, addCountry:addCountry}),
     resultData:(searchCountry)=>dispatch({type:actionType.SEARCH_COUNTRY, searchCountry:searchCountry}),
resultShow:(rCountry)=>dispatch({type:actionType.R_COUNTRY, rCountry:rCountry})

       
    };
};


export default connect(onStateToProps,onDispatchToState)( Dropdown);