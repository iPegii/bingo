const WinningAlert = (props) => {
  const winningPlayer = props
  let winningText = ""
  switch (winningPlayer.points) {
    case 1:
      winningText = `Pelaajan ${winningPlayer.name} ensimmäinen voitto, onnea!`
      break
    case 3:
      winningText = `Pelaajalla ${winningPlayer.name} on jo ${winningPlayer.points} voittoa! Hattutemppu!`
      break
    case 5:
      winningText = `Pelaajalla ${winningPlayer.name} on jo ${winningPlayer.points} voittoa! Chillisti!`
      break
    case 7:
      winningText = `Pelaajalla ${winningPlayer.name} on jo ${winningPlayer.points} voittoa! Tänne asti ei pitänyt päästä`
      break
    case 9:
      winningText = `Pelaajalla ${winningPlayer.name} on jo ${winningPlayer.points} voittoa! Otetaan yhteys ylläpitoon, pelaaja on selvästi huijannut`
      break
    case winningPlayer.points > 9:
      winningText = `Pelaajalla ${winningPlayer.name} on jo ${winningPlayer.points} voittoa! Onnea.`
      break
    default:
      winningText = `Hieno homma`
  }

  const alert = {
    message: winningText,
    player: `Pelaaja ${winningPlayer.name} voitti!`,
  }
  return alert
}

export default WinningAlert
