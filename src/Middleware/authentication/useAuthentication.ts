import express from "express";
import jwt from "jsonwebtoken";

import { logger } from "../../utils/logger";
import { AuthHeader } from "../../constants/Headers";

const NONAUTHENTICATION_PATHS = ["/graphiql", "/graphql", "/healthcheck"];

const middlewear = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const requiresAuthentication = !NONAUTHENTICATION_PATHS.some((url) =>
    req.url.includes(url)
  );

  const token = req.header(AuthHeader);

  if (!requiresAuthentication) {
    return next();
  }

  if (!token) {
    logger.error({
      message: "[Authentication] Header is missing authentication token",
      key: "http.header.auth",
    });
    res.sendStatus(401);
  }

  const isValidToken = () =>
    jwt.verify(token as string, process.env.MONGO_DB_PASSWORD as string);

  if (!isValidToken) {
    logger.error({
      message:
        "[Authentication] Token is invalid, Please authenticate and try again ",
      key: "http.header.auth",
    });
    res.sendStatus(401);
  } else {
    next();
  }
};

export default middlewear;
