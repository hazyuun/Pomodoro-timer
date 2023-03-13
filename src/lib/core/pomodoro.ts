export interface PomodoroOptions {
  workDuration: number
  shortBreakDuration: number
  longBreakDuration: number
}

export enum PomodoroState {
  IDLE,
  WORKING,
  SHORT_BREAK,
  LONG_BREAK
}

export class Pomodoro {
  private _options: PomodoroOptions;
  private _state: PomodoroState = PomodoroState.IDLE;
  
  constructor(options: PomodoroOptions){
    this._options = options;
  }

  getState(){
    return this._state;
  }
  
  getStateString(){
    return ["Idle", "Working", "Short break", "Long break"][this.getState()];
  }
  
  getDuration(state?: PomodoroState){
    switch(state || this._state){
      case PomodoroState.IDLE: return 0;
      case PomodoroState.WORKING: return this._options.workDuration;
      case PomodoroState.SHORT_BREAK: return this._options.shortBreakDuration;
      case PomodoroState.LONG_BREAK: return this._options.longBreakDuration;
    }
  }
  
  setState(state: PomodoroState){
    this._state = state;
  }
}