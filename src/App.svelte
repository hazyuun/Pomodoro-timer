<script lang="ts">
  import Timer from './lib/components/Timer.svelte';
</script>

<main>
  <h1>Pomodoro timer</h1>
  <p>Use the buttons below to switch the state of the timer. </p>
  <p> 
    Click the timer ring to pause/resume the timer.
  </p>
  
  <Timer />
  
  <span class="links">
    &copy;2023
    &middot;
    <a href="https://github.com/hazyuun/Pomodoro-timer">Source</a>
    &middot;
    <a href="https://hazyuun.github.io/">Portfolio</a>
  </span>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    height: 100vh;
    width: 100vw;
    padding: 0rem 1.5rem;
  }
  
  .links {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100vw;
    padding: 1rem;
    display: flex;
    gap: .5rem;
    background-color: var(--timer-background);
  }
</style>