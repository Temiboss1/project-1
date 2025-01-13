document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const volumeSlider = document.getElementById("volume-slider");
  
    
    const setVolume = () => {
      const clips = document.querySelectorAll(".clip");
      clips.forEach((clip) => {
        clip.volume = volumeSlider.value;
      });
    };
  
    setVolume(); 
  
    
    const playSound = (key) => {
      const audio = document.getElementById(key);
      const drumPad = audio.parentElement;
      if (audio) {
        audio.currentTime = 0; // Restart audio if it's already playing
        audio.play();
        display.innerText = drumPad.id;
      }
    };
  
    const drumPads = document.querySelectorAll(".drum-pad");
    drumPads.forEach((pad) => {
      pad.addEventListener("click", () => {
        playSound(pad.innerText);
      });
    });
   
    document.addEventListener("keydown", (event) => {
      const key = event.key.toUpperCase();
      if ("QWEASDZXC".includes(key)) {
        playSound(key);
      }
    });
  
    volumeSlider.addEventListener("input", setVolume);
  });