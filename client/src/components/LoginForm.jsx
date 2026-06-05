import { Form, Button, Container } from 'react-bootstrap';
import '../styles/LoginForm.css'

function LoginForm(props) {
    return(
        <>
            <Container> 
                <Form className="login-form">
                    <Form.Group>
                        <Form.Label> Username </Form.Label>
                        <Form.Control type="username" placeholder="Enter username" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label> Password </Form.Label>
                        <Form.Control type="password"/>
                    </Form.Group>

                    <Button type="submit">
                        Login
                    </Button>
                </Form>
            </Container>
        </>
    )
}

export default LoginForm