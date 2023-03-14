<script lang="ts">
  import ProgressRing from "./ProgressRing.svelte";
  import { Timer } from "../core/timer";
  import { FaPause, FaBookOpen, FaCoffee, FaBasketballBall } from "svelte-icons/fa"
  import { Pomodoro, PomodoroState } from "../core/pomodoro";
  import { SFX, SoundManager } from "../util/sound";
  import { formatSeconds } from "../util/time";
  
  /**
   * Screen size, used to make the timer ring responsive
   * as media queries do not work on SVGs
   * */
  let innerWidth: number;
  $: innerWidth = 0;
  
  let progressRingSize: number 
  $: progressRingSize = innerWidth < 768 ? 300 : 400;
  
  let progressRingWidth: number 
  $: progressRingWidth = innerWidth < 768 ? 8 : 16;

  let duration: number = 0;
  let percentage: number = 100;
  let label = "--:--:--";

  /**
   * Color of the ring depends on the pomodoro session state
   * */
  let color: string
  $:color = ["var(--timer-idle)", 
             "var(--timer-working)",
             "var(--timer-short-break)",
             "var(--timer-long-break)"][pomodoro.getState()]

  
  /* TODO: Make this customizable */
  const pomodoroOptions = {
    workDuration: 25*60,
    shortBreakDuration: 5*60,
    longBreakDuration: 30*60
  }

  /**
   * The Pomodoro object holds information about the state of the pomodoro session
   * */
  let pomodoro = new Pomodoro(pomodoroOptions);
  
  /**
   * Callback when the timer updates it's internal values, this will be called every second (approximately)
   * and it will take care of updating the timer UI
   * 
   * @param current Elapsed seconds
   * @param duration Total seconds
   */
  const onTimerStep = (current, duration) => {
    percentage  = 100 * current / duration;    
    label = formatSeconds(current);
  };
  
  /**
   * Callback when the timer finishes, it simply plays a sound effect for the time being
   */
  const onTimerFinish = () => {
    SoundManager.play(SFX.TIMER_FINISH)
  };
  
  const timerOptions = {
    stepCallback: onTimerStep,
    finishedCallback:onTimerFinish
  }
  
  let timer = new Timer(timerOptions);
  
  /**
   * Event handlers 
   * */ 

  const ringOnClick = () => {
    if(pomodoro.getState() == PomodoroState.IDLE)
      return
    timer.togglePause();
    timer = timer;
    SoundManager.play(timer.isPaused() ? SFX.TIMER_PAUSE : SFX.TIMER_RESUME);  
  }

  const idleOnClick = () => {
    SoundManager.play(SFX.BUTTON_CLICK);
    pomodoro.setState(PomodoroState.IDLE);
    timer.stop();
    label = "--:--:--";
    percentage = 100;
    timer = timer;
    pomodoro = pomodoro
  }
  const workOnClick = () => {
    SoundManager.play(SFX.TIMER_START);
    pomodoro.setState(PomodoroState.WORKING);
    timer.pause();
    timer.start(pomodoro.getDuration());
    timer = timer;
    pomodoro = pomodoro
  }
  const shortBreakOnClick = () => {
    SoundManager.play(SFX.TIMER_START);
    pomodoro.setState(PomodoroState.SHORT_BREAK);
    timer.pause();
    timer.start(pomodoro.getDuration());
    timer = timer;
    pomodoro = pomodoro
  }
  const longBreakOnClick = () => {
    SoundManager.play(SFX.TIMER_START);
    pomodoro.setState(PomodoroState.LONG_BREAK);
    timer.pause();
    timer.start(pomodoro.getDuration());
    timer = timer;
    pomodoro = pomodoro
  }
</script>

<svelte:window bind:innerWidth />
<svelte:head>
    <title>{pomodoro.getStateString()} {label}  | Pomodoro timer</title> 
</svelte:head>

