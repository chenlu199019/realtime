var directionsService = new google.maps.DirectionsService();
directionsDisplay = new google.maps.DirectionsRenderer();

function RoadControl(controlDiv) {
  	controlDiv.style.padding = '5px';

  	// Set CSS for the control border
  	var controlUI = document.createElement('div');
  	controlUI.style.backgroundColor = 'white';
  	controlUI.style.borderStyle = 'solid';
  	controlUI.style.borderWidth = '2px';
  	controlDiv.appendChild(controlUI);

  	// Set CSS for the control interior
  	var controlText = document.createElement('div');
  	controlText.style.width = '263px';
  	controlText.style.height = '25px';
  	controlText.style.paddingLeft = '4px';
  	controlText.style.paddingRight = '4px';
  	controlText.style.background = 'url(image/road.jpg) no-repeat';
  	controlUI.appendChild(controlText);
}

function initialize(){
	console.log("enter initialize function");
	var winHeight=0;
	//获取窗口高度
	if (window.innerHeight) {
		winHeight = window.innerHeight;
	}
	else if ((document.body) && (document.body.clientHeight)) {
		winHeight = document.body.clientHeight;
	}
	//通过深入Document内部对body进行检测，获取窗口大小
	if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
		winHeight=document.documentElement.clientHeight;
	}
	if (document.getElementById("Siderbar")) {
		document.getElementById("Siderbar").style.height = (winHeight-110) + "px";
	}
	if (document.getElementById("Content")) {
		document.getElementById("Content").style.height = (winHeight-110) + "px";
	}
	//设置选项卡高度
	if (document.getElementById("wrap")&&(document.getElementById("Siderbar"))) {
		document.getElementById("wrap").style.height = (document.getElementById("Siderbar").clientHeight - 230) + "px";
		//tab_c
		var tab_c = document.getElementById("tab_c");
        var tab_c_li = tab_c.getElementsByTagName("div");
        var len = tab_c_li.length;
        var i = 0;
        for(i = 0;i<len;i++)
        {
        	tab_c_li[i].style.height = (document.getElementById("Siderbar").clientHeight - 300) + "px";
        }
	}
	
	var myLatlng = new google.maps.LatLng(1.295343, 103.773814);
    var mapOptions = {
        center: myLatlng,
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scaleControl: true,
        scaleControlOptions: {
        	position: google.maps.ControlPosition.LEFT_BOTTOM,
    	}
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    var RoadControlDiv = document.createElement('div');
    var roadControl = new RoadControl(RoadControlDiv);
    RoadControlDiv.index = 1;
  	map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(RoadControlDiv);
  	
  	//////////////////marker area
  	/////////////////
  	marker1 = new google.maps.Marker({
      	draggable:true,
		animation: google.maps.Animation.DROP,
      	title: 'start point'
  	});
  	google.maps.event.addListener(marker1, 'click', function(){
		if (marker1.getAnimation() != null) {
    		marker1.setAnimation(null);
  		} else {
    		marker1.setAnimation(google.maps.Animation.BOUNCE);
  		}
	});
	
	
	marker2 = new google.maps.Marker({
      	draggable:true,
		animation: google.maps.Animation.DROP,
      	title: 'end point'
  	});
  	google.maps.event.addListener(marker2, 'click', function(){
		if (marker2.getAnimation() != null) {
    		marker2.setAnimation(null);
  		} else {
    		marker2.setAnimation(google.maps.Animation.BOUNCE);
  		}
	});

	  infowindow1 = new google.maps.InfoWindow({});
  	
  	infowindow2 = new google.maps.InfoWindow({});

  	google.maps.event.addListener(marker1, 'click', function(){
		infowindow1.open(map,marker1);
	});
	
	google.maps.event.addListener(marker2, 'click', function(){
		infowindow2.open(map,marker2);
	});

	///car image for google
	var image1 = 'image/car2.png';
	carggm = new google.maps.Marker({
  		icon: image1,
  		draggable:false,
		animation: google.maps.Animation.DROP,
  	});


  	///// recommend route car image
  	var image2 = 'image/car1.png';
  	carhgm = new google.maps.Marker({
  		icon: image2,
  		draggable:false,
		animation: google.maps.Animation.DROP,
  	});

  	routePath = new google.maps.Polyline({
    	strokeColor: "#272727",
    	strokeOpacity: 0.7,
    	strokeWeight: 5,
    	visible: false,
  	});

  	googleroutePath = new google.maps.Polyline({
    	strokeColor: "#FF00D2",
    	strokeOpacity: 0.7,
    	strokeWeight: 5,
    	visible: false,
  	});

  	routePath_con = new Array();
  	
  	googleroutePath_con = new Array();

  	directionsDisplay.setPanel(document.getElementById('google'));
  	//driving = new BMap.DrivingRoute("北京", {renderOptions: {panel: "baidu", autoViewport: true}});
  	
  	var ContextMenuControlDiv = document.createElement('DIV');   
    var ContextMenuControl = new createContextMenu(ContextMenuControlDiv, map);   
  
    ContextMenuControlDiv.index = 1;   
    /*增加层的方式*/  
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(ContextMenuControlDiv);	
}//////// end of initialize function

