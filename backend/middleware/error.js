const ErrorHandler=require("../utils/errorhander");

module.exports=(err,req,res,next)=>{
err.statusCode=err.statusCode || 500;
err.message = err.message || "Internal Server Error";





///Wrong mongodb id error mongodb m id chhoti bdi kr dene pe y error kam aayega caste error
if(err.name==="CastError"){
    const message=`Resource not fount . Invalid: ${err.path}`;
    err=new ErrorHandler(message,400);//400 bad request
}



//Mongoose duplicate key error
if(err.code===11000){
    const message=`Duplicate ${Object.keys(err.keyValue)} Entered`;
    err=new ErrorHandler(message,400);
}




//////////////////////////////////
//Wrong JWT error
if(err.name=="JsonWebTokenError"){
    const message=`Json Web Token is invalid , Try again`;
    err=new ErrorHandler(message,400);
}

//JWT Expire error
if(err.name=="TokenExpiredError"){
    const message=`Json Web Token is Expired, Try again`;
    err=new ErrorHandler(message,400);
}
//////////////////////////////////

res.status(err.statusCode).json({
    success:false,
    message:err.message,
});
};