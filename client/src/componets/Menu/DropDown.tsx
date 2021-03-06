import React,{ FunctionComponent, useState } from 'react';
import './DropDown.scss'


export const DropDown: React.FC=({children})=>{
    const [open,setOpen] = useState(false);
    return( <ul className="nav-item">
    <a className="icon-button" onClick={() => setOpen(!open)}>▼</a> 
    <div className="dropdown" onClick={()=>setOpen(false)}>
        {open?children:null}
    </div>
  </ul>)
};

type DropDownitem={
    onPush:Function;
}

export const DropDownItem: FunctionComponent<DropDownitem>=({onPush,children})=>{
    const handleClick=()=> {
        onPush();
    }
        return (
            <a className="menu-item" onClick={handleClick}> 
                    {children}
            </a>
        );
}