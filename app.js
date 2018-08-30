var streamsAPI="https://wind-bow.glitch.me/twitch-api/streams/";
var channelsAPI="https://wind-bow.glitch.me/twitch-api/channels/";
var channels=["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];


function allStreamCall(streamchannel){
	var logo,name,game,status,statusDesc,channel_link;

	var streamchannelURL=streamsAPI+streamchannel+"?callback=?";
	var channelURL=channelsAPI+streamchannel+"?callback=?";

  
	$.getJSON(streamchannelURL,function(data){
		if(data.status=='404'){ 
			game=data.message;
			status="offline";
			statusDesc="";
		}
		else if(data.status=='422'){ 
			game=data.message;
			status="offline";
			statusDesc="";
		}
		else{
			data=data.stream;
			if(data===null){ 
				game="offline";
				status="offline";
				statusDesc="";
				logo="";
			}
			else{
				game=data.channel.game;
				status="online";
				statusDesc=":"+data.channel.status;
			}
		}
    
    $.getJSON(channelURL, function(data){
		name = data.display_name;
		logo = data.logo;
		channel_link = data.url;
		
		if(data.status=='404'){ 
			name = streamchannel;
			channel_link="#";
			logo = data.logo;
		}
    	else if(data.status=='422'){ 
    		name = streamchannel;
    		channel_link = "#";
    		logo = data.logo;
    	}
    	else if(logo === null){ 
    		logo = data.logo;
		}

		var result="\
		<div class='row' id='"+status+"'>\
			<div class='col-md-3 col-xs-4'>\
				<span class='logo'><img class='img img-circle' src='"+logo+"'></span>\
				<a href='"+channel_link+"'>\
					<span class='name text-center'>"+name+"</span>\
				</a>\
			</div>\
			<div class='col-md-9 col-xs-8 text-center' id='statusdescription'>\
				<span class='game'>"+game+"</span>\
				<span class='status'>"+statusDesc+"</span>\
			</div>\
		</div>";

		if(status=='offline')
		   $('.result').append(result);
	    else
    		$('.result').prepend(result);
		});
   });
};

$(document).ready(function(){
 
	channels.forEach(function(channel){
		allStreamCall(channel);
	});


  $('#all').click(function(){
  	var all=$('.result .row');
  	all.each(function(index){
  		$(this).css({'display':'block'});
  	});
  });

 
  $('#online').click(function(){
  	var online = $('.result .row');
  	online.each(function(index){
  		var selection=$(this).attr('id');
  		if(selection=='online'){
  			$(this).css({'display':'block'});
  		}
  		else if(selection=='offline'){
  			$(this).css({'display':'none'});
  		}
  	});
  });


  $('#offline').click(function(){
  	var offline = $('.result .row');
  	offline.each(function(index){
  		var selection=$(this).attr('id');
  		if(selection=='online'){
  			$(this).css({'display':'none'});
  		}
  		else if(selection=='offline'){
  			$(this).css({'display':'block'});
  		}
  	});
  });

});