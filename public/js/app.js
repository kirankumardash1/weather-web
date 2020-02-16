

const weatherform = document.querySelector('form');
const search = document.querySelector('input');
var messageOne = document.querySelector('#message-1');
var messageTwo = document.querySelector('#message-2');
var messageThree = document.querySelector('#message-3');
var messageFour = document.querySelector('#message-4');
var messageFive = document.querySelector('#message-5');
var messageSix = document.querySelector('#message-6');
var messageSeven = document.querySelector('#message-7');


weatherform.addEventListener('submit',(e)=>{
    e.preventDefault();
    const inputlocation = search.value
    messageOne.textContent='Loading....';
    messageTwo.textContent='';
    messageThree.textContent='';
    messageFour.textContent='';
    messageFive.textContent='';
    messageSix.textContent='';
   messageSeven.textContent='';
    fetch('/weather?address='+inputlocation).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent=data.error;
            }else{
                console.log(data);
                messageOne.textContent ='location => '+ data.location;
                messageTwo.textContent = data.summary;
                messageThree.textContent = 'temprature => '+data.temperature;
                messageFour.textContent ='precipProbability => '+ data.precipProbability;
                messageFive.textContent = 'windspeed => '+data.windspeed;
                messageSix.textContent = 'windgust=> '+data.windgust
                messageSeven.textContent ='windbearing=> '+ data.windbearing
            }
           

        });
    });
    messageOne.textContent="checking of asynchronous programming";

})
