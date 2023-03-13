<script lang="ts">
  export let size: number = 200;
  export let bgWidth: number = 10;
  export let progressWidth: number = 5;
  export let percentage: number = 75;
  export let bgColor: string = "#eee";
  export let progressColor: string = "#07c";
  export let label: string
</script>

<div class="container" style={`width: ${size}px;`}>
  <span class="label">
    <span>
      <slot />
    </span>
    {label}
  </span>
  <svg
    class   = "progress-ring"
    viewBox = "0 0 {size} {size}"
    width   = {size}
    height  = {size}>
    
    <filter id='inset-shadow-filter'>
      <feOffset dx='0' dy='0' />
      <feGaussianBlur stdDeviation='2' result='offset-blur' />
      <feComposite operator='out' in='SourceGraphic' in2='offset-blur' result='inverse' />
      <feFlood flood-color='black' flood-opacity='.5' result='color' />
      <feComposite operator='in' in='color' in2='inverse' result='shadow' />
      <feComposite operator='over' in='shadow' in2='SourceGraphic' />
    </filter>

    <circle 
      filter        = "url(#inset-shadow-filter)"
      class         = "progress-ring-bg"
      cx            = {size / 2}
      cy            = {size / 2}
      r             = {size / 2 - bgWidth}
      stroke-width  = {bgWidth}
      style         = {`stroke: ${bgColor}; fill: var(--background-color)`}/>
      
    <circle
      class             = "progress-ring-fg"
      cx                = {size / 2}
      cy                = {size / 2}
      r                 = {size / 2 - bgWidth}
      stroke-width      = {progressWidth}
      fill              = "transparent"
      style             = {`stroke: ${progressColor}`}
      pathLength        = "100"
      stroke-dasharray  = "100"
      stroke-dashoffset = {100 - percentage}
      stroke-linecap    = "round" />
  </svg>
</div>

<style>
  circle {
    transition: all .25s ease;
  }
  .container {
    position: relative;
    aspect-ratio: 1;
  }
  .label {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    font-size: xx-large;
  }
</style>
