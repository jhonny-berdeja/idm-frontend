import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import '../styles/Login.css'

const Home = () => {
  return (
    <div className="login-container" >
        <Container>
          <Row>
            <Col sm>
              <div className="center-horizontal form-bordered">
                <Button variant="dark">
                  <h1>
                    Access Management
                  </h1>
                </Button>
              </div>
            </Col>
            <Col sm>
              <div className="center-horizontal form-bordered">
                <Button variant="dark">
                  <h1>
                  Human Resources
                  </h1>
                </Button>                
              </div>
            </Col>
            <Col sm>
              <div className="center-horizontal form-bordered">
                <Button variant="dark">
                  <h1>
                    Access Audit
                  </h1>
                </Button>                   
              </div>
            </Col>
          </Row>
        </Container>
    </div>
  );
};

export default Home;
