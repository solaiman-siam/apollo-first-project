import { TErrorReturn, TErrorSources } from "../interface/error";

export const duplicateErrorHandler = (err: any) : TErrorReturn => {


    const match = err?.errmsg?.match(/"([^"]+)"/);

  const errorMessage = (match[1]); // Output: name: "Department of Management"


  const errorSources : TErrorSources = [{
    path: '',
    message: `${errorMessage} is already exists`,
  }];


  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid Id',
    errorSources,
  };
};
