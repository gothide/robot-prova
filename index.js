ws_global_timer = 0;

function ws_game(){

};


function ws_f_timer(ws_timer,callback){
	
	console.log('ws_timer',ws_timer);
	ws_global_timer = ws_timer;
	uwsJquery('#ws-timer').html(ws_global_timer); // init contatore su html
	if(ws_global_timer > 0){
		//console.log('pre setInterval');
		ws_timer_interval = setInterval(function(){
			//console.log('dentro setInterval');
			if(ws_global_timer==0){
				//console.log('pre clear');
				clearInterval(ws_timer_interval);
				callback();
				//console.log('after clear');
			}else {
				ws_global_timer--;
				//console.log('global_timer',global_timer);
			}
			uwsJquery('#ws-tv-timer').html(ws_global_timer.toString().padStart(2, '0')); // aggiornamento contatore in html
		},1000);
	}
 }