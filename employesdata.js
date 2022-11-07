import fs from 'fs'
import dns from 'dns'
// const empdata=[
//     {
//     "name":"Akshay",
//     "Department":"Tech",
//     "Employeid":1
// },

// ]

// Read Data From Json File
export function readempdata(){
    const allEmployees=fs.readFileSync('./products.json',{
        encoding:"utf-8"
    });

    return JSON.parse(allEmployees);
}


// Add -> we read from file,we insert intem in the array,then write back to disk
export function writeAllemp(empdata){
    const data=JSON.stringify(empdata,null,2);

    fs.writeFileSync('./products.json',data,{
        encoding:"utf-8"
    })
}

// const webdata=[
//     {
//     "website_name":"masaischool.com"
// }

// ]
export  function getwebip(data){
    let{
        website_name
        
    }=data;
    // const dns = require('dns');
    let value=0;
    var ipaddress="3.109.116.122"
    let ip="";
dns.resolve4(website_name, (err,address) => {
    console.log("add",address[0])
    // ipaddress= showdata(address[0]);
    //  return   address;
});

//  console.log("value",ip)
 return ipaddress;
}

function showdata(value){
console.log("myfun",value)
return value;
}
export function getEmployedata(id){

    // implementation
    const empdata=readempdata()


   const employee= empdata.find(employee => employee.id===id)
   return employee;
}


export function addEmploye(data){
    const empdata=readempdata()
    let maxAvalabelid=0;
    
    for(const employee of empdata) {
        if(maxAvalabelid<employee.id) {
            maxAvalabelid=employee.id;
        }
    }

    let{
        name,
        Department,
        
    }=data;

    let employee={
        name,Department,
        id:maxAvalabelid +1
    }

    empdata.push(employee);

    writeAllemp(empdata)
    return employee;
}
 

export function deleteemp(id){

    const empdata=readempdata()
    let idx=null;
    empdata.forEach((employee,index)=>{
        if(employee.id===id){
            idx=index;
        }
    })

    if(idx===null){
        throw new Error("Employe not found")
    }
    else{
        const employee=empdata.splice(idx, 1)
        writeAllemp(empdata)
        return employee;
    }
}


export function getAllemp(){
    const empdata=readempdata();
    return empdata;
}