import React from 'react'

const DeleteProfile = () => {

  const handleDelete = () => {

  }
  return (
    <>
      <div className="notification is-danger is-light">
        <p> WARNING!!! Once your account is deleted, all associated data will be lost. If you are sure you wish to proceed, please click submit. If not, click the close button on the top right to cancel</p>
        <button className="button is-danger" onClick={handleDelete}>Delete My Account</button>


      </div>
    </>
  )
}

export default DeleteProfile
