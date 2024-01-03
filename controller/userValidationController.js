import RegisterationModel from "../Model/registerationModel.js";

export const ValidateRegisterationData = async (req, res, next) => {
    try {
        const {name, email, password}  = req.body;
        if(!name || !email || !password){
            throw new Error("All Fields must be valid");
        }
        if(name.length < 5){
            throw new Error("Name must be at least 5 characters");
        }
        if(!email.includes('@')){
            throw new Error("Email must be valid");
        }
        if(password.length < 5){
            throw new Error("Password must be at least 5 characters");
        }
        const data = await RegisterationModel.find({email: email});
        if(data.length){
            throw new Error("User already registered");
        }
        next();
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: err.message
        })
    }
}

export const ValidateLoginData = async (req, res, next) => {
    try {
        const {email, password}  = req.query;
        if(!email || !password){
            throw new Error("All Fields must be valid");
        }
        if(!email.includes('@')){
            throw new Error("Email must be valid");
        }
        if(password.length < 5){
            throw new Error("Password must be at least 5 characters");
        }
        next();
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: err.message
        })
    }
}