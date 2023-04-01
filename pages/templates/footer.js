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
      <Row gap={1}>
        <Col>
          <Card css={{ $$cardColor: "$colors$primary" }}>
            <Card.Body>
              <Text h6 size={15} color="white" css={{ m: 0 }}>
                1 of 3
              </Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card css={{ $$cardColor: "$colors$primary" }}>
            <Card.Body>
              <Text h6 size={15} color="white" css={{ m: 0 }}>
               Footer
              </Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card css={{ $$cardColor: "$colors$primary" }}>
            <Card.Body>
              <Text h6 size={15} color="white" css={{ m: 0 }}>
                3 of 3
              </Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Spacer y={1} />
      <Divider></Divider>
      <Row gap={1}>
        <Col>
          <Card css={{ $$cardColor: "$colors$primary" }}>
            <Card.Body>
              <Text h6 size={15} color="white" css={{ m: 0 }}>
                1 of 2
              </Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
