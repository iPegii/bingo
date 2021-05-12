import React from 'react'

const SpeechComponent = (text) => {
    console.log(text)
    let speech = new SpeechSynthesisUtterance();
    let voices = []; 

      voices = window.speechSynthesis.getVoices();

      console.log(voices)
      speech.lang = "en-GB";
      speech.rate = 0.9;
      speech.volume = 100;

      speech.text = text

      // Start Speaking
      window.speechSynthesis.speak(speech);

}

export default SpeechComponent