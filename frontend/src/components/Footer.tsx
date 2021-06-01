import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

const Footer: React.FC = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-left py-3">Copyrights &copy; SHEShop</Col>

          <Col
            id="social-icons"
            style={{ marginLeft: "445px", marginTop: "10px" }}
          >
            <p>Follow Us on:</p>
            <div>
              <Image
                src="/images/social/facebook.png"
                alt=""
                className="px-2"
              ></Image>
              <Image
                src="/images/social/twitter.png"
                alt=""
                className="pr-2"
              ></Image>
              <Image
                src="/images/social/instagram.png"
                alt=""
                className="pr-2"
              ></Image>
              <Image
                src="/images/social/pinterest.png"
                alt=""
                className="pr-2"
              ></Image>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
