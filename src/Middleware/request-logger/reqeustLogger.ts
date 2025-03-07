import { logger } from "../../utils/logger";
import { Request, Response, NextFunction } from "express";

const isObjectEmpty = (obj: object) => {
  if (Object.keys(obj).length === 0) {
    return true;
  }
  return false;
};

const logRequests = (req: Request, res: Response, next: NextFunction) => {
  logger.log("info", {
    Time: new Date().toUTCString(),
    Enpoint: req.path,
    Status: res.statusCode,
    ...(!isObjectEmpty(req.body) && { Body: req.body }),
    ...(!isObjectEmpty(req.params) && { Body: req.params }),
    ...(!isObjectEmpty(req.query) && { Body: req.query }),
  });

  next();
};

export default logRequests;
