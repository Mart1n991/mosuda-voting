import { Html, Head, Body, Container, Section, Text, Button, Heading, Font } from "@react-email/components";

interface EmailProps {
  verificationLink: string;
  translations: {
    title: string;
    thankYou: string;
    instructions: string;
    button: string;
    validity: string;
    ignore: string;
  };
}

const VoteVerificationEmail = ({ verificationLink, translations }: EmailProps) => {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Lexend"
          fallbackFontFamily={["Arial", "sans-serif"]}
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&display=swap",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Body style={{ fontFamily: "Lexend, Arial, sans-serif" }}>
        <Container style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
          <Heading style={{ color: "#333", fontFamily: "Lexend, Arial, sans-serif" }}>{translations.title}</Heading>
          <Text style={{ fontFamily: "Lexend, Arial, sans-serif" }}>{translations.thankYou}</Text>
          <Text style={{ fontFamily: "Lexend, Arial, sans-serif" }}>{translations.instructions}</Text>
          <Section style={{ margin: "30px 0" }}>
            <Button
              href={verificationLink}
              style={{
                backgroundColor: "#39d2c0",
                color: "black",
                padding: "12px 20px",
                textDecoration: "none",
                borderRadius: "6px",
                display: "inline-block",
                fontFamily: "Lexend, Arial, sans-serif",
              }}
            >
              {translations.button}
            </Button>
          </Section>
          <Text style={{ fontFamily: "Lexend, Arial, sans-serif" }}>{translations.validity}</Text>
          <Text style={{ color: "#666", marginTop: "30px", fontSize: "12px", fontFamily: "Lexend, Arial, sans-serif" }}>
            {translations.ignore}
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default VoteVerificationEmail;
