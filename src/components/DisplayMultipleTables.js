import React from 'react'
import DisplayTable from './DisplayTable'


const DisplayMultipleTables = ({players}) => {

    return(
      <div style={{display: "flex", marginTop:"2em"}}>
      <div style={{marginLeft: "2em"}}>
        <DisplayTable players={players.slice(0,10)}></DisplayTable>
      </div>
      {players.length >= 11
      ?<div style={{marginLeft: "3em"}}>
      <DisplayTable players={players.slice(10,20)}></DisplayTable>
    </div>
    : null
  }
  {players.length >= 22
    ?<div style={{marginLeft: "3em"}}>
      <DisplayTable players={players.slice(20,30)}></DisplayTable>
    </div>
    : null}
    {players.length >= 33
    ?<div style={{marginLeft: "3em"}}>
      <DisplayTable players={players.slice(30,40)}></DisplayTable>
    </div>
    : null}
    </div>
    )
    
  }

export default DisplayMultipleTables