function createContextMenu(controlUI,map) {
    var contextmenu = document.createElement("div");   
    contextmenu.style.display = "none";   
    contextmenu.style.background = "#ffffff";   
    contextmenu.style.border = "10px solid #FFFFFF";
    contextmenu.innerHTML =    
    "<a href='javascript:choosestart()'><div class='context' style='margin-bottom:5px'> 以此为起点 </div></a>"
    + "<a href='#' onclick='javascript:chooseend()'><div class='context'> 以此为终点 </div></a>";   
    controlUI.appendChild(contextmenu);   
    /*给整个地图增加右键事件监听*/  
    google.maps.event.addDomListener(map, 'rightclick', function (event) {   
  
        // 起始 方法详细内容   
        document.getElementById("pointhide").value = event.latLng.lat() + "," + event.latLng.lng();
        //结束 方法详细内容   
        contextmenu.style.position="relative";   
        contextmenu.style.left=(event.pixel.x-80)+"px"; //平移显示以对应右键点击坐标   
        contextmenu.style.top=event.pixel.y+"px";   
        contextmenu.style.display = "block"; 
    });   
    /*点击菜单层中的某一个菜单项，就隐藏菜单*/  
    google.maps.event.addDomListener(controlUI, 'click', function () {   
        contextmenu.style.display = "none";   
    });   
       
    google.maps.event.addDomListener(map, 'click', function () {   
        contextmenu.style.display = "none";   
    });   
    google.maps.event.addDomListener(map, 'drag', function () {   
        contextmenu.style.display = "none";   
    });   
  
  }////// end of the createContextMenu function

  function choosestart()
{
	document.getElementById("start").value = document.getElementById("pointhide").value;
	var startq=document.getElementById('start').value;
	var temp1 = startq.split(",");
	marker1.set('position',new google.maps.LatLng(parseFloat(temp1[0]), parseFloat(temp1[1])));
	marker1.setMap(map);
	
	removehana();
	removegoogle();
	removebaidu();
  }///// end of choose start function


  function chooseend(lat,lng)
{
	document.getElementById("end").value = document.getElementById("pointhide").value;
	var endq=document.getElementById('end').value;
	var temp2 = endq.split(",");
	marker2.set('position',new google.maps.LatLng(parseFloat(temp2[0]), parseFloat(temp2[1])));
	marker2.setMap(map);
	removehana();
	removegoogle();
	removebaidu();
}/// chooseend function


function googlecalcRoute() {
	removehana();
	document.getElementById("map_canvas").style.display = "block";
	document.getElementById("map_canvas_baidu").style.display = "none";
  	var start = document.getElementById('start').value;
  	var end = document.getElementById('end').value;
  
  	var temp1 = start.split(",");
	var temp2 = end.split(",");
	
	marker1.set('position',new google.maps.LatLng(parseFloat(temp1[0]), parseFloat(temp1[1])));
	marker1.setMap(map);
	
	marker2.set('position',new google.maps.LatLng(parseFloat(temp2[0]), parseFloat(temp2[1])));
	marker2.setMap(map);
	
	map.setCenter(new google.maps.LatLng((parseFloat(temp1[0])+parseFloat(temp2[0]))/2, (parseFloat(temp1[1])+parseFloat(temp2[1]))/2));
	map.setZoom(12);
	
	googleroutePath.setMap(map);

  	var request = {
      	origin:new google.maps.LatLng(parseFloat(temp1[0]), parseFloat(temp1[1])),
      	destination:new google.maps.LatLng(parseFloat(temp2[0]), parseFloat(temp2[1])),
      	travelMode: google.maps.DirectionsTravelMode.DRIVING
  	};
  	directionsService.route(request, function(response, status) {
    	if (status == google.maps.DirectionsStatus.OK) {
      		directionsDisplay.setDirections(response);
      		
      		var Coordinates = new Array();
      		
      		var temp = response.routes[0].overview_path;
      		//alert(temp.length);
      		for(var j = 0;j<temp.length;j++)
      		{
      			Coordinates.push(new google.maps.LatLng((temp[j].lat()), (temp[j].lng())));
      		}	
      		
      		googleroutePath.setPath(Coordinates);
      		
      		carggm.setMap(map);
      		carggm.set('position',Coordinates[0]);
      		i=0;
      		pathsnum=Coordinates.length;
 			function resetMkPoint(i){
 				carggm.set('position',Coordinates[i]);
 				if(i < pathsnum){
 					setTimeout(function(){
 						i++;
 						resetMkPoint(i);
 					},150);
 				}
 				}
 			setTimeout(function(){
 				resetMkPoint(0);
 			},150);
			var query = "query=google";
  			for(var k = 0;k<Coordinates.length;k++)
      		{
      			query = query + "," + Coordinates[k].lat() + "," + Coordinates[k].lng();
      		}
  			roadcondition(query);
    	}
  	});
}/////// end of calculate route for google

