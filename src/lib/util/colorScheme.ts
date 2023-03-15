export type ColorScheme = "day" | "night"

export const ColorSchemeManager = {
  loadAndApply: () => {
    /* No saved preference, defaults to system settings */
    if(!("scheme" in localStorage)) {
      const night = window.matchMedia("(prefers-color-scheme: dark)").matches
      return night ? "night" : "day";
    };
    
    const nightThemeEnabled = localStorage.scheme === "night";
    
    /* Both the old and the new scheme to use the `replace` function */
    const newScheme = nightThemeEnabled ? "night" : "day";
    const oldScheme = newScheme == "day" ? "night" : "day"
    

    const rootClassList = window.document.documentElement.classList;
    const replaced = rootClassList.replace(oldScheme, newScheme);
    
    /* If replace failed then just add the new class */
    if(!replaced){
      rootClassList.add(newScheme)
    }
    
    return newScheme
  },
  
  saveAndApply: (scheme: ColorScheme) => {
    localStorage.scheme = scheme;
  }
}
