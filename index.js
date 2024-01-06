const BASE_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select")
const msg=document.querySelector(".msg");

for(let select of dropdowns){
    for (let Currcode in countryList){
       let newOption=document.createElement("option");
       newOption.innerText=Currcode;
       newOption.value=Currcode;
       if(select.name==="from" && Currcode==="USD"){
        newOption.selected="selected"
       }else if(select.name==="to" && Currcode==="INR"){
        newOption.selected="selected"
       }
       select.append(newOption);
    }
     
select.addEventListener("change",(e)=>{
    updateFlag(e.target);
}); 
}


const updateFlag=(element)=>{
let Currcode=element.value;
let countryCode=countryList[Currcode];
let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
let img=element.parentElement.querySelector("img");
img.src=newSrc;
}


btn.addEventListener("click",async (evt)=>{
   evt.preventDefault();
   let amount=document.querySelector(".amount input");
   let amtVal=amount.value;
   console.log(amtVal)
   if(amtVal==="" || amtVal<1){
    amtVal=1;
    amount.value="1";
   }


   console.log(fromCurr.value,toCurr.value)
   const url=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
   let response=await fetch(url);
   let data=await response.json();
   let rate=data[toCurr.value.toLowerCase()];
   let finalAmount=amtVal*rate;
   msg.innerText=`${amtVal} ${fromCurr.value}=${finalAmount} ${toCurr.value}`;
});

