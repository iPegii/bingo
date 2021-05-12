import React from 'react'
import Table from 'react-bootstrap/Table'


const DisplayTable = ({players}) => {
    return(
      <div style={{backgroundColor: "#99d1b1"}}>
      <Table style={{tableLayout: "fixed", width:"17em"}}>
   <thead>
      <tr style={{}}>
      <th>Numero</th>
      <th>Pelaaja</th>
      <th>Pisteet</th>
      </tr>
    </thead>
    <tbody>
    {players.map((player, index) => (
      <tr key={index} style={{}}>
        
        <td index={index} style={{fontSize:"20px", overflow: "hidden"}}> {player.number}</td>
        <td index={index} style={{fontSize:"20px", overflow: "hidden"}}>{player.name}</td>
        <td index={index} style={{fontSize:"20px", overflow: "hidden"}}>{player.points}</td>
      </tr>
    ))}
    </tbody>
  </Table>
  </div>
    )
  
  }

  export default DisplayTable