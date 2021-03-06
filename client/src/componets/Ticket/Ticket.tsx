import React,{ Children, FunctionComponent} from 'react';
import { DropDown, DropDownItem } from '../Menu/DropDown';
import './Ticket.scss'

export type Ticket = {
    id: string,
    title: string;
    content: string;
    creationTime: number;
    userEmail: string;
    labels?: string[];
}
type Tickets={
    ticket:Ticket;
}

export const TicketComponent: FunctionComponent<Tickets> = ({ticket,children}) => {
    return( <li key={ticket.id} className='ticket'>
    <div className='titleContainer'>
    <h5 className='title'>{ticket.title}</h5>
    {children}
    </div>
    <h6 className='content'>{ticket.content}</h6>
    <footer>
    <div className='meta-data'>By {ticket.userEmail} | { new Date(ticket.creationTime).toLocaleString()}</div>
    </footer>
</li>)
};

const editTitle = (ticket: Ticket)=> {
	const enteredName = prompt('Please enter the new title')
	if(enteredName)
		ticket.title = enteredName;
	return true;
}


const cloneTicket = (ticket: Ticket)=> {
	
	
}


const deleteTicket = (id: string)=> {
	
}

