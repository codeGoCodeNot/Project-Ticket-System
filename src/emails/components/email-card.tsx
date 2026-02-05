import { Section } from "@react-email/components";
import { ReactNode } from "react";

type EmailCardProps = {
  children: ReactNode;
  backgroundColor?: string;
};

export const EmailCard = ({
  children,
  backgroundColor = "#0f0f1e",
}: EmailCardProps) => {
  return (
    <Section
      style={{
        backgroundColor,
        borderRadius: "4px",
        padding: "16px",
        marginBottom: "16px",
        border: "1px solid #2a2a3e",
      }}
    >
      {children}
    </Section>
  );
};
