const SpeechComponent = (text) => {
  let speech = new SpeechSynthesisUtterance()
  let voices = []

  voices = window.speechSynthesis.getVoices()
  speech.lang = "en-US"
  speech.rate = 0.9
  speech.volume = 100

  speech.text = text

  // Start Speaking
  window.speechSynthesis.speak(speech)
}

export default SpeechComponent
