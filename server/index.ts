import express from 'express';
import bodyParser = require('body-parser');
import { tempData } from './temp-data';
//const data = require('./try.json') ;
import { serverAPIPort,API_Clone_Path, APIPath,API_Delete_Path, API_Change_Path,API_Pages_Amount_Path } from '@fed-exam/config';
import { stat } from 'fs';
const fs = require('fs');
console.log('starting server', { serverAPIPort, APIPath });

const app = express();
const router = express.Router();
const PAGE_SIZE = 20;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

app.get(API_Pages_Amount_Path, (req, res) => {
  res.send({
    pages_amount:  Math.ceil(tempData.length/PAGE_SIZE),
  });
});

app.get(APIPath, (req, res) => {
  // @ts-ignore
  const page: number = req.query.page || 1;

  const paginatedData = tempData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  res.send(paginatedData);
});


app.put(API_Change_Path, (req,res) => {
  let index_of_ticket_to_change = tempData.findIndex(x => x.id === req.body.id_of_ticket);
  let new_title = req.body.new_title?.toString()?req.body.new_title?.toString():"";
  tempData[index_of_ticket_to_change].title = new_title;
  res.sendStatus(200);
  // @ts-ignore
});

app.post(API_Clone_Path, (req,res) => {
  let ticket_index = tempData.findIndex(x => x.id === req.body.id);
  let new_ticket = req.body;
  new_ticket.id = makeId(req.body.id);
  var date = new Date();
  tempData.splice(ticket_index + 1, 0 ,new_ticket);
  res.send(new_ticket);
  res.send(tempData.length);
  // @ts-ignore
});


app.delete(API_Delete_Path, (req,res) => {
  let index_of_ticket_to_delete = tempData.findIndex(x => x.id === req.body.id);
  tempData.splice(index_of_ticket_to_delete,1);
  res.send(tempData.length);
  // @ts-ignore
});


const makeId = (id:string) => {
  let new_id:string;
  do{
    let ID = "";
    let characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    for ( var i = 0; i < 12; i++ ) {
      ID += characters.charAt(Math.floor(Math.random() * 36));
    }
    new_id = id.substr(0,24)+ID;
  }while(tempData.find((x) => x.id === new_id))
  return new_id;
}


app.listen(serverAPIPort);
console.log('server running', serverAPIPort)

