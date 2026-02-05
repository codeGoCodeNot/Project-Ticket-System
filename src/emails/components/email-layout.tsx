import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
} from "@react-email/components";
import { ReactNode } from "react";

type EmailLayoutProps = {
  children: ReactNode;
  previewText?: string;
};

// Dark theme colors matching your ticket system
const primaryColor = "#ffffff";
const backgroundColor = "#0f0f1e";
const cardBg = "#1a1a2e";
const textColor = "#ffffff";
const mutedColor = "#8b92b1";
const borderColor = "#2a2a3e";

export const EmailLayout = ({ children, previewText }: EmailLayoutProps) => {
  return (
    <Html>
      <Head>
        {previewText && <title>{previewText}</title>}
        <meta name="color-scheme" content="dark" />
        <meta name="supported-color-schemes" content="dark" />
      </Head>
      <Body
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          backgroundColor,
          color: textColor,
          lineHeight: "1.6",
          margin: 0,
          padding: "16px",
        }}
      >
        <Container
          style={{
            maxWidth: "560px",
            margin: "0 auto",
            backgroundColor: cardBg,
            borderRadius: "6px",
            overflow: "hidden",
            border: `1px solid ${borderColor}`,
          }}
        >
          {/* Header */}
          <Section
            style={{
              padding: "24px",
              borderBottom: `1px solid ${borderColor}`,
            }}
          >
            <Text
              style={{
                margin: 0,
                fontSize: "14px",
                fontWeight: "600",
                color: mutedColor,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              TicketHub
            </Text>
          </Section>

          {/* Content */}
          <Section style={{ padding: "32px 24px" }}>{children}</Section>

          {/* Footer */}
          <Section
            style={{
              padding: "16px 24px",
              borderTop: `1px solid ${borderColor}`,
              textAlign: "center",
            }}
          >
            <Text
              style={{
                margin: "0",
                fontSize: "11px",
                color: mutedColor,
              }}
            >
              © {new Date().getFullYear()} TicketHub
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export {
  primaryColor,
  backgroundColor,
  textColor,
  mutedColor,
  cardBg,
  borderColor,
};
