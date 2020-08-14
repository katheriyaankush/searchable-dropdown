import React from 'react';
import  './Input.css';
import Select from 'react-select';


let inputElement=null;

const input =(props)=>{


switch (props.type) {
    case ('label'):
        inputElement= 
        <label className = {"Label"}>{props.labelName}</label>;
        break;
        case ('textbox'):
            inputElement= <input className={"InputText"} onChange={props.changed}  {...props.elementData} placeholder = {"Country Name"} value={props.value}/>;
            break; 
    
             case ('select'):
                inputElement = ( <Select  onChange={props.changed}  options={props.elementData}  placeholder="Select Country"   />          
                    );
           
             break; 
        default:
            inputElement= <input className={"Input"} onChange={props.changed} {...props.elementData} value={props.value}/>;
            break;
        break;

            }

return(

<div >

{inputElement}
</div>

);

}

export default input;