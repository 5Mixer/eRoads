window.onload = function() {
	console.log("Tick");
	setTimeout(function (){
		console.log("plz work?");
		new Vivus('checkList', {duration: 200, file: 'img/checklist.svg'}, function(a){
			a.play(20);
		});
	}, 1000);
}
