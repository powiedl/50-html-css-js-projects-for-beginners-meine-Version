class Timer {
    constructor(durationInput, startButton, pauseButton,callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        this.intervalMs = 20;

        if (callbacks) { 
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }


/*
//        so kann/muss der Aufruf für die Arrow-Function aussehen - aber eigentlich "veraltet", darum bleibt das nur als Referenz
        this.startButton.addEventListener('click',this.start);
*/
        this.startButton.addEventListener('click',this.start.bind(this)); // mit bind kann man das gewünschte this an die Funktion mitgeben
        this.pauseButton.addEventListener('click',this.pause.bind(this));
    }

/*    start = () => { 
        // durch die Arrowfunction wird die Definition "im Hintergrund" in den Constructor verschoben und dadurch stimmt this (immer)
        console.log('start()',this);
    }
*/
    start() {
        if (!this.intervalId) {
            if (this.onStart) {
                this.onStart(this.timeRemaining);
            }
            this.tick();
            this.intervalId = setInterval(this.tick,this.intervalMs);
        }
    }

    pause() {
        if (this.intervalId) {
            this.pausedTimeRemaining = this.timeRemaining;
            clearInterval(this.intervalId); 
            this.intervalId=null;
        } else {
            if (this.pausedTimeRemaining === this.timeRemaining) {
                this.intervalId = setInterval(this.tick,this.intervalMs); // wenn pausiert war, "fortsetzen" 
                    //- aber nur, wenn die Zeit dazwischen nicht manuell geändert wurde
            } 
        };
    }

    tick = () => {
        if (this.timeRemaining <= 0) {
            this.pause();
            if (this.onComplete) { this.onComplete(); }
        } else {
            //const timeRemaining = this.timeRemaining; // ruft die get Methode timeRemaining auf
            //this.timeRemaining = timeRemaining - 1; // ruft die set Methode auf - die dann value von textInput im HTML korrigiert
            this.timeRemaining = this.timeRemaining - this.intervalMs/1000; // und so schreibt man es ohne die Erklärungen oben ;-)
            if (this.onTick) { this.onTick(this.timeRemaining); }
        }
    }

    get timeRemaining() { // ein Getter für timeRemaining
        return parseFloat(this.durationInput.value);
    }

    set timeRemaining(time) {
        this.durationInput.value = time.toFixed(2);
    }
}

