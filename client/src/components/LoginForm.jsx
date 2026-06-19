import { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import { login } from '../api/auth.js'
import '../styles/LoginForm.css'

const EMPTY_USERNAME_OR_PASSWORD_MSG = "Username or Password are empty!"

function LoginForm(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrMsg('')

        try {
            // Validation
            if (username === "" || password === "") throw new Error(EMPTY_USERNAME_OR_PASSWORD_MSG)

            // Fetch user
            const user = await login(username, password)

            // Log In
            props.doLogin(user)

        } catch (err) {
            setErrMsg(err.message)
        }
    }

    return(
        <>
            <Container className='login-form-container'> 
                <Form className="login-form" onSubmit={handleSubmit}>
                    <h2 className='login-form-title'>Welcome Back</h2>
                    {errMsg && <p className="login-error-message">{errMsg}</p>}

                    <Form.Group className='login-form-group'>
                        <Form.Label className='login-form-label'> Username </Form.Label>
                        <Form.Control
                            className='login-form-control'
                            type='text'
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => { setUsername(e.target.value) }}
                        />
                    </Form.Group>

                    <Form.Group className='login-form-group'>
                        <Form.Label className='login-form-label'> Password </Form.Label>
                        <Form.Control
                            className='login-form-control'
                            type="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                    </Form.Group>

                    <Button className='login-submit-button' type="submit">
                        Login
                    </Button>
                </Form>
            </Container>
        </>
    )
}

export default LoginForm