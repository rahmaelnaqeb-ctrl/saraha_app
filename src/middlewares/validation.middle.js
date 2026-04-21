

//validate (compare(schema,data))
export const Validation=(schema)=>{
 
    return (req,res,next)=>{
        /// data >>user
        // 2 data
        const data={...req.body,...req.params,...req.query}

        //compare
        const result=schema.validate(data,{abortEarly:false});

        if(result.error){
            const errorMessage=result.error.details.map((obj)=>obj.message)
            return res.json({message:"validation error",errorMessage})
            // return next("validation error",(errorMessage))
        }
        return next()
    }
}


/**
 * req.body{
 * username,
 * email
 * }
 * 
 */