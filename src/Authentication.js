import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Modal,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import loginUser from "./auth.service";
import './Authentication.css';

function Authentication() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordDoNotMatch, setPasswordDoNotMatch] = useState("");
  const [invalidData, setInvalidData] = useState("");
  const [email, setEmail] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = (e) => {
    if (password !== confirmPassword) {
      setPasswordDoNotMatch("Passwords do not match.");
      return;
    } else {
      // ruta spre alta pg
    }
  };
  const handleLoginSubmit = async (e) => {
    try {
      const response = await loginUser(email, passwordLogin);
      localStorage.setItem("token", response.accessToken);
      navigate('/home', { state: { email: email } });
      handleCloseModal();
    } catch (error) {
      setInvalidData("Invalid email or password.");
      handleShowModal();
    }
  };
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
                    handleLoginSubmit();
                  }}
                >
                  <Form.Group className="mb-3" controlId="loginEmail">
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="loginPassword">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      required
                      onChange={(e) => setPasswordLogin(e.target.value)}
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
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-2" controlId="confirmPassword">
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      required
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Form.Group>
                  {passwordDoNotMatch && (
                    <div className="error-message">{passwordDoNotMatch}</div>
                  )}
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

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{invalidData}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Authentication;
