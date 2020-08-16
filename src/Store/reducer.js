import * as actionType from './action';

const initialState = {
    error:false,
    addCountry:'',
    Option : 
        
      [{ label: 'Select', value: 'Select' }],
      result:[]

    
};

const reducer=(state=initialState,action)=>{



switch (action.type) {
    case actionType.COUNTRY:
     
     const  countriesArray = action.country; 
   
     const fArray = countriesArray.countries.map(opt => ({ label: opt, value: opt }));

     
    return{
        
             ...state,
             Option: fArray
           
    
    }
        
    case actionType.SEARCH_COUNTRY:
      
      const  countriesSArray = action.searchCountry; 
   
      const SArray = countriesSArray.countries.map(opt => ({ label: opt, value: opt }));
     return{
          ...state,
          result: SArray
     }
     case actionType.R_COUNTRY:
      

     return{
          ...state,
          result: action.rCountry
     }

      case actionType.ADDCOUNTRY:
     
     
      return{
         ...state,
         addCountry: action.addCountry
      }
      default:
        return state;

}




}

export default reducer;