function comparewithgg()
{
	process();
	googlecalcRoutecmp();
}////////compare with google map

function removehana()
{
	//去除图标
	carhgm.setMap(null);
	map_baidu.removeOverlay(carhbm);
	//去除动画路线
	routePath.setMap(null);
	map_baidu.removeOverlay(routePath_baidu);
	//去除路况路线
	var lengt = routePath_con.length;
	for(var i = lengt-1;i >= 0;i --)
	{
		routePath_con[i].setMap(null);
		routePath_con.pop();
		map_baidu.removeOverlay(routePath_baidu_con[i]);
		routePath_baidu_con.pop();
	}
}


function removegoogle()
{
	//去除图标
	carggm.setMap(null);
	//去除动画路线
	googleroutePath.setMap(null);
	//去除路况路线
	var lengtg = googleroutePath_con.length;
	for(var j = lengtg-1;j >= 0;j --)
	{
		googleroutePath_con[j].setMap(null);
		googleroutePath_con.pop();
	}
}

function removebaidu()
{
	//去除图标
	map_baidu.removeOverlay(carbbm);
	//去除动画路线
	map_baidu.removeOverlay(baiduroutePath);
	//去除路况路线
	var lengtb = baiduroutePath_con.length;
	for(var k = lengtb-1;k >= 0;k --)
	{
		map_baidu.removeOverlay(baiduroutePath_con[i]);
		baiduroutePath_con.pop();
	}
}


function googlecalcRoutecmp() {
	document.getElementById("map_canvas").style.display = "block";
	document.getElementById("map_canvas_baidu").style.display = "none";
  	var start = document.getElementById('start').value;
  	var end = document.getElementById('end').value;
  
  	var temp1 = start.split(",");
	var temp2 = end.split(",");
	
	marker1.set('position',new google.maps.LatLng(parseFloat(temp1[0]), parseFloat(temp1[1])));
	marker1.setMap(map);
	
	marker2.set('position',new google.maps.LatLng(parseFloat(temp2[0]), parseFloat(temp2[1])));
	marker2.setMap(map);
	
	map.setCenter(new google.maps.LatLng((parseFloat(temp1[0])+parseFloat(temp2[0]))/2, (parseFloat(temp1[1])+parseFloat(temp2[1]))/2));
	map.setZoom(12);
	
	googleroutePath.setMap(map);

  	var request = {
      	origin:new google.maps.LatLng(parseFloat(temp1[0]), parseFloat(temp1[1])),
      	destination:new google.maps.LatLng(parseFloat(temp2[0]), parseFloat(temp2[1])),
      	travelMode: google.maps.DirectionsTravelMode.DRIVING
  	};
  	directionsService.route(request, function(response, status) {
    	if (status == google.maps.DirectionsStatus.OK) {
      		directionsDisplay.setDirections(response);
      		
      		var Coordinates = new Array();
      		
      		var temp = response.routes[0].overview_path;
      		for(var j = 0;j<temp.length;j++)
      		{
      			Coordinates.push(new google.maps.LatLng((temp[j].lat()), (temp[j].lng())));
      		}	
      		
      		googleroutePath.setPath(Coordinates);
      		
      		carggm.setMap(map);
      		carggm.set('position',Coordinates[0]);
      		i=0;
      		pathsnum=Coordinates.length;
 			function resetMkPoint(i){
 				carggm.set('position',Coordinates[i]);
 				if(i < pathsnum){
 					setTimeout(function(){
 						i++;
 						resetMkPoint(i);
 					},150);
 				}
 			}
 			setTimeout(function(){
 				resetMkPoint(0);
 				//console.log(i);
 			},150);
  			
  			var query = "query=google";
  			for(var k = 0;k<Coordinates.length;k++)
      		{
      			query = query + "," + Coordinates[k].lat() + "," + Coordinates[k].lng();
      		}
  			roadcondition(query);
    	}
  	});
}///////// google compare 