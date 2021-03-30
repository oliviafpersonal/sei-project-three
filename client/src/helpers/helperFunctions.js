import React from 'react'

export const convertTimestamp = (timestamp) => {
  const date = Date.parse(timestamp)
  const newDate = new Date(date)
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
  ]

  return (months[newDate.getMonth()] + ' ' + newDate.getFullYear())
}

export const displayModal = (toggle, Component, toggleController, props) => {
  return (
    <>
      <div className={`modal ${toggle && 'is-active'}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
          {!props ? 
            <Component /> :
            < Component props={props} />}
        </div>
        <button className="modal-close is-large" onClick={toggleController} aria-label="close"></button>
      </div>
    </>
  )
}
