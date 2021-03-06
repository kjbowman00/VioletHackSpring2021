var inputKeys = { leftHeld: false, rightHeld: false };
var playerDirection = -1;

function getDirectionMultiplier() {
	if (inputKeys.leftHeld && inputKeys.rightHeld) {
		return 0;
	}
	else if (inputKeys.leftHeld) {
		playerDirection = -1;
		return -1;
	}
	else if (inputKeys.rightHeld) {
		playerDirection = 1;
		return 1;
	}
	else return 0;
}

function handleKeyDown(event) {
	let code = event.keyCode;
	if (code == "65" || code == "37") {
		inputKeys.leftHeld = true;
	} else if (code == "68" || code == "39") {
		inputKeys.rightHeld = true;
	}
}
function handleKeyUp(event) {
	let code = event.keyCode;
	if (code == "65" || code == "37") {
		inputKeys.leftHeld = false;
	} else if (code == "68" || code == "39") {
		inputKeys.rightHeld = false;
	}
}

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);