import RegisterationModel from "../Model/registerationModel.js";

import jwt from "jsonwebtoken";
import crypto from "crypto"

const algorithm = 'aes-256-cbc';
const secret = process.env.ENCRYPTION_SECRET || "";

const key = crypto.scryptSync(secret, 'salt', 32);
const iv = Buffer.alloc(16, 0);

function encrypt(string) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(string, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function decrypt(string) {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(string, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}


export const RegisterUser = async (req, res) => {
    let { name, email, password } = req.body;
    password = encrypt(password);
    const data = await RegisterationModel.create({
        name: name,
        email: email,
        password: password
    })
    try {
        res.status(200).json({
            status: 'success',
            data
        })
    } catch (err) {
        res.status(404).json({
            status: "error",
            message: err.message
        })
    }
}


export const LoginUser = async (req, res) => {
    let { email, password } = req.query;
    try {
        const data = await RegisterationModel.findOne({ email: email });
        if (!data) {
            throw new Error("User not registered");
        }
        if (decrypt(data.password) !== password) {
            throw new Error("Invalid password");
        }

        res.status(200).json({
            status: 'success',
            data
        })
    } catch (err) {
        res.status(404).json({
            status: "error",
            message: err.message
        })
    }
}