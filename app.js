const BASE_URL =
  " http://free.currencyconverterapi.com/api/v5/convert?q=EUR_USD&compact=y";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdowns){
    for (currCode in countryList) {
        let newOption =document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if (select.name === "from" && currCode==="USD"){
            newOption.selected="selected";  
        }else if (select.name === "to" && currCode==="PKR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("click", (evt)=>{
        updateflag(evt.target);
    });
}

const updateExchangeRate = async () => {
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval==="" || amtval < 1){
        amtval=1;
        amount.value= "1";
    }
    // console.log(fromCurr.value, toCurr.value); 
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json(); 
    let rate=data[toCurr.value.toLowerCase()];
    let finalamount=amtval * rate;
    msg.innerText=`${amtval} ${fromCurr.value} = ${finalamount} ${toCurr.value}`;
}

const updateflag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src=newSrc; 
}

btn.addEventListener("click", (evt)=>{
    evt.preventDefault(); 
    updateExchangeRate(); 
})

window.addEventListener("load", () => {
    updateExchangeRate();
  });

