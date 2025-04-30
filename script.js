window.onload = function() {
    var sec = 0;
    var min = 0;
    var Interval;

    var appendmin = document.getElementById('min');
    var appendsec = document.getElementById('sec');
    var start = document.getElementById('start');
    var stop = document.getElementById('stop');
    var reset = document.getElementById('reset');
    var lap=document.getElementById('lap');

    start.onclick = function() {
        clearInterval(Interval);
        Interval = setInterval(starttimer, 10);
    }

    stop.onclick = function() {
        clearInterval(Interval);
    }

    reset.onclick = function() {
        clearInterval(Interval);
        sec = 0;
        min = 0;
        appendmin.innerHTML = "00";
        appendsec.innerHTML = "00";
        document.getElementById("laps").innerHTML = "";

    }

    function starttimer() {
        sec++;
        if (sec<= 9) {
            appendmin.innerHTML = "0" + sec;
        }

        if (sec > 9) {
            appendmin.innerHTML = sec;
        }

        if (sec > 99) {
            min++;
            appendsec.innerHTML = min <= 9 ? "0" + min : min;
            sec = 0;
            appendmin.innerHTML = "00";
        }
    }
    let count = 0;
    lap.onclick = () => {
        count++;
        let li = document.createElement("li");
        document.getElementById("laps").appendChild(li); 
        li.innerHTML = `#${count} — ${appendsec.innerHTML}:${appendmin.innerHTML}`;
    }
}
