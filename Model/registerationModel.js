import mongoose from 'mongoose';


const RegisterationSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        index: true,
        unique: true
    },
    password: String
})


const RegisterationModel = new mongoose.model('Register', RegisterationSchema);

export default RegisterationModel