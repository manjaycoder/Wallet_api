import ratelimiter from "../config/upStash.js";


const ratelimit=async (req,res,next)=>{
try {

    const {success}=await ratelimiter.limit("my-rate-limit")
    if(!success){
        return res.status(429).json({
            message:"TOO many requests ,please try again later"
        })
    }
    next();
} catch (error) {
    console.log("RATE LIMIT ERROR",error)
    next(error)
}
}
export default ratelimit