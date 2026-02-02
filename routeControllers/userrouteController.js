import User from "../Models/userModels.js";
import bcrypt from "bcryptjs";
import jwtToken from "../utils/jwtwebToken.js";



export const userRegister = async (req, res) => {
    try {
        const { fullname, username, email, password, gender, profilepic } = req.body;

        //user ka email or user agar already ho.    
        const user = await User.findOne({ username, email });
        if (user) return res.status(500).send({ success: false, message: "User or Email already exists" });

        //password hash kiya ha.
        const hashPassword = bcrypt.hashSync(password, 10);

        //user ka profilepic lagana ha.
        const profileBoy = profilepic || `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const profileGirl = profilepic || `https://avatar.iran.liara.run/public/girl?username=${username}`;

        //new user create kiya ha.
        const newUser = new User({
            fullname,
            username,
            email,
            password: hashPassword,
            gender,
            profilepic: gender === 'male' ? profileBoy : profileGirl
        })

        if (newUser) {
            await newUser.save();
            jwtToken(newUser._id, res);
        } else {
            res.status(500).send({ success: false, message: "Invalid user data" });
        }

        // agar oper wali condition true ho.
        res.status(201).send({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            email: newUser.email,
            profilepic: newUser.profilepic,
        })



    } catch (error) {
        res.status(500).send({ success: false, message: error });
        console.log(error);
    }


}

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })

        if (!user) return res.status(500).send({ success: false, message: "Email does not exist" });

        const comparePass = bcrypt.compareSync(password, user.password || "");

        if (!comparePass) return res.status(500).send({ success: false, message: "Email or Password does not match" });

        jwtToken(user._id, res);

        res.status(200).send({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilepic: user.profilepic,
            email: user.email,
            message: "Successfully Login"
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
        console.log(error);
    }
}


export const userLogout = async (req, res) => {
    try {
        res.cookie('jwt', '', {
            maxAge: 0
        });
    
        res.status(200).send({ message: "Successfully logged out" });
    
    } catch (error) {
    
        res.status(500).send({ success: false, message: error.message });
        console.log(error);
    
    }}
            

