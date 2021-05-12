import './App.css';
import React, {useState, useEffect} from "react"
import Alerts from './components/Alerts'
import Button from 'react-bootstrap/Button'
import sadFace from "./images/face.png"
import 'bootstrap/dist/css/bootstrap.min.css'
import { v4 as uuidv4 } from 'uuid'
import axios from "axios"
import DisplayMultipleTables from "./components/DisplayMultipleTables"
import DropdownNavigation from "./components/DropdownNavigation"
import SpeechComponent from "./components/SpeechComponent"
import WinningAlert from "./components/utils/WinningAlert"
import SpecialAlert from './components/utils/SpecialAlert';

const App = () => {

  const [players, setPlayers] = useState(null)
  const [nameField, setNameField] = useState('')
  const [alert, setAlert] = useState()
  const [game, setGame] = useState(0)

  useEffect(() => {
      const promise = axios.get('http://localhost:3001/players')
    promise.then(response => {
      setPlayers(response.data)
})

axios.get('http://localhost:3001/game')
  .then(gameResponse => {
      console.log(gameResponse)
      if(gameResponse.data[0] !== undefined){
      setGame(gameResponse.data[0].game)
      }
})
    console.log(players)
  },[])

  const handleChange = (e) => {
    setNameField(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(nameField < 3) {
      return null
    }
    //alert('Uusi pelaaja lisätty: ' + this.state.value + ", numerolla: ", counter, " Amazing!");
    const id = uuidv4();
    let playerCount = 0
    players.map(player => {
      if(player.number > playerCount) {
        playerCount = player.number
      } 
      return null
    })
    playerCount = playerCount+1
    let freeNumber
    if(players.length+1 < playerCount) {
      const playerNumbers = players.map(player => player.number)
      for (var i = 1; i < playerCount; i++) {
        if(playerNumbers.includes(i) === false){
          freeNumber = i
          return null
        }

      }

      const newPlayer = {
        id: id,
        name: nameField,
        number: freeNumber,
        points: 0,
      }

        axios
        .post('http://localhost:3001/players', newPlayer)
        .then(response => {
          setPlayers(players.concat(response.data))
          setNameField('')
        })
      return null
    }

    const newPlayer = {
      id: id,
      name: nameField,
      number: playerCount,
      points: 0,
    }

    axios
    .post('http://localhost:3001/players', newPlayer)
    .then(response => {
      setPlayers(players.concat(response.data))
      setNameField('')
    })

    const alert = {
      message: `Uusi pelaaja lisätty: ${nameField} numerolla: ${playerCount} Amazing!`,
      player: `Uusi pelaaja ${nameField} lisätty!`,
    }

    setAlert(alert)
    setTimeout(() => {
    setAlert()
    },5000)
    
  }

  const handleWinner = (props) => {
    const winningNumber = Math.floor(Math.random() * (players.length)) + 1
    console.log(winningNumber)
    var winningPlayer = players.find(player => player.number === winningNumber)
    if(winningPlayer === undefined) {
      const alert = {
        message: `Ihan jees oli koodata, mutta tämmöstä sattuu`,
        player: `Pelaajaa ei ole olemassa`,
      }
  
      setAlert(alert)
      setTimeout(() => {
      setAlert()
      },5000)
      return null
    }
    console.log(winningPlayer)
    winningPlayer = {...winningPlayer, points: winningPlayer.points+1}

    axios
    .put(`http://localhost:3001/players/${winningPlayer.id}`, winningPlayer)
    .then(response => {
      console.log(response)
      const promise = axios.get('http://localhost:3001/players')
    promise.then(response => {
      setPlayers(response.data)

      const gameObject = {
        id: 1,
        game: (game+1)
      }
      if(gameObject.game === 1) {
        axios.post('http://localhost:3001/game', gameObject)
          .then(response => {
            console.log(response)
          setGame(response.data.game)
          })
        
        } else {
          axios.put('http://localhost:3001/game/1', gameObject)
          .then(response => {
            console.log(response)
          setGame(response.data.game)
          /*const specialAlert = SpecialAlert(response.data)
      setAlert(specialAlert)
      setTimeout(() => {
      setAlert()
      },5000)*/
        })}
        
      
})
    })
    console.log(winningPlayer)
    SpeechComponent(`Congratulations ${winningPlayer.name}`)

    const winningAlert = WinningAlert(winningPlayer)
    setAlert(winningAlert)
    setTimeout(() => {
      setAlert()
      },5000)
  }

  const handleDelete = (e) => {
    e.preventDefault();
    axios
    .delete(`http://localhost:3001/players/${e.target.id}`).then(response => {
      const promise = axios.get('http://localhost:3001/players')
      promise.then(response => {
      setPlayers(response.data)
})
    });
  }

  const handleClearAlert = (e, props) => {
    e.preventDefault();
    console.log(e)
    console.log(props)
    setAlert()
  }


  return (
    <div className="App">
      <Alerts alert={alert}></Alerts>
      
      {players !== null 
      ? <DropdownNavigation players={players} handleDelete={handleDelete}></DropdownNavigation>
      : null
      }
      <div style={{marginTop: "2em",width:"20%", marginLeft: "auto", marginRight: "auto", position: "relative"}}> 
      <form onSubmit={handleSubmit}>
      <div className="input-group input-group-md">
        <span className="input-group-text" id="inputGroup-sizing-md">Pelaaja</span>
        <input type="text" className="form-control" id="textInput" value={nameField} onChange={handleChange}></input>
      </div>
      <div style={{}}>
      <div style={{flexDirection: "row", display: "flex", width:"40vw"}}>
      <Button style={{ height: "4em", fontSize: "20px",width: "50%", marginTop: "0.1em"}} 
      type="submit" variant="primary"><strong>Uusi pelaaja bingoon</strong></Button>
      <p style={{marginLeft: "2em", fontSize: "40px"}}>Kierroksia: {game}</p>
      </div>
      <Button style={{marginLeft: "calc(-45vw + 50%)", marginRight:"0em", height: "4em", fontSize: "20px",width: "90vw", marginTop: "0.1em"}} 
      type="submit" variant="success" onClick={handleWinner}><strong>Arvotaan voittaja</strong></Button>
      </div>
      </form>
      </div>
      <div>
        {players !== null
        ? <DisplayMultipleTables players={players}></DisplayMultipleTables> 
        : (<div>
           <p style={{fontSize:"40px"}}>Missä pelaajat?</p>
           <img src={sadFace} alt="surullinen naama on nyt [Object object]" height="400px"></img>
            </div>)
      }
      </div>
    </div>
  );
}

export default App;
