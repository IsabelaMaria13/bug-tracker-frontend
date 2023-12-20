import React, {useState} from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function Authentication() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSubmit = (e) => {
    if(password !== confirmPassword){
        setErrorMessage('Passwords do not match.');
        return;
    }
    else{
        // ruta spre alta pg
    }
  }
  return (
    <Container fluid className="bg-dark text-white p-5 background-container">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-4">
            <Row>
              <Col md={6}>
                <h3>Login</h3>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    navigate("/home");
                  }}
                >
                  <Form.Group className="mb-3" controlId="loginEmail">
                    <Form.Control type="email" placeholder="Email" required />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="loginPassword">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="loginRememberMe">
                    <Form.Check type="checkbox" label="Remember me" />
                  </Form.Group>
                  <Button variant="dark" type="submit">
                    Go
                  </Button>
                </Form>
              </Col>


              <Col md={6}>
                <h3>Register</h3>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  <Form.Group className="mb-3" controlId="registerEmail">
                    <Form.Control type="email" placeholder="Email" required />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="registerPassword">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      required
                      onChange={(e)=>setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-2"
                    controlId="confirmPassword"
                  >
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      required
                      onChange={(e)=>setConfirmPassword(e.target.value)}
                    />
                  </Form.Group>
                  {errorMessage && <div className="error-message">{errorMessage}</div>}
                  <Button variant="dark" type="submit">
                    Create
                  </Button>
                </Form>
              </Col>
            </Row>
          </Card>
          <div className="text-center mt-3 white-text">
            ©CTRL+C/CTRL+V DEV TEAM
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Authentication;
