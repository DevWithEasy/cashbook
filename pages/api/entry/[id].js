import { deleteEntry, getEntryDetails, updateEntry } from "../../../database/controllers/postControllers";
import initDatabase from "../../../database/initDatabase";

export default function handler(req, res) {
    initDatabase()
    switch (req.method){
      case 'GET':
        getEntryDetails(req,res)
        break;
      case 'DELETE':
        deleteEntry(req, res)
        break;
      case 'PUT':
        updateEntry(req,res)
        break;
      defaults :
        res.setHeader("Allow",['GET','POST','PUT','DELETE'])
        res.status(405).end(`Method ${req.method} Not Allow`)
    }
  }