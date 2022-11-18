import { deleteBook, getBook, updateBook } from "../../../database/controllers/bookControllers";

export default function handler(req, res) {
    switch (req.method){
      case 'GET':
        getBook(req,res)
        break;
      case 'DELETE':
        deleteBook(req,res)
        break;
      case 'PUT':
        updateBook(req,res)
        break;
      defaults :
        res.setHeader("Allow",['GET','POST','PUT','DELETE'])
        res.status(405).end(`Method ${req.method} Not Allow`)
    }
  }