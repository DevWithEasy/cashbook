import { signin, updateUser } from "../../../database/controllers/userControllers";
import initDatabase from "../../../database/initDatabase";

export default async function handler(req, res) {
    await initDatabase()
    switch (req.method){
      case 'POST':
        signin(req,res)
        break;
      case 'DELETE':
        return res.status(200).json({})
        break;
      case 'PUT':
        updateUser(req,res)
        break;
      defaults :
        res.setHeader("Allow",['GET','POST','PUT','DELETE'])
        res.status(405).end(`Method ${req.method} Not Allow`)
    }
  }