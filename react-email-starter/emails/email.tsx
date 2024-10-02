import {
    Body,
    Column,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
    Row,
  } from "@react-email/components";
  import * as React from "react";
  
  export const CorreoDeAgradecimiento = () => (
    <Html>
      <Head />
      <Preview>Gracias por tu donación</Preview>
      <Body style={main}>
        <Container style={container}>  
          <Section style={header}>
            <Row>
              <Column style={headerContent}>
                <Heading style={headerContentTitle}>
                    Gracias por tu Donación!
                </Heading>
              </Column>
              <Column style={headerImageContainer}>
              </Column>
            </Row>
          </Section>
  
          <Section style={content}>
            <Heading as="h2" style={title}>
              Searching for solutions
            </Heading>
            <Text style={paragraph}>
              With more than 18 million questions, it's possible that someone has
              already provided a solution to the problem you're facing.{" "}
            </Text>
  
            <Hr style={divider} />
            <Img src="https://sanders.com.mx/wp-content/uploads/2022/08/5.png" alt="Fundación Sanders"/>
            <Heading as="h2" style={title}>
              Use the search bar at the top of the page to find what you need
            </Heading>
            <Text style={paragraph}>
              Here are a few simple search tips to get you started:
            </Text>
            <Text style={paragraph}>
              The more information you can put in the search bar, the more likely
              you will be to either find the answer you need or feel confident
              that no one else has asked the question before.
            </Text>
  
            <Hr style={divider} />
  
            <Heading as="h2" style={title}>
              Take a break and read about the worst coder in the world
            </Heading>
  
            <Section style={buttonContainer}>
              <Link style={button} href="https://sanders.com.mx/">
                Conoce más
              </Link>
            </Section>
          </Section>
        </Container>

      </Body>
    </Html>
  );

  
  export default CorreoDeAgradecimiento;
  
  const main = {
    backgroundColor: "#f3f3f5",
    fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
  };
  
  const headerContent = { padding: "20px 30px 15px" };
  
  const headerContentTitle = {
    color: "#fff",
    fontSize: "27px",
    fontWeight: "bold",
    lineHeight: "27px",
  };
  
  const headerImageContainer = {
    padding: "30px 10px",
  };
  
  const title = {
    margin: "0 0 15px",
    fontWeight: "bold",
    fontSize: "21px",
    lineHeight: "21px",
    color: "#0c0d0e",
  };
  
  const paragraph = {
    fontSize: "15px",
    lineHeight: "21px",
    color: "#3c3f44",
  };
  
  const divider = {
    margin: "30px 0",
  };
  
  const container = {
    width: "680px",
    maxWidth: "100%",
    margin: "0 auto",
    backgroundColor: "#ffffff",
  };
  
  const content = {
    padding: "30px 30px 40px 30px",
  };
  
  const header = {
    borderRadius: "5px 5px 0 0",
    display: "flex",
    flexDireciont: "column",
    backgroundColor: "#2b2d6e",
  };
  
  const buttonContainer = {
    marginTop: "24px",
    display: "block",
  };
  
  const button = {
    backgroundColor: "#0095ff",
    border: "1px solid #0077cc",
    fontSize: "17px",
    lineHeight: "17px",
    padding: "13px 17px",
    borderRadius: "4px",
    maxWidth: "120px",
    color: "#fff",
  };