<div class="container">
  <div class="clickable" on:click={ringOnClick} on:keydown={(e)=>{e.key == "Enter" && ringOnClick()}} role="button" tabindex="1">
    <ProgressRing
      percentage={percentage} 
      label={label}
      bgColor="var(--timer-background)"
      progressColor={color}
      bgWidth={2*progressRingWidth}
      progressWidth={progressRingWidth}
      size={progressRingSize}
    >
    {#if timer.isPaused()}
      <span class="paused">
        <span class="btn-icon">
          <FaPause/>
        </span>
      </span>
    {/if}
  </ProgressRing>
  </div>

  <div class="controls">
    <button class="btn {pomodoro.getState() == PomodoroState.IDLE ? `active` : ``}" on:click={idleOnClick} tabindex="2">
      <span class="btn-icon idle">
        <FaPause />
      </span>
      <span>
        Idle
      </span>
      <span class="time time-idle">
        {"--:--:--"}
      </span>
    </button>
    
    <button class="btn {pomodoro.getState() == PomodoroState.WORKING ? `active` : ``}" on:click={workOnClick} tabindex="3">
      <span class="btn-icon working">
        <FaBookOpen />
      </span>
      <span>
        Work
      </span>
      <span class="time time-working">
        {formatSeconds(pomodoro.getDuration(PomodoroState.WORKING))}
      </span>

    </button>
    
    <button class="btn {pomodoro.getState() == PomodoroState.SHORT_BREAK ? `active` : ``}" on:click={shortBreakOnClick} tabindex="4">
      <span class="btn-icon short-break">
        <FaCoffee />
      </span>
      <span>
        Short break
      </span>
      <span class="time time-short-break">
        {formatSeconds(pomodoro.getDuration(PomodoroState.SHORT_BREAK))}
      </span>

    </button>
    <button class="btn {pomodoro.getState() == PomodoroState.LONG_BREAK ? `active` : ``}" on:click={longBreakOnClick} tabindex="5">
      <span class="btn-icon long-break">
        <FaBasketballBall />
      </span>
      <span>
        Long break
      </span>
      <span class="time time-long-break">
        {formatSeconds(pomodoro.getDuration(PomodoroState.LONG_BREAK))}
      </span>

    </button>
    
  </div>
  
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }
  
  .controls {
    display: flex;
    justify-content: center;
    align-items: stretch;
    gap: 1rem;
  }
  
  @media screen and (max-width: 768px){
    .controls {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }

  .clickable {
    cursor: pointer;
    transition: all .2s ease;
  }
  
  .clickable:hover {
    filter: brightness(104%);
    transition: all .2s ease;
  }

  @media (prefers-color-scheme: dark) {
    .clickable:hover {
      filter: brightness(110%);
      transition: all .2s ease;
    }
  }

  .btn {
    min-height: 4rem; 
    min-width: 6rem;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0;
  }

  .btn-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.5rem;
    aspect-ratio: 1;
  }

  @keyframes blinking {
    0%{
      opacity: 1;
    }
    50%{
      opacity: .4;
    }
    100%{
      opacity: 1;
    }
  }
  
  .paused {
    font-size: small;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .1rem;
    animation: blinking 1.5s cubic-bezier(0.39, 0.575, 0.565, 1) infinite;
  }

  .btn-icon.idle :global(path) {
    fill: var(--timer-idle);
  }
  .btn-icon.working :global(path) {
    fill: var(--timer-working);
  }
  .btn-icon.short-break :global(path) {
    fill: var(--timer-short-break);
  }
  .btn-icon.long-break :global(path) {
    fill: var(--timer-long-break);
  }
  .time{
    font-weight: bold;
  }
  .time.time-idle {
    color: var(--timer-idle);
  }
  .time.time-working {
    color: var(--timer-working);
  }
  .time.time-short-break {
    color: var(--timer-short-break);
  }
  .time.time-long-break {
    color: var(--timer-long-break);
  }
</style>
