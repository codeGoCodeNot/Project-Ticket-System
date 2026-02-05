import { Heading as ReactEmailHeading, Text } from "@react-email/components";
import { textColor, mutedColor } from "./email-layout";

type EmailHeadingProps = {
  title: string;
  subtitle?: string;
};

export const EmailHeading = ({ title, subtitle }: EmailHeadingProps) => {
  return (
    <>
      <ReactEmailHeading
        style={{
          fontSize: "24px",
          fontWeight: "600",
          margin: "0 0 8px 0",
          color: textColor,
          lineHeight: "1.3",
        }}
      >
        {title}
      </ReactEmailHeading>
      {subtitle && (
        <Text
          style={{
            fontSize: "14px",
            color: mutedColor,
            margin: "0 0 16px 0",
            lineHeight: "1.5",
          }}
        >
          {subtitle}
        </Text>
      )}
    </>
  );
};
