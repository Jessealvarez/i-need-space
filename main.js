let searchButton = document.querySelector("#search");

let apiKey = document.querySelector("#api-key")

let addressInput = document.querySelector("#address");

let noradId = document.querySelector("#norad");

let timeHere = document.querySelector("#time-here");

let latNumber = 0;
let longNumber = 0;

searchButton.addEventListener('click',function(){
    let apiKey = '';
    let address = addressInput.value;
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${apiKey}`;
    
    let norad = noradId.value;

    fetch(url)
    .then(function (httpResponse){
        //console.log(httpResponse.json())
        return httpResponse.json();
        
    })
    .then(function (data){
        console.log(data.features[0].center[1]);
        //return data;
         latNumber = data.features[0].center[1];
         longNumber = data.features[0].center[0];

       
    })
    let noradUrl = `https://satellites.fly.dev/passes/${norad}?lat=${latNumber}&lon=${longNumber}&limit=1&days=15&visible_only=true`;

   fetch(noradUrl)
   .then(function (httpResponse){
       //console.log(httpResponse.json());
        return httpResponse.json();
     })
    .then(function(data){
        // console.log(data[0].culmination.utc_datetime);
        // console.log(data[0].rise.utc_datetime);
        // console.log(data[0].set.utc_datetime);

        let culminatejson = data[0].culmination.utc_datetime
        let culminate = new Date(culminatejson);

        let risejson = data[0].rise.utc_datetime;
        let rising = new Date(risejson);

        let setjson = data[0].set.utc_datetime;
        let setting = new Date(setjson);

        const culmination = document.createElement("div");
        culmination.className = "row";

        const rise = document.createElement("div");
        rise.className = "row";

        const set = document.createElement("div");
        set.className = "row";

        timeHere.appendChild(culmination);
        timeHere.appendChild(rise);
        timeHere.appendChild(set);

            culmination.innerText = `Culminate at: ${culminate}`;
            rise.innerText = `Rise at: ${rising}`;
            set.innerText = `Set at: ${setting}`;

    })


});


//console.log out the UTC date/time at which the satellite will rise, culminate, and set.