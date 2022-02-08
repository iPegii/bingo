const SpecialAlert = (props) => {
  console.log(props)
  let alert = {
    message: `Ja peli jatkuu`,
    player: `Kierroksia on pelattu ${props}`,
  }
  if (props === 80) {
    alert = {
      message: `Jippikayjei on hieno viesti`,
      player: `Kierroksia on pelattu ${props}`,
    }
    return alert
  }
}
export default SpecialAlert
