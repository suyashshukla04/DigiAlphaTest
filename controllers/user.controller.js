const User = require('../model/user.model');

const registerUser = async(req,res) =>{
    try{
        const obj = {
            firstName : req.body.firstName ? req.body.firstName : undefined,
            lastName : req.body.lastName ? req.body.lastName : undefined,
            email : req.body.email ? req.body.email : undefined,
            phone : req.body.phone ? req.body.phone : undefined
        }

        const user = await User.create(obj);

        return res.status(201).send({
            message : 'User got Created',
            user : user
        });

    }catch(err){
        console.log('Error inside registerUser Controller',err);
        return res.status(500).send({
            message : 'Internal Server Error'
        })
    }
}

const updateUser = async(req,res) =>  {
    try{
        const id = req.params.id;
        const userPresent = await User.findById(id);
        if(!userPresent){
            return res.status(400).send({
                message : 'User not found'
            })
        }

        const obj = {
            
            firstName : req.body.firstName ? req.body.firstName : undefined,
            lastName : req.body.lastName ? req.body.lastName : undefined,
            email : req.body.email ? req.body.email : undefined,
            phone : req.body.phone ? req.body.phone : undefined
        }
        const user = await User.findByIdAndUpdate(id,obj);
        const updatedUser = await User.findById(id);

        return res.status(200).send({
            message : 'User got updated',
            updatedUser
        })

    }catch(err){
        console.log('Error inside updateUser Controller',err);
        return res.status(500).send({
            message : 'Internal Server Error'
        })
    }
}

const getUser = async(req,res) => {
    try{
        const id  = req.params.id;

        const user = await User.findById(id);
        if(!user){
            return res.status(404).send({
                message : 'User not found'
            })
        }
        return res.status(200).send({
            message : 'User got',
            user : user
        })
        

    }catch(err){
        console.log('Error inside getUser Controller',err);
        return res.status(500).send({
            message : 'Internal Server Error'
        })
    }
}

const deleteUser = async(req,res)=> {
    try{
        const id = req.params.id;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).send({
                message : 'User not found'
            })
        }
        await User.deleteOne({_id : id});

        return res.status(200).send({
            message : 'User got Deleted'
        })

    }catch(err){
        console.log('Error inside deleteUser Controller',err);
        return res.status(500).send({
            message : 'Internal Server Error'
        })
    }
}

const getFilteredUser = async(req,res) => {
    try{
        const { firstName, lastName, email, phone } = req.query;

        const filter = {};
        if (firstName) filter.firstName = firstName;
        if (lastName) filter.lastName = lastName;
        if (email) filter.email = email;
        if (phone) filter.phone = phone;

        const users = await User.find(filter);
        if(users.length == 0){
            return res.status(400).send({
                message : 'User Not Exist'
            })
        }
        return res.status(200).send({
            filterUser : users
        })


    }catch(err){
        console.log('Error inside getFilteredUser',err);
        return res.status(500).send({
            message : 'Internal Server Error'
        })
    }
}



module.exports = {
    registerUser,updateUser,getUser,deleteUser,getFilteredUser
}