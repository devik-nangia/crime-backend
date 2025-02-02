import bcryptjs from "bcryptjs"
import User from "../models/user.model.js"
import generateToken from "../lib/generateToken.js"

export const login = async (req, res) => {
    const {id, email, password} = req.body
    try {
        const user = await User.findById(id)
        
        if(!user){
            return res.status(400).json({message: "Incorrect user ID"})
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "incorrect password" })
        }

        generateToken(user._id, res)

        return res.status(200).json({message: "logged in successfully",
            data: {
                _id: user._id,
                email: user.email,
                isAdmin: user.isAdmin
            }
        })

    } catch (error) {
        console.log("error with login controller:", error)
        return res.status(500).json({message: "Internal server error"})
    }
}
export const signup = async (req, res) => {
    const { email, password, isAdmin } = req.body
    try {

        if (!password || !email) {
            return res.status(400).json({ message: "must fill all blanks" })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "password must be atleast 6 characters long" })
        }

        const saltPassword = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, saltPassword)

        const saltEmail = await bcryptjs.genSalt(10)
        const hashedEmail = await bcryptjs.hash(email, saltEmail)

        const users = await User.find({})

        for (const user of users) {
            const isEmailMatching = await bcryptjs.compare(email, user.email);
            if (isEmailMatching) {
                return res.status(400).json({ message: "User already exists" });
            }
        }

        const newUser = await User.create({
            email: hashedEmail,
            password: hashedPassword,
            isAdmin
        })

        if(newUser){
            generateToken(newUser._id, res)
            await newUser.save()
            return res.status(201).json({message: "user created successfully!",
                data: {
                    _id: newUser._id,
                    email: hashedEmail,
                }
            })
        }
    } catch (error) {
        console.log("error with signup controller:", error)
        return res.status(500).json({message: "Internal server error"})
    }
}
export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {
            maxAge: 0
        })
        return res.status(200).json({ message: "logged out successfully" })
    } catch (error) {
        console.log("error in logout controller:", error.message)
        return res.status(500).json({ message: "internal server error" })
    }
}

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("error in check auth controller", error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}