import express from "express"
import { addEmploye, deleteemp, getAllemp, getEmployedata, getwebip } from "./employesdata.js";
import cors from 'cors'
const app = express();

// This will iinstruct express that all req.body should be parsed as json
app.use(express.json());
// if we have have to apply on full stack react app 
// than cors will fix the cors error
app.use(cors());
app.get('/', (req, res) => {
   res.send({
    status:"success",
    message:"Hello World"
   })
})



app.get('/employee/:id',(req, res)=>{

try{
    let {id}=req.params;
    
    if(isNaN(parseInt(id))){
       return res.status(400).send({
            status:"error",
            message:"Invalid id"
        })
    }
    else{
       const iddata=parseInt(id)
       const employe=getEmployedata(iddata)

       if(employe){
        return res.send(
                {
                    status:"success",
                    data:employe
                }
            )
       }
       else{
        return res.status(404).send({
            status:"error",
            error:"Not Found :)"
        });
       }
    }  
}
catch(err){
   console.log(err)

  return res.status(500).send({
    status:'error',
    error:"internal error"
   })
}
    
    


   
})


// POST REQUEST

app.post('/products/create',(req,res)=>{

    const data=req.body;
    if((data.name && data.Department)){
         const addemp=addEmploye(data)

         return res.status(200).send({
            status:'successs',
            data:addemp
         })
    }
    else{
        return res.status(400).send({
            status:'error',
            error:"Invalid Data "
        })
    }
})


app.post('/getmeip',(req,res)=>{

    const data=req.body;
    // if((data.name && data.Department)){
    //      const addemp=addEmploye(data)

    //      return res.status(200).send({
    //         status:'successs',
    //         data:addemp
    //      })
    // }
    // else{
    //     return res.status(400).send({
    //         status:'error',
    //         error:"Invalid Data "
    //     })
    // }
    const ip=getwebip(data)
    return res.status(200).send({
        status:'successs',
        data:ip
     })
})

// Delete Request
app.delete('/products/:id',(req, res)=>{

    try{
        let {id}=req.params;
        
        if(isNaN(parseInt(id))){
           return res.status(400).send({
                status:"error",
                message:"Invalid id"
            })
        }
        else{
           const iddata=parseInt(id)
           const employe=deleteemp(iddata)
    
           if(employe){
            return res.send(
                    {
                        status:"success",
                        data:employe
                    }
                )
           }
           else{
            return res.status(404).send({
                status:"error",
                error:"Not Found :)"
            });
           }
        }  
    }
    catch(err){
       console.log(err)
    
      return res.status(500).send({
        status:'error',
        error:"internal error"
       })
    }

    })

    // Get ALL employees

    app.get('/products',(req, res)=>{
        const allemp=getAllemp();
       return res.status(200).send({
            status:"successs",
            data:allemp
        })
    })

app.listen(3008,()=>{
    console.log("Listining server on port 3008")
})