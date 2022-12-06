function evaluatePassword() {
	password = document.getElementById("password-field").value;
	if (password === "pass") {
		console.log("correct password");
		document.getElementById("worng-password-message").style.visibility='hidden';
		showOptions();
	} else {
		// document.getElementById('evil_laugh_sound').play();
		show_warning();
	}
}	

function show_warning() {
	var worng_password_message = document.getElementById("worng-password-message");
	worng_password_message.style.visibility='visible';
	worng_password_message.classList.remove("run-text-animation");
	void worng_password_message.offsetWidth;
	worng_password_message.classList.add("run-text-animation");
	setTimeout(() => worng_password_message.style.visibility='hidden', 9000);
}

imagesLoaded(document.body, { background: true }, () => document.body.classList.remove('loading'));

			const piecesEl = document.querySelector('.content .pieces');
			const piecesObj = new Pieces(piecesEl, {
				 pieces: {rows: 20, columns: 15}
			});
			const optionsCtrl = document.querySelector('#password-area');

			const showOptions = () => {
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
				const imageBlur = document.querySelector('.img-blur');
				setTimeout(() => imageBlur.style.display='hidden', breakupTime);
				setTimeout(() =>  document.querySelector('.content').style.display='none', breakupTime);
				setTimeout(() =>  document.querySelector('#thank-you-area').style.display='block', breakupTime);
				
				anime.remove(optionsCtrl);
				anime({
					targets: optionsCtrl,
					duration: 700,
					easing: 'easeOutExpo',
					scale: 1.2,
					opacity: 0
				});
			};