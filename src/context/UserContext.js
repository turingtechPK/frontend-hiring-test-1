import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [auth, setAuth] = useState(false)

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        password,
        setPassword,
        auth,
        setAuth
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.node
}

export { UserProvider }
