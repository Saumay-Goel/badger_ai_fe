interface ValidationError {
  loc: string[];
  msg: string;
}

interface ErrorData {
  detail?: ValidationError[] | string;
  message?: string;
}

export function getErrorMessage(errorData: ErrorData): string {
  if (Array.isArray(errorData.detail)) {
    return errorData.detail
      .map((err: ValidationError) => `${err.loc.join(".")}: ${err.msg}`)
      .join(", ");
  }

  if (typeof errorData.detail === "string") {
    return errorData.detail;
  }

  if (typeof errorData.message === "string") {
    return errorData.message;
  }

  return "An unexpected error occurred.";
}
