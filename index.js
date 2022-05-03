///VARIABILI GLOBALI//////////
var ws_global_timer;
var ws_timer_interval;
var livello = 0;
var sceltaLivelloAttuale = 0;

var JSONLivelli = [
	{
		img: "percorso 1.jpg",
		puntoInte: [3,4,5],
		risposte: ["dritto", "sinistra", "destra"]
	},
	{
		img: "percorso 2.jpg",
		puntoInte: [3,4],
		risposte: ["dritto", "sinistra"]
	}
];

function alert(arg){console.log(arg)};

function caricaLivello(){
	var livelloAttuale = JSONLivelli[livello];
	sceltaLivelloAttuale = randomNumber(0, livelloAttuale.puntoInte.length-1);
	var casellaScelta = livelloAttuale.puntoInte[sceltaLivelloAttuale];  //nel caso di livello 0 ci sarà o 3 o 4 o 5
	var idCasella = "#ws_"+casellaScelta;
	//svuoto tutto
	$(".ws_img_tabella").removeAttr("src");
	$(idCasella).attr("src", "img/box_.jpg");
}


var risposteCont = 0;
var risposte = [];  //riempire le risposte con un booleano 
//risposte.push(true); come si riempie quell'array V 
//quando finisce il gioco far uscire un alert con: risposteEsatte/totale
//metti check x v nei pallini (grafica)
////////////////////////////

 


///ENTRY POINT//////////////
$(document).ready(function() {
    inizializzaGioco();
	$('.ws-single-icons').on('click',clickPulsante);
});
//////////////////////////

function aggiornaTempo(){
    ws_global_timer--;
    console.log(ws_global_timer);
	if(ws_global_timer == -1){
		passaALivelloSucc()
	} else {
		$('#ws-timer').html(ws_global_timer);
	}
}

function ws_f_timer(funzionedalanciareognitot){
    //setTimeout(function, tempo)
    ws_timer_interval =  setInterval(funzionedalanciareognitot, 1000);
}

function passaALivelloSucc(){
	livello++; //potrebbe essere troppo
	if(livello < JSONLivelli.length){
		alert(livello);
		clearInterval(ws_timer_interval);
		inizializzaGioco();
	} else {
		giocoFinito();
	}
}

function inizializzaGioco(){
	caricaLivello();
	ws_global_timer = 5;
	$('#ws-timer').html(ws_global_timer);
	ws_f_timer(aggiornaTempo);
}

function clickPulsante(){
	//$(this) equivale in questo caso a uno di questi $(".ws-single-icons")
	//console.log("CLICCATO",$(this).attr("direzione"));
	var pulsanteCliccato = $(this).attr("direzione");
    if(pulsanteCliccato == JSONLivelli[livello].risposte[sceltaLivelloAttuale]) {
		risposte.push(true);
		risposteCont++;
		alert('bravo');
		console.log(risposte);
	} else {
		risposte.push(false);
		alert('eh no!');
		console.log(risposte);
	}

	passaALivelloSucc();

}

function giocoFinito(){
	/* alert("GIOCO FINITO") */
	clearInterval(ws_timer_interval);
	$('.ws-single-icons').unbind();  //disattiva tutti gli onclick

	controlloGiocata();
}

function controlloGiocata() {
	/* if(risposteCont>4){

	} */
	var contatoreRisposteGiuste = 0;
	for (let index = 0; index < risposte.length; index++) {
		const element = risposte[index];
		if(element) {
			contatoreRisposteGiuste++;
		}
	}
	alert("GIOCO FINITO!"+contatoreRisposteGiuste+"/"+ risposte.length);
	//console.log(contatoreRisposteGiuste, risposte.length);
}


function randomNumber(min, max) { 
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
} 

/*function ws_f_timer(ws_timer,callback){
	
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
 }*/