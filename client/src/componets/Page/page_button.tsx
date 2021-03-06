import React, { FunctionComponent, useState } from 'react';
import "./Page.scss"

type PageNavigatorProps = {
    number_of_pages:number;
    
}

export const PageNavigator:FunctionComponent<PageNavigatorProps> =({number_of_pages})=>{
    const [currentPage,setCurrentPage] = useState(1);
    let pages = [];
    for (var i = 1; i <= number_of_pages; i++) {
        pages.push(i);
    }
    const handleClick=(i:number)=> {
        setCurrentPage(i);
    }
    return( <ul className="page-list">
        {pages.map((i)=>(
            <li key = {i}>
                <PageButton onPush={()=>handleClick(i)}>{i}</PageButton>
            </li>
        ))}
  </ul>)
};

type PageProps = {
    onPush:Function;
}
export const PageButton: React.FC <PageProps> = ({onPush,children})=>{

    const [Selected,setSelected] = useState(false);

    const handleClick=()=> {
        setSelected(true);
        onPush();
    }
    return (
        <a className="page-button" onClick={()=>handleClick()}> {children}</a>
    )
}