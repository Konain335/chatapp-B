import jwt from 'jsonwebtoken';

const jwtToken = (UserId , res)=>{
    const token = jwt.sign({UserId},process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
    res.cookie('jwt', token, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true,
        sameSite: 'strict',
        secure: true, // Set to true if using HTTPS
    }); 
}

export default jwtToken;