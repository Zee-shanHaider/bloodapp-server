const User = require('../model/user')
const Donor = require('../model/donor')
const Request = require('../model/request')

exports.getDonors = async (req,res,next)=>{
    try{
        const donors = await Donor.find();
        console.log("donors",donors)
        return res.status(200).send({donors: donors})
    }
    catch(error){
        console.log(error)
    }
}

exports.postRequest =async (req,res,next)=>{
    const blood = req.body.blood;
    const address = req.body.address;
    const city = req.body.city;
    const prescription = req.file;
    const message = req.body.message;
    // const lat = req.body.lat;
    // const lng = req.body.lng;
    const requestCreator = req.userId;
    try{
        const request = new Request({
            blood:blood,
            address: address,
            city: city,
            prescription: prescription.filename,
            message: message,
            requestCreator: requestCreator
        })
        const response = await request.save()
        if(response){
            res.status(201).send({status: 'ok'})
        }
    }
    catch(error){
        console.log(error)
    }
}

exports.getRequests = async (req,res,next)=>{
    try{
        const requests = await Request.find();
        return res.status(200).send({data: requests})
    }
    catch(error){
        console.log(error)
    }
}