const regex = require('./validationCheck');
const User = require('../model/user.model');


const fieldCheck = async(req,res,next) => {
    try{
        if(!req.body.firstName){
            return res.status(400).send({
                message : 'firstName is not provided'
            })
        }
        if(!req.body.lastName){
            return res.status(400).send({
                message : 'lastName is not provided'
            })
        }
        if(!req.body.email){
            return res.status(400).send({
                message : 'email not provided'
            })
        }
        if(!req.body.phone){
            return res.status(400).send({
                message : 'Phone number not provided'
            })
        }
        next();

    }
    catch(err)
    {
        console.log('Error inside fieldCheck Middleware',err);
        return res.status(500).send({
            message : 'Internal Server Error'
        })
    }
}

const typeCheck = async (req,res,next) => {
   try{
    if(req.body.firstName){
        if(!regex.nameRegex.test(req.body.firstName)){
            return res.status(400).send({
                message : 'firstName format is incorrect'
            })
          }
    }
     
    if(req.body.lastName){
        if(!regex.nameRegex.test(req.body.lastName)){
            return res.status(400).send({
                message : 'lastName format is incorrect'
            })
          }
    }
      if(req.body.email){
        if(!regex.emailRegex.test(req.body.email)){
            return res.status(400).send({
                message : 'email format is incorrect'
            })
          }
      }
      
      if(req.body.phone){
        if(!regex.phoneRegex.test(req.body.phone)){
            return res.status(400).send({
                message : 'Phone format is incorrect'
            })
          }
      }
      

    next();

   }catch(err)
   {
    console.log('Error inside typeCheck Middleware',err);
    return res.status(500).send({
        message : 'Internal Server Error'
    })
   }
}

const uniqueCheck = async (req,res,next) => {
    try{
        const {email,phone} = req.body;
        const id = req.params.id;
        const user = await User.find({email});
        if(user.length!=0 && user[0]._id!=id){
            return res.status(400).send({
                message : 'Email already Present'
            })
        }
        const user2 = await User.find({phone});
        if(user2.length!=0 && user2[0]._id != id){
            return res.status(400).send({
                message : 'phone Number already Present'
            })
        }
        next();
    }
    catch(err){
        console.log('Error inside uniqueCheck Middleware',err);
        return res.status(500).send({
            message : 'Internal Server Error'
        })
    }
}

module.exports = {
    fieldCheck,typeCheck,uniqueCheck
}