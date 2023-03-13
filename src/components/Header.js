import React from 'react'

const header = ({showForm,setShowForm}) => {
  return (
    <header className='header'>
    <div className="logo">
      <img
        src="logo.png"
        height="68"
        width="68"
        alt="Today I Learned Logo"
      />
      <h1>Today I Learned</h1>
    </div>

    <button className="btn btn-large btn-open" onClick={() => setShowForm(!showForm)}>{showForm ?"Close":"Share a fact"}</button>
    </header>
  )
}

export default header