const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator/check')

exports.postSignup = async (req,res,next)=>{
    console.log(req.body)
    const image = req.file;
     console.log('image', image.filename)
    const errors = validationResult(req);
    console.log('validation errors',errors.array().length >0)
    if(errors.array().length > 0){
     return  res.status(400).send({msg:errors.array(), status:'danger',code:400})
    }
    try{
        const username = req.body.username;
        const phoneNo = req.body.phoneNo;
        const email = req.body.email;
        const password = req.body.password;
        const image = req.file;
    
        const hashedPassword =await bcrypt.hash(password, 12)
            const user = new User({
                username: username,
                phoneNo:phoneNo,
                email: email,
                password: hashedPassword,
                imageUrl: image.filename,
            })
            const createdUser = await user.save()
            if(createdUser){
                return res.status(200).send({status: 'ok'})
            }
        }
    catch(error){
        console.log(error)
        res.status(400).send(error)
    }
}

exports.postLogin =async (req,res,next)=>{    
    const email = req.body.email;
    const password = req.body.password;
    const user =await User.findOne({email: email});
    if(!user){
       return res.status(401).send({message: 'User does not exist'})
        const error = new Error('User does not exist');
        error.statusCode = 404;
        next(error)
    }
    let loadedUser = user;
    req.userId = loadedUser._id.toString()
    console.log('req user id', req.userId)
    const doMatch = await bcrypt.compare(password, user.password)
        if(doMatch){
            console.log('User is logged in')
            const token = jwt.sign({
                email: loadedUser.email,
                userId:loadedUser._id.toString()
            },
            'thisIsTheSecretKeyPart',
            {
                expiresIn:'3600000'
            }
        )
            // req.session.token = token 
            // console.log(req.session)
            res.status(201).json({
                'result': 'User successfully loged in',
                token:token,
                user: loadedUser,
                userId: loadedUser._id.toString()
            })
    }
        else{
            res.status(401).send({message: "Password does not match"})
           const error = new Error('Password does not match');
           error.statusCode = 400;
           next(error); 
        }
}


// exports.logout = (req,res,next)=>{
//     req.session.destroy(err => {
//         if(err){
//             console.log(err);
//         } else {
//             res.send('Session is destroyed')
//         }
//     })
// }
