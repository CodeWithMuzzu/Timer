let total_seconds = 0;
let timerInterval;
let isRunning = false;

let endsound = new Audio('assets/end.mp3');
let timesound = new Audio('assets/timer.mp3');

document.getElementById("minutes").value = 5;
document.getElementById("hours").style.visibility = "hidden"
document.getElementById("minutes").style.visibility = "hidden"
document.getElementById("seconds").style.visibility = "hidden"
document.getElementById("submit").style.visibility = "hidden"

function updateTimerDisplay() {
    const hours = Math.floor(total_seconds / 3600);
    const minutes = Math.floor((total_seconds % 3600) / 60);
    const seconds = total_seconds % 60;

    document.getElementById("timer").innerText = hours.toString().padStart(2, '0') + ":" +
        minutes.toString().padStart(2, '0') + ":" +
        seconds.toString().padStart(2, '0');
}

document.getElementById("customtime").addEventListener("click", function () {
    // document.getElementById("inputs").style.display = "block";
    document.getElementById("hours").style.visibility = "visible"
    document.getElementById("minutes").style.visibility = "visible"
    document.getElementById("seconds").style.visibility = "visible"
    document.getElementById("submit").style.visibility = "visible"

});

document.getElementById("submit").addEventListener("click", function () {
    const hoursInput = document.getElementById("hours");
    const minutesInput = document.getElementById("minutes");
    const secondsInput = document.getElementById("seconds");



    if (hoursInput.value !== "" || minutesInput.value !== "" || secondsInput.value !== "") {
        const hours = parseInt(hoursInput.value, 10) || 0;
        const minutes = parseInt(minutesInput.value, 10) || 0;
        const seconds = parseInt(secondsInput.value, 10) || 0;

        if (hours < 0 || minutes < 0 || seconds < 0) {
            alert("Invalid input. Please enter positive values for hours, minutes, and seconds.");
        } else {
            total_seconds = hours * 3600 + minutes * 60 + seconds;
            document.getElementById("hours").style.visibility = "hidden"
            document.getElementById("minutes").style.visibility = "hidden"
            document.getElementById("seconds").style.visibility = "hidden"
            document.getElementById("submit").style.visibility = "hidden"
            updateTimerDisplay();
            document.getElementById("inputs").style.display = "none";
        }
    } else {
        alert("Please enter something.");
    }
});

document.getElementById("start").addEventListener("click", function () {
    if (!isRunning && total_seconds > 0) {
        timerInterval = setInterval(function () {
            total_seconds--;
            if (total_seconds <= 0) {
                clearInterval(timerInterval);
                isRunning = false;
                endsound.play();
            }
            updateTimerDisplay();

            if (total_seconds <= 10) {
                timesound.play();
            }
        }, 1000); // Update every second
        isRunning = true;
    }
});

document.getElementById("stop").addEventListener("click", function () {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
    }
});

document.getElementById("reset").addEventListener("click", function () {
    clearInterval(timerInterval);
    isRunning = false;
    total_seconds = 0;
    updateTimerDisplay();
});


