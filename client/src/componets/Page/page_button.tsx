import React, { FunctionComponent, useState } from 'react';
import "./Page.scss"

type PageNavigatorProps = {
    number_of_pages:number;
    Change_Page:(page_number:number)=>void
}

export const PageNavigator:FunctionComponent <PageNavigatorProps> =({Change_Page,number_of_pages})=>{
    const [currentPage,setCurrentPage] = useState(1);
    let pages = []; 
    for (var i = 1; i <= number_of_pages; i++) {
        pages.push(i);
    }
    const on_Change_Page=(page_number:number)=> {
        setCurrentPage(page_number);
        Change_Page(page_number);
    }
    return( <ul className="page-list">
        {pages.map((i)=>(
            <li key = {i} style={{backgroundColor: i===currentPage?'#525357':'#313336'}}>
                <PageButton on_Change_Page={()=>on_Change_Page(i)}>{i}</PageButton>
            </li>
            
        ))}
  </ul>)
};

type PageProps = {
    on_Change_Page:Function;
}
export const PageButton: React.FC <PageProps> = ({on_Change_Page,children})=>{
    const Click_on_page=()=> {
        on_Change_Page();
    }
    return (
        <a className="page-button" onClick={()=>Click_on_page()}> {children}</a>
    )
}