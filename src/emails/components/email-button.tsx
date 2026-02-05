import { Button as ReactEmailButton } from "@react-email/components";

type EmailButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export const EmailButton = ({
  href,
  children,
  variant = "primary",
}: EmailButtonProps) => {
  return (
    <ReactEmailButton
      href={href}
      style={{
        backgroundColor: variant === "primary" ? "#ffffff" : "transparent",
        color: variant === "primary" ? "#0f0f1e" : "#ffffff",
        borderRadius: "4px",
        border: variant === "primary" ? "none" : "1px solid #ffffff",
        padding: "10px 20px",
        fontSize: "13px",
        fontWeight: "600",
        textDecoration: "none",
        display: "inline-block",
        cursor: "pointer",
      }}
    >
      {children}
    </ReactEmailButton>
  );
};
