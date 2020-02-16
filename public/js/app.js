

const weatherform = document.querySelector('form');
const search = document.querySelector('input');
var messageOne = document.querySelector('#message-1');
var messageTwo = document.querySelector('#message-2');


weatherform.addEventListener('submit',(e)=>{
    e.preventDefault();
    const inputlocation = search.value
    messageOne.textContent='Loading....';
    messageTwo.textContent='';
    fetch('/weather?address='+inputlocation).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent=data.error;
            }else{
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
           

        });
    });
    messageOne.textContent="checking of asynchronous programming";

})
