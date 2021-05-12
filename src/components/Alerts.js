import Alert from 'react-bootstrap/Alert'
import React from 'react'

const Alerts = ({alert}) => {

    return(
        <div>
        {alert !== undefined && alert.player.length > 0 
            ?(
            <Alert variant="success" style={{position: "fixed", width: "100%", zIndex: "100"}}>
            <Alert.Heading>{alert.player}</Alert.Heading>
            <p>{alert.message}</p>
            </Alert>
            )
            : null
            }
        </div>
    )
}

export default Alerts