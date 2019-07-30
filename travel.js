
search=()=>{
	var from=document.getElementById('from').value
	var to=document.getElementById('to').value
	var date=document.getElementById('dates').value
	var display=document.getElementById('displayBox')
	console.log(from)
	console.log(to)
	console.log(date)
	const url=`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/IN/SCR/en-US/${from}-sky/${to}-sky/${date}`
	fetch(url,{
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Host':'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
			'X-RapidAPI-Key':'a14352e63bmshc71f964194fb69cp1f2941jsn53610249fef0'
        },
        
        
    }).then(res=>res.json()).then(data=>{
		console.log(data);
		details = data['Carriers'];
		console.log(details);

    	// let flightId=data.Quotes[0].OutboundLeg.CarrierIds[0]
    	// let price=data.Quotes[0].MinPrice
    	// let name="NULL"
    	// data.Carriers.map((d)=>{
    	// 	if(d.CarrierId === flightId ){
    	// 		name=d.Name
    	// 	}
    	// })

    	// let tags='<div>'
    	// tags+=`<h6>FlightName:</h6><h5>${name}</h5>`
		// tags+=`<h6>Price:</h6><h5>${price}</h5>`
		tags = "<div>"
		for(var i=0;i<details.length;i++){
			tags += "<h6> Flight ID : </h6><h5>" + details[i]['CarrierId'] + "</h5>";
			tags += "<h6> Flight Name : </h6><h5>" + details[i]['Name'] + "</h5> <br/> <hr>"; 
		}
		quote = data.Quotes[0];
		tags += "<h6> Cheapest Option : </h6><h5> Flight ID : " + quote.OutboundLeg.CarrierIds[0] + " :: Price :" + quote.MinPrice + "</h5> <br/>";
    	tags+=`</div>`

    	display.innerHTML=tags

    })

}

