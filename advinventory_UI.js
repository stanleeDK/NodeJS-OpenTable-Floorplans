var http = require("https"); 
var express = require("express");
var expressHbs = require("express-handlebars");

var url = "https://gc-ci-uswest2.otenv.com/api/restaurant/168040/floorplan"; 
var url2 = "https://gc-ci-uswest2.otenv.com/setup/api/restaurant/168040/shifts"; 

var app = express();
app.engine('hbs', expressHbs({extname:'hbs'/*, defaultLayout:'main.hbs'*/}));
app.set('view engine', 'hbs');


//console.log("hello test");
//var drCallBackCount = 0; 

app.get("/",function(req,res)
{
	console.log("req recieved");
	//res.send('Advanced Inventory awwyeah');
	getFloorPlan(res);
	//getSchedule();
	/* simple data rendering */
	//var data = {name: "Laudrup"};
	

});



app.listen(8000);
console.log("Server Started");


function getSchedule()
{
	http.get(url, function(response)
	{
		var payLoad=""; 
		response.on("data",function(chunk)
		{
			payLoad = payLoad + chunk; 
		});
		response.on("end", function()
		{
			var schedule; 
			console.log("Schedule data  recieved.");
			schedule = JSON.parse(payLoad);

			console.log(schedule);

		});
	});
}


function getFloorPlan(res)
{
	http.get(url, function(response)
	{

		var jsonBlob = "";

		//console.log(response.statusCode);
		//response.setEncoding("utf8");
		response.on("data",function(chunk)
		{
			jsonBlob = jsonBlob + chunk; 
	//		console.log("dr");
	//		drCallBackCount++;
		})

		response.on("end", function()
		{
			console.log("Floorplan data recieved.")
			finaloutput = JSON.parse(jsonBlob);
			
			var floorplans = new Object();
			floorplans.finaloutput = finaloutput;
			console.log(finaloutput.length);
			
			//console.log(finaloutput);
			//res.send(finaloutput);
			res.render('tables',floorplans);	

		/*
		var basketballPlayers = [
	    {name: 'Lebron James', team: 'the Heat'},
	    {name: 'Kevin Durant', team: 'the Thunder'},
	    {name: 'Kobe Jordan',  team: 'the Lakers'}
	  	];
		
	  	var days = [
	    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
	  	];
	  	

	  	
	  	var data = {
	    //basketballPlayers: basketballPlayers,
	    days: days
	  	};

  		res.render('tables',data);
		*/

		})
	})	
}