import mongoose,{Mongoose} from "mongoose";
const MONGODB_URL=process.env.MONGODB_URL;

interface MongooseConnection{
    conn:Mongoose |null;
    promise:Promise<Mongoose>|null;
}

let cached:MongooseConnection=(global as any).mongoose

if(!cached){
    cached=(global as any).mongoose={conn:null,
        promise:null
    }
}

/**
 * Connects to the MongoDB database or returns an existing connection
 * @param {void} - This function doesn't accept any parameters
 * @returns {Promise<mongoose.Connection>} A promise that resolves to the database connection
 */
export const connectToDatabase=async()=>{
    if(cached.conn) return cached.conn;
    if(!MONGODB_URL) throw new Error('missing MONGODB_URL');
    cached.promise=cached.promise||mongoose.connect(MONGODB_URL,{
        dbName:'imaginify',bufferCommands:false
    })
    cached.conn=await cached.promise;
    return cached.conn;
}