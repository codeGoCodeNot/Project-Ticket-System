import * as z from "zod";

export type ActionState = {
  message: string | string[];
  payload?: FormData;
  fieldErrors: Record<string, string[] | undefined>;
};

const fromErrorToActionState = (
  error: unknown,
  formData: FormData
): ActionState => {
  // zod error
  if (error instanceof z.ZodError) {
    const flattenError = z.flattenError(error).fieldErrors;

    return {
      message: "",
      fieldErrors: flattenError,
      payload: formData,
    };
  }
  // database error
  else if (error instanceof Error) {
    return {
      message: error.message,
      fieldErrors: {},
      payload: formData,
    };
  }
  // generic error
  else {
    return {
      message: "An unknown error occured",
      fieldErrors: {},
      payload: formData,
    };
  }
};

export default fromErrorToActionState;
