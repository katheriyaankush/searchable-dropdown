import * as actionType from './action';

const initialState = {
    error:false,
    addCountry:'',
    Option : 
        
      [{ label: 'Select', value: 'Select' }]

    
};

const reducer=(state=initialState,action)=>{

  console.log("HIII",action.type);

switch (action.type) {
    case actionType.COUNTRY:
     
     const  countriesArray = action.country; 
   
     const fArray = countriesArray.countries.map(opt => ({ label: opt, value: opt }));

     
    return{
        
             ...state,
             Option: fArray
    
    }
        
      case actionType.ADDCOUNTRY:
     
     
      return{
         ...state,
         addCountry: action.addCountry
      }

}


return state;

}

export default reducer;