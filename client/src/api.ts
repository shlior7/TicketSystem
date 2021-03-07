import axios from 'axios';
import {APIRootClonePath,APIRootPath, APIRootDeletePath, APIRootChangePath, APIRootPagesAmountPath} from '@fed-exam/config';


export type Ticket = {
    id: string,
    title: string;
    content: string;
    creationTime: number;
    userEmail: string;
    labels?: string[];
}

export type ApiClient = {
    getPagesAmount:()=>Promise<number>;
    getTickets: (page_number:number) => Promise<Ticket[]>;
    cloneTicket: (ticket:Ticket) => boolean;
    changeTitle:  (id:string,title:string) => boolean;
    deleteTicket: (id:string) => boolean;
}

export const createApiClient = (): ApiClient => {
    return {
        getPagesAmount: () => {
            const promise = axios.get(APIRootPagesAmountPath).then((res) => res.data);
            return promise.then(data=>data.pages_amount);
        },
        getTickets: (page_number:number) => {
            return axios.get(APIRootPath,{params:{page:page_number}}).then((res) => res.data);
        },
        cloneTicket:(ticket:Ticket)=>{
            axios.post(APIRootClonePath, ticket)
            .then((response)=>{console.log(response)},
            (error) =>{
              console.log(error);
              return false;
            });
            return true;
        },
        deleteTicket: (id:string)=>{
            axios.delete(APIRootDeletePath,{data :{id:id}}) 
            .then((response)=>console.log(response),
            (error) =>{
                console.log(error);
                return false;
            });
           return true;
        },
        changeTitle: (id:string,title:string)=>{
            axios.put(APIRootChangePath,{id_of_ticket: id ,new_title:title}) 
            .then((response)=>console.log(response),
            (error) =>{
                console.log(error);
                return false;
            });
           return true;
        }
    }
}

