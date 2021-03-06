import React, { Component } from 'react';
import './App.scss';
import { createApiClient, Ticket} from './api';
import  ToggleSwitch  from "./componets/ToggleSwitch/switch"
import { DropDown,DropDownItem } from './componets/Menu/DropDown';
import  {PageNavigator}  from './componets/Page/page_button';


export type AppState = {
	tickets?: Ticket[],
	theme:string,
	search: string,
	reload: boolean,
}

const api = createApiClient();

export class App extends React.PureComponent<{}, AppState> {
	
	state: AppState = {
		search: '',
		theme:'light',
		reload:false
	}
	
	setTheme= ()=> {
		if(this.state.theme === 'light'){
			document.documentElement.style.setProperty('--color', 'white');
			document.documentElement.style.setProperty('--background-color', 'black');
			this.setState({theme:'dark'});
		}
		else{
			document.documentElement.style.setProperty('--color', 'black');
			document.documentElement.style.setProperty('--background-color', 'white');
			this.setState({theme:'light'});
		}
	}
	searchDebounce: any = null;

	async componentDidMount() {
		this.setState({tickets: await api.getTickets()});
		console.log(this.state.tickets);
	}

	async componentDidUpdate(prevState:AppState){
		if(this.state.reload){
			console.log(prevState.reload);
			console.log(this.state.reload);
			this.setState({
				tickets: await api.getTickets()
			});
			console.log(this.state.tickets);
		}
		this.setState({
			reload: false
		});
	}

	editTitle = (ticket: Ticket)=> {
		const enteredName = prompt('Please enter the new title')
		if(enteredName){
			ticket.title = enteredName;
			api.changeTitle(ticket.id,enteredName);
			this.setState({	search: this.state.search == ''?' ':''});
		}
		return true;
	}
	cloneTicket = (ticket:Ticket)=> {
		let confirmation = window.confirm("Are you sure you wish to Clone this item?")
		console.log(confirmation);
		if(confirmation){
			let did_Clone = api.cloneTicket(ticket);
			alert(did_Clone?"Cloned Successfully":"Error with Cloning");
			this.setState({reload:true});
		}
	}
	deleteTicket = (id: string)=> {
		let confirmation = window.confirm("Are you sure you wish to Delete this item?")
		if(confirmation){
			let did_delete = api.deleteTicket(id);
			alert(did_delete?"Deleted Successfully":"Error with Deletion");
			this.setState({reload:true});
		}
	}

	logshit=()=>
	{
		console.log("LOGGED");
	}
	renderTickets = (tickets: Ticket[]) => {
		const filteredTickets = tickets
		.filter((t) => (t.title.toLowerCase() + t.content.toLowerCase()).includes(this.state.search.toLowerCase()));
		return (
		<ul className='tickets'>
			{filteredTickets.map((ticket) => (
			<li key={ticket.id} className='ticket'>
				<div className='titleContainer'>
				<h5 className='title'>{ticket.title}</h5>
				<DropDown>
					<DropDownItem onPush={()=>this.editTitle(ticket)}>Rename</DropDownItem>
					<DropDownItem onPush={()=>this.cloneTicket(ticket)}>Clone</DropDownItem>
					<DropDownItem onPush={()=>this.deleteTicket(ticket.id)}>Delete</DropDownItem>
				</DropDown>
				</div>
				<h6 className='content'>{ticket.content}</h6>
				<footer>
				<div className='meta-data'>By {ticket.userEmail} | { new Date(ticket.creationTime).toLocaleString()}</div>
				</footer>
			</li>))}
		</ul>);
	}

	onSearch = async (val: string, newPage?: number) => {
		clearTimeout(this.searchDebounce); 
		this.searchDebounce = setTimeout(async () => {
			this.setState({
				search: val
			});
		}, 300);
	}
	gotoPage =(i:number)=>{
		console.log("go to "+i);
	}
	render() {	
		const {tickets} = this.state;
		return (
		<div >
			<div style={{textAlign:"right"}}><ToggleSwitch onChange={this.setTheme} /></div>
			<h1>Tickets List</h1>
			<header>
				<input type="search" placeholder="Search..." onChange={(e) => this.onSearch(e.target.value)}/>
			</header>
			{tickets ? <div className='results'>Showing {tickets.length} results</div> : null }	
			{tickets ? this.renderTickets(tickets) : <h2>Loading..</h2>}
			<PageNavigator number_of_pages = {5} ></PageNavigator>
		</ div>)
	}
}
export default App;