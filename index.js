let url="https://ancient-dusk-73183.herokuapp.com/api/employee"

let page=1

//we have to get the data
let getData=async()=>{
    let res=await fetch(`${url}?_limit=5&_page=${page}`);
    res=await res.json()
    renderDom(res);
}

getData()

let addEmployee=async()=>{
    //input box se data lena hai
    let name=document.getElementById("name").value;
    let Batch=document.getElementById("batch").value;
    let Course=document.getElementById("course").value;
    let Age=document.getElementById("age").value;
    let mobile=document.getElementById("mobile").value;
    let ES=document.getElementById("es").value;

    //need a data structure to store data
    // console.log(typeof(Age))
    // Age=+Age;
    // console.log(typeof(Age))
    Age=+Age
    let user_data={
        name,Batch,Course,Age,mobile,ES,status:true,
    };

    //we need to send the data so we will mak post request

    let res= await fetch(url,{
        method:'POST',
        // mode:"no-cors",
        body:JSON.stringify(user_data),
        headers:{
            "Content-Type":"application/json"
        }
       
    })
   // console.log(res)
   //after get employee we need get everytime also
   getData()


document.getElementById("name").value=null;
document.getElementById("batch").value=null;
document.getElementById("course").value=null;
document.getElementById("age").value=null;
document.getElementById("mobile").value=null;
document.getElementById("es").value=null;
};

//show the data on dom

let renderDom=(data)=>{
    let container=document.getElementById("container")
    container.innerHTML=null;
    data.forEach(({name,Batch,Course,Age,mobile,ES,status,id})=>{
        let div=document.createElement("div");
        let nm=document.createElement("h3");
        nm.innerText=`Name: ${name}`//=`$ ${ele.price}`
        let b=document.createElement("h3");
        b.innerText=`BATCH: ${Batch}`;
        let C=document.createElement("h3");
        C.innerText=`COURSE :${Course}`;
        let A=document.createElement("h3");
        A.innerText=`AGE: ${Age}`;
        let M=document.createElement("h3");
        M.innerText=` MOBILE NO: ${mobile}`;
        let E=document.createElement("h3");
        E.innerText=`EVALUATION SCORE: ${ES}`;
        let S=document.createElement("h3");
        S.innerText=`STATUS : ${status}`;
        let I=document.createElement("h3");
        I.innerText=`ID: ${id}`;
        //delete
        let delete_btn=document.createElement("button");
        delete_btn.innerText="REMOVE"
        delete_btn.onclick=()=>{
            remove(id)
        }
        //toggle
        let toggle_btn=document.createElement("button");
        toggle_btn.innerText="TOGGLE"
        toggle_btn.onclick=()=>{
            toggle(status,id)
        }

        //if some added wrong age we want to update it

        let btn=document.createElement("button")
        btn.innerText="Update Age"
        btn.onclick=()=>{
            updateAge(id)
        }
        div.append(nm,b,C,S,A,M,E,S,I,btn,delete_btn,toggle_btn)
        container.append(div)
    })
    
};

let updateAge=async(id)=>{
//create a modal
//we can use window.prompt
let value=window.prompt("Enter new Age")
// console.log(value)
let age_obj={Age:value};
let res=await fetch(`${url}/${id}`,{
    method:"PATCH",
    body:JSON.stringify(age_obj),
    headers:{
      "Content-Type":"application/json"  
    }
    
})
// console.log(res)
getData();
}
//////
let sortLH=async()=>{
let res=await fetch(`${url}?_sort=Age&_order=asc`)
res=await  res.json()
renderDom(res)
console.log(res)
};

let sortHL=async()=>{
    let res=await fetch(`${url}?_sort=Age&_order=desc`)
    res=await res.json()
    renderDom(res)
};
//pagination
let next= async()=>{

++page;
getData()
}

let previous=async()=>{
  if(page==0){
    return ;
  }
    --page
    getData()

}
////remove
let remove=async(id)=>{
    let res=await fetch(`${url}/${id}`,{
        method:"DELETE"
    })
    res=await res.json()
    getData()

}
let toggle=async(status,id)=>{
    let toggle_status={status:!status};
    let res=await fetch(`${url}/${id}`,{
        method:"PATCH",
        body:JSON.stringify(toggle_status),
        headers:{
          "Content-Type":"application/json"  
        }
        
    })
    // console.log(res)
    getData();
    }

 let fil_data= async()=>{

    let data=document.getElementById("filter").value
    // console.log(data)
    let fil=document.getElementById("fil").value
    console.log(fil)
    if(data==="Age"){
        fil=+fil
    }
    let res=await fetch(`${url}?_limit=5&_page=${page}&${data}=${fil}`);
    res=await res.json()
    renderDom(res);
 }

 let fillt=async()=>{
let dt=document.getElementById("filt").value
// console.log(dt)
let res=await fetch(`${url}?_limit=5&_page=${page}&Course=${dt}`);
res=await res.json()
    renderDom(res);
 }

 
// filtering
//url?name=
//url?