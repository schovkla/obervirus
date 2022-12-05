function evaluatePassword() {
	password = document.getElementById("password-field").value;
	if (password === "pass") {
		console.log("correct password");
		document.getElementById("worng-password-message").style.visibility='hidden';
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
