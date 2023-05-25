import mongoose from 'mongoose';

const connectDB = (uri)=>{
    // usefull when we work with search functionality
    mongoose.set('strictQuery',true);

    // db connection
    mongoose.connect(uri)
    .then(()=>console.log('MongoDB connected'))
    .catch((err)=>console.error(err));
};

// {
//     useNewUrlParser:true,
//     useCreateIndex:true,
//     useUnifiedTopology:true,
//     useFindAndModify:false
// }
export default connectDB;