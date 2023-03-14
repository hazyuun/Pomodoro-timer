<script lang="ts">
  import Timer from './lib/components/Timer.svelte';
</script>

<main>
  <div class="main">
    <h1>Pomodoro timer</h1>
    <p>Use the buttons below to switch the state of the timer. </p>
    <p> 
      Click the timer ring to pause/resume the timer.
    </p>
    
    <Timer />
  </div>
  
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
    justify-content: space-between;
    height: 100vh;
    width: 100vw;
    padding: 3rem 0 0 0;
    gap: 2rem;
  }

  .main {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    flex-grow: 1;
    padding: 0rem 1.5rem;
  }
  
  .links {
    width: 100vw;
    padding: .75rem 1rem;
    display: flex;
    gap: .5rem;
    background-color: var(--timer-background);
  }
</style>