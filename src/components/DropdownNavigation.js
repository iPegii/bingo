import React from "react"
import Dropdown from "react-bootstrap/Dropdown"

const DropdownNavigation = ({ players, handleDelete }) => {
  return (
    <div>
      <Dropdown
        style={{
          textAlign: "left",
          marginLeft: "1em",
          marginTop: "-1em",
          position: "fixed",
          zIndex: "99",
        }}
      >
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          Lista
        </Dropdown.Toggle>

        <Dropdown.Menu onSelect={handleDelete}>
          {players === undefined || players.length < 0 ? null : (
            <div>
              {players.map((player, index) => (
                <div>
                  <Dropdown.Item
                    key={index}
                    id={player.id}
                    href={player.id}
                    eventKey={player.id}
                    onClick={handleDelete}
                  >
                    {player.name}
                  </Dropdown.Item>
                </div>
              ))}
            </div>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default DropdownNavigation
