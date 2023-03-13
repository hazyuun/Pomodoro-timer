export enum SFX {
  BUTTON_CLICK,
  TIMER_START,
  TIMER_FINISH,
  TIMER_PAUSE,
  TIMER_RESUME,
}

export abstract class SoundManager {
  private static _assets: string[] = [
    "assets/button_click.mp3",
    "assets/timer_start.mp3",
    "assets/timer_finish.mp3",
    "assets/timer_pause.mp3",
    "assets/timer_resume.mp3"
  ]

  private static _audios: HTMLAudioElement[] = this._assets.map((path) => {
    let audio = new Audio(path);
    audio.preload = "auto";
    return audio;
  });
  
  static play(sfx: SFX){
   this._audios[sfx].play()
  }
}