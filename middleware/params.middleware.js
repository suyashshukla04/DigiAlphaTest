
const checkParams = async(req,res,next) => {
    try{
        if(!req.params.id){
            return res.status(400).send({
                message : 'Please provide params Id'
            })
        }
        next();

    }catch(err){
        console.log('Error inside check params',err);
        return res.status(500).send({
            message : 'Internal Server Error'
        })
    }
}

module.exports = {
    checkParams
}