
interface TimerOptions {
  duration?: number
  finishedCallback: Function
  stepCallback: Function
}

export class Timer {
  /**
   * Options received via the constructor
   */
  private _options: TimerOptions;

  /** 
   * Timestamp when the timer started, used to calculate how much time is remaining.
   * */ 
  private _start: number;
  
  /**
   * Interval ID returned by setInterval when the timer starts, the interval is only
   * used to update and not to compute remaining time.
   */
  private _interval: number;
  
  /**
   * Initial timer value (in seconds), resume() updates this to the timer value when 
   * it was paused, whereas _options.duration stays the same as the initial value 
   * when timer started.
   */
  private _duration: number;
  
  /**
   * Current timer value (in seconds)
   */
  private _current: number;
  
  /**
   * Is the timer paused?
   */
  private _paused: boolean;
  
  /**
   * Did the timer finish?
   */
  private _finished: boolean;

  /**
   * Timer constructor
   * 
   * @param options TimerOptions object containing duration and callbacks
   */
  constructor(options: TimerOptions){
    this._options = options
    this._current = 0;
    this._paused = false;
    this._finished = false;
  }

  /**
   * Computes remaining time, this function should be called periodically
   */
  private _step(){
    let d = Date.now() - this._start
    let delta = this._duration - (d  / 1000);
    
    if (delta <= 0) {
      this.pause();
      this._finished = true;
      this._options.finishedCallback();
    }
    
    this._current = (Math.ceil(delta)) | 0;
    this._options.stepCallback(this._current, this._options.duration)
  }

  /**
   * Starts the timer
   * 
   * @param duration Overrides timer duration
   */
  start(duration?: number){
    if(this._options.duration == undefined){
      this._options.duration = 0;
    }
    
    this._duration = this._options.duration;

    if(duration){
      this._duration = duration;
      this._options.duration = this._duration
    }

    this._start = new Date().getTime();
    
    this._step();
    this._interval = setInterval(this._step.bind(this), 1000);
    
    this._paused = false;
    this._finished = false;
  }

  /**
   * Pauses the timer if not already paused
   */
  pause(){
    if(this._paused) return;
    clearInterval(this._interval);
    this._paused = true;
  }

  /**
   * 
   * @returns is the timer paused ?
   */
  isPaused(){
    return this._paused;
  }
  
  /**
   * Resumes the timer if it's paused
   */
  resume(){
    if(this._finished || !this._paused) return;
    this._start = new Date().getTime();
    this._duration = this._current;
    this._interval = setInterval(this._step.bind(this), 1000);
    this._paused = false;
  }

  /**
   * Toggles the pause state of the timer
   */
  togglePause(){
    if(this._paused){
      this.resume();
      return;
    }
    this.pause();
  }

  /**
   * Stops the timer
   */
  stop(){
    this.pause();
    this._current = 0;
    this._duration = 0;
    this._paused = false;
    this._finished = false;
    clearInterval(this._interval)
    this._options.stepCallback(this._current, this._duration)
  }
}
