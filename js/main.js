function evaluatePassword() {
	if (document.getElementById("password-field").value === PASSWORD) {
		document.getElementById("worng-password-message").style.visibility='hidden';
		defeatObervirus();
	} else {
		document.getElementById('evil_laugh_sound').play();
		showWarning();
	}
}

function showWarning() {
	var worngPasswordMessage = document.getElementById("worng-password-message");
	worngPasswordMessage.style.visibility='visible';
	worngPasswordMessage.classList.remove("run-text-animation");
	void worngPasswordMessage.offsetWidth;
	worngPasswordMessage.classList.add("run-text-animation");
	setTimeout(() => worngPasswordMessage.style.visibility='hidden', 9000);
}

imagesLoaded(document.body, { background: true }, () => document.body.classList.remove('loading'));

const piecesEl = document.querySelector('.content .pieces');
const piecesObj = new Pieces(piecesEl, {
	 pieces: {rows: 20, columns: 20}
});
const passwordArea = document.querySelector('#password-area');

const defeatObervirus = () => {
	const breakupTime = 7000;

	piecesObj.animate({
		duration: breakupTime,
		delay: (t,i) => {
			const elBounds = piecesEl.getBoundingClientRect();
			const x1 = elBounds.left + elBounds.width/2;
			const y1 = elBounds.top + elBounds.height/2;
			const tBounds = t.getBoundingClientRect();
			const x2 = tBounds.left + tBounds.width/2;
			const y2 = tBounds.top + tBounds.height/2;
			const dist = Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));
			const maxDist = Math.sqrt(Math.pow(elBounds.left-x1,2) + Math.pow(elBounds.top-y1,2));
			const maxDelay = 3000;

			t.dataset.centerx = x2;
			t.dataset.centery = y2;

			return -1*maxDelay/maxDist*dist + maxDelay;
		},
		easing: [0.97,5,0,5],
		translateX: (t,i) => { 
			return t.dataset.column < piecesObj.getTotalColumns()/2 ? anime.random(-2000,0) : anime.random(0,2000);
		},
		translateY: (t,i) => { 
			return t.dataset.row < piecesObj.getTotalRows()/2 ? anime.random(-2000,0) : anime.random(0,2000);
		},
		opacity: 0.0
	});
	setTimeout(() => document.querySelector('.img-blur').style.display='hidden', breakupTime);
	setTimeout(() => document.querySelector('.content').style.display='none', breakupTime);
	setTimeout(() => document.querySelector('#thank-you-area').style.display='block', breakupTime);
	
	anime.remove(passwordArea);
	anime({
		targets: passwordArea,
		duration: 700,
		easing: 'easeOutExpo',
		scale: 1.2,
		opacity: 0
	});
};