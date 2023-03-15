<script lang="ts">
  import Timer from './lib/components/Timer.svelte';
  import { ColorSchemeManager, type ColorScheme } from './lib/util/colorScheme';
  import { FaMoon, FaSun } from "svelte-icons/fa"

  let scheme: ColorScheme;
  $: {
    scheme;
    scheme = ColorSchemeManager.loadAndApply();
  }
  const toggleColorScheme = () => {
    const s = scheme === "night" ? "day" : "night";
    scheme = s;
    ColorSchemeManager.saveAndApply(scheme)
  };

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
    <span class="right">
      &copy;2023
      &middot;
      <a href="https://github.com/hazyuun/Pomodoro-timer">Source</a>
      &middot;
      <a href="https://hazyuun.github.io/">Portfolio</a>
    </span>
    <button on:click={toggleColorScheme}>
      <span class="btn-icon">
        {#if scheme == "day"}
          <FaMoon />        
        {:else}
          <FaSun />        
        {/if}
      </span>
    </button>
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
    align-items: center;
    gap: .5rem;
    background-color: var(--timer-background);
  }

  .links .right {
    flex-grow: 1;
  }

  .links button {
    /* background-color: var(--transparent-color-alt); */
    border: none;
    border-radius: 100%;
    min-width: 2rem;
    aspect-ratio: 1;

    background-color: var(--background-color);
    box-shadow:  2px  2px 4px var(--background-color-shadow),
                -2px -2px 4px var(--background-color-light),
                inset -2px -2px 4px var(--background-color-light),
                inset 2px 2px 4px var(--background-color-shadow-alt);
    transition: all .2s ease;
    padding: .75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .links button:hover {
    filter: brightness(104%);  
  }

  .btn-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.25rem;
    aspect-ratio: 1;
  }
  
</style>