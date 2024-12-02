import React from 'react';
import { useLoginLogic } from '../pages-logic/LoginLogic';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import '../styles/Login.css'

const LoginPage = () => {
  const { email, password, error, handleInputChange, handleLogin } = useLoginLogic();
  return (
    <div className="login-container" >
      <div className="login-form-wrapper form-bordered">
        <div className="center-horizontal">
          <h1>
            Login
          </h1>
        </div>
        <Form onSubmit={handleLogin}>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Email
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
            <Form.Label column sm={3}>
              Password
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>
          
          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit">Sign in</Button>
            </Col>
          </Form.Group>
        </Form>
        {error && (
          <div>
            {['danger'].map((variant) => (
              <Alert key={variant} variant={variant}>
                {error}
              </Alert>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;