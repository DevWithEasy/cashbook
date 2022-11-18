import mongoose from 'mongoose';

const initDatabase = async() =>{
    try{
        const {connection} = await mongoose.connect(process.env.MONGO_URI)
        if(connection.readyState === 1){
            console.log('Database connected')
        }
    }catch(err){
        return Promise.reject(err);
    }
}
export default initDatabase;