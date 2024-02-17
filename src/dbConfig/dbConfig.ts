import { error } from "console";
import mongoose from "mongoose";

export async function connect() {
  
        await mongoose.connect(process.env.MONGO_URI!)
        .then(() => {
        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log('mongodb connected succefully')
        })

        connection.on('err', (err) => {
            console.log("mongodb connection error , please make sure that mongodb is running" + err)
            process.exit()
        })
    })
    .catch((error: any )=> {
            console.log('something went wrong')
            console.log(error)
        
    })
}