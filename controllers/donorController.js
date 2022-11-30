 const Donor = require('../model/donor')
 const User = require('../model/user')

 
 exports.postDonor =async (req,res,next)=>{

     const donor =await Donor.findOne({userId: req.userId})
     if(!donor){
        try{
            const userId = req.userId;
            console.log('userId', req.userId)
            const donor = new Donor({
                userId: userId,
                address: req.body.address,
                age: req.body.age,
                blood: req.body.blood,
                gender: req.body.gender,
                city: req.body.city,
            })
            const response = await donor.save()
            if(response){
                const user = await User.findByIdAndUpdate(userId, {isDonor:true})
                const userResponse = await user.save()
                console.log( 'userSetDonor' ,userResponse)
            }
            console.log(response)
    
        }
        catch(err){
            console.log(err)
            res.status(401).send({message: 'Cannot post donor', error: err})
        }
    
     }
     else{
        return res.status(401).send({message: 'Already registered as Donor'})
     }
     
 }
 exports.getDonors = async (req,res,next)=>{
    try{
        const donors = await Donor.find().populate('userId');
        return res.status(200).send({donors})
    }
    catch(error){
        console.log(error)
    }
}