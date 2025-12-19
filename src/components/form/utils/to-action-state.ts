import * as z from "zod";

export type ActionState = { message: string | string[]; payload?: FormData };

const fromErrorToActionState = (
  error: unknown,
  formData: FormData
): ActionState => {
  // zod error
  if (error instanceof z.ZodError) {
    const errorMessage = error.issues.map((err) => err.message);
    console.log(errorMessage);

    return {
      message: errorMessage,
      payload: formData,
    };
  }
  // database error
  else if (error instanceof Error) {
    return {
      message: error.message,
      payload: formData,
    };
  }
  // generic error
  else {
    return {
      message: "An unknown error occured",
      payload: formData,
    };
  }
};

export default fromErrorToActionState;
