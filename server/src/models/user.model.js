import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';


const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'name field is required'],
            trim: true,
            maxLength: [50, 'Name can not be more than 50 characters']
        },
        email: {
            type: String,
            required: [true, 'email field is required, Please add an email'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email',
            ],
        },
        password: {
            type: String,
            required: [true, 'Password field is required'],
            minlength: [8, "Password must be at least 8 characters"],
            select: false,
        },
        company_name: {
            type: String,
            required: [true, 'Company name is required'],
        },        
        dob: {
            type: String,
            required: [true, 'Date of birth is required'],
        }, 
        avatar: {
            type: String,
            required: [true, 'Avatar is required'],
        },
        authenticationOTPToken: String,
    },
    {
        // Enable timestamps for createdAt and updatedAt fields
        timestamps: true,
        // Enable virtual fields for mongoose inorder to use them inorder to avoid error
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        // Enable strict query for mongoose inorder to avoid error 
        strictQuery: "throw"
    }
);

// Hashing password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
},);

// Compare password
userSchema.methods.comparePassword = async function (incomingPassword) {
    return await bcrypt.compare(incomingPassword, this.password);
};

// Virtual field for total number of enrolled courses
userSchema.virtual('age').get(function () {
    const age = new Date().getFullYear() - new Date(this.dob).getFullYear();
    return age;
})


export const User = model('User', userSchema);

