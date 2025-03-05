import express from "express";

import { useLogger } from "../utils/logger";
import { AuthHeader } from "../constants/Headers";

const NONAUTHENTICATION_PATHS = [];

const middlewear = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const logger = useLogger();

  const requiresAuthentication = !NONAUTHENTICATION_PATHS.some((url) =>
    req.url.includes(url)
  );

  if (requiresAuthentication) {
    const token = req.header(AuthHeader);

    if (!token) {
      logger.error({
        message: "[Authentication] Header is missing authentication token",
        key: "http.header.auth",
      });
      res.sendStatus(401);
    } else {
      next();
    }
  } else {
    next();
  }
};

export default middlewear;
