import { Response } from "express";

interface IResponse {
  statusCode: number;
  message: string;
  payload?: any;
}

// Send success response
export const success_res = (res: Response, data: IResponse) => {
  res.status(data.statusCode).json({
    status: "success",
    statusCode: data.statusCode,
    message: data.message,
    payload: data.payload,
  });
};

// Send error response
export const error_res = (res: Response, data: { statusCode: number; message: string }) => {
  res.status(data.statusCode).json({
    status: "error",
    statusCode: data.statusCode,
    message: data.message,
  });
};