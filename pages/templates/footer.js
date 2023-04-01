import styles from "../../styles/Home.module.css";
import {
  Container,
  Card,
  Row,
  Text,
  Col,
  Spacer,
  Divider,
} from "@nextui-org/react";

export default function App(data) {
  return (
    <Container gap={0}>
      <Row gap={5}>
        <Col>
          <Card css={{ $$cardColor: "transparent" }}>
            <Card.Divider />
            <Card.Body>
              <Text h3 color="white" css={{ m: 0 }}>
                Contact Us
              </Text>

              <Text h6 color="white" css={{ m: 0 }}>
                Email: monTool@gmail.com
              </Text>
              <Text h6 color="white" css={{ m: 0 }}>
                Phone: +373851254587
              </Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card css={{ $$cardColor: "transparent" }}>
            <Card.Body>
              <Text h3 color="white" css={{ m: 0 }}>
                About Us
              </Text>
              <Text h6 color="white" css={{ m: 0 }}>
                Team
              </Text>
              <Text h6 color="white" css={{ m: 0 }}>
                Motivation
              </Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card css={{ $$cardColor: "transparent" }}>
            <Card.Body>
              <Text h3 color="white" css={{ m: 0 }}>
                Follow Us
              </Text>
              <Text h6 color="white" css={{ m: 0 }}>
                Twiter
              </Text>
              <Text h6 color="white" css={{ m: 0 }}>
                Facebook
              </Text>
              <Text h6 color="white" css={{ m: 0 }}>
                Instagram
              </Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Spacer y={1} />
      <Divider></Divider>
      <Row>
        <Col>
          <Card css={{ $$cardColor: "transparent" }}>
            <Card.Body>
              <Text
                size={12}
                color="white"
                css={{ m: 0 }}
                justify="center"
                align="center"
              >
                *A project developed in partial fulfillment for the year 3 group
                project Bachelor of Science in Computing at TU Dublin
              </Text>
              <Text
                size={12}
                color="white"
                css={{ m: 0 }}
                justify="center"
                align="center"
              >
                ❤️
              </Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
