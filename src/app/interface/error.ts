export type TErrorSources = {
    path: string | number
    message: string
  }[]


  export type TErrorReturn = {
    statusCode: number;
    message: string;
    errorSources: TErrorSources
  }