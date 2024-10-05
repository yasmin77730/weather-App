 let searchBtn=document.getElementById('searchBtn');
 let searchInput=document.getElementById('inputSearch');
let allData=[];



if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(function(position){
    console.log(position);
    let lat=position.coords.latitude;
    let long=position.coords.longitude;
    getData(`${lat},${long}`)

})}else{
  console.log('pc dont support')
}



searchInput.addEventListener('input',function(e){
getData(e.target.value)
})

searchBtn.addEventListener("click", function () {
  
  getData(searchInput.value);
});



  async function getData(query){
 try{
 let myData= await fetch(`http://api.weatherapi.com/v1/forecast.json?key=33c4dc9755b6496588e123831242909&q=${query}&days=3`);
 let response= await myData.json();
  console.log(response);
  allData=response;
  console.log(allData);
  displayData(allData);
}
 catch(error){
console.log(error);
 }
 }
  getData('cairo')



// display function to display data 
 function displayData()
 { 
console.log(allData)
let myArray=allData.forecast.forecastday;
let location= allData.location.name;
let temp=allData.current.temp_c;
let icon=allData.current.condition.icon;
let status=allData.current.condition.text ;
let humidity=allData.current.humidity;
let maxwind=allData.current.wind_kph;
console.log(maxwind);
console.log(humidity);
console.log(status);
console.log(icon);
console.log(temp);
console.log(location);
console.log(myArray);
  let cartouna='';
for(let i=0;i<myArray.length;i++){
  let date = getDay(myArray[i].date);
  console.log(date);

 
  cartouna+=`<div class="col-lg-4  forcast-today text-white rounded">
        <div class="forcast-header d-flex justify-content-between ">
        <div class="day">${date.day}</div>
        <div class="date">${date.numDay}${date.month}</div>
        </div>
        <div class="forecast-content mb-2 ">
          <div class="location my-3 fs-3">${location}</div>
          <div class="degree ">
            <div class="num ">${temp}</div>
            <div class=" mx-3 degree-icon">
              <img src=${icon} alt="">
            </div>
          </div>
          <div class="custom my-3">${status}</div>
          <span>
            <img src="images/icon-compass.png" alt="">${humidity}%
          </span>
          <span><img src="images/icon-umberella.png" class="ms-2" alt="">18km/h</span>
          <span><img src="images/icon-wind.png" class="ms-2" alt="">East</span>
        </div>
      </div>`
}
document.getElementById('demo').innerHTML=cartouna;
 }



// get Day
function getDay(x) {
  let date = new Date(x);

  let day = date.toLocaleString("en-Us", { weekday: "long" });

  let month = date.toLocaleString("en-Us", { month: "long" });
  let numDay=date.getDate();

  return {
    day,
    month,
    numDay,
  };
}
