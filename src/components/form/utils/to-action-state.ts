import * as z from "zod";

export type ActionState = {
  status?: "SUCCESS" | "ERROR";
  message: string | string[];
  payload?: FormData;
  fieldErrors: Record<string, string[] | undefined>;
  timestamp: number;
};

export const EMPTY_ACTION_STATE: ActionState = {
  message: "",
  fieldErrors: {},
  timestamp: Date.now(),
};

const fromErrorToActionState = (
  error: unknown,
  formData?: FormData
): ActionState => {
  // zod error
  if (error instanceof z.ZodError) {
    const flattenError = z.flattenError(error).fieldErrors;

    return {
      status: "ERROR",
      message: "",
      fieldErrors: flattenError,
      payload: formData,
      timestamp: Date.now(),
    };
  }
  // database error
  else if (error instanceof Error) {
    return {
      status: "ERROR",
      message: error.message,
      fieldErrors: {},
      payload: formData,
      timestamp: Date.now(),
    };
  }
  // generic error
  else {
    return {
      status: "ERROR",
      message: "An unknown error occurred",
      fieldErrors: {},
      payload: formData,
      timestamp: Date.now(),
    };
  }
};

// can use in happy path
export const toActionState = (
  status: ActionState["status"],
  message: string,
  formData?: FormData
): ActionState => {
  return {
    status,
    message,
    fieldErrors: {},
    payload: formData,
    timestamp: Date.now(),
  };
};

export default fromErrorToActionState;
