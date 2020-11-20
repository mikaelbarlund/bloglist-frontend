import React, { useState } from 'react'

const Login = ({ handleLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const doLogin = async (event) => {
        event.preventDefault()
        setUsername('')
        setPassword('')
        handleLogin({
            username, password,
        })
    }
    return (
        <>
            <h2>log in to application</h2>
            <form onSubmit={doLogin}>
                <div>
                    username
          <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
          <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </>
    )
}

export default Login