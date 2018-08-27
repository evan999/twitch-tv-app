var streamapi="https://wind-bow.glitch.me/twitch-api/streams/";
var channelapi="https://wind-bow.glitch.me/twitch-api/channels/";
var channels=["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff","ESL_SC2","OgamingSC2","comster404","brunofin"];

function allStreamCall(streamchannel){
	var logo,name,game,status,statusDesc,channel_link;

	var streamchannel_url=streamapi+streamchannel+"?callback=?";
	var channel_url=channelapi+streamchannel+"?callback=?";

  
	$.getJSON(streamchannel_url,function(data){
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
    
    $.getJSON(channel_url, function(data){
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
		   $('.res').append(result);
	    else
    	$('.res').prepend(result);
		});
   });
};

$(document).ready(function(){
 
	channels.forEach(function(channel){
		allStreamCall(channel);
	});


  $('#all').click(function(){
  	var all=$('.res .row');
  	all.each(function(index){
  		$(this).css({'display':'block'});
  	});
  });

 
  $('#online').click(function(){
  	var online = $('.res .row');
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
  	var offline = $('.res .row');
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