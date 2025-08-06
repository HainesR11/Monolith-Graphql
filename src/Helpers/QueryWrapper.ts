import { pool } from "../Services/Postgres/postgres";
import { QueryTypes, responseTypes } from "../types/types";
import { logger } from "../utils/logger";
import QueryError from "../utils/QueryError";

interface IQueryWrapper {
  query: string;
  queryType: QueryTypes;
  responseType?: responseTypes;
  queryParams?: Array<string | number | string[]>;
  mapper?: (value: any) => void;
  onError?: (error: Error) => void;
}

const remapper = (
  row: any,
  mapper?: (value: any) => void,
  isSingleEntry?: boolean
) => {
  if (mapper) {
    return isSingleEntry ? mapper(row[0]) : row.map(mapper);
  }

  return isSingleEntry ? row[0] : row;
};

/**
    Wrapper for Postrgres Querys and mutations. Used to return results or catch errors

    @param query - The query to run
    @param queryType - The type of query
    @param responseType - The type of results to expect
    @param params - The parameters for the query
    @param mapper - The function to map the results to a different format
    @param onError - The function to call on error
**/
const QueryWrapper = async ({
  query,
  queryType,
  responseType = responseTypes.Array,
  queryParams = [],
  mapper,
  onError,
}: IQueryWrapper) => {
  try {
    const { rows } = await pool.query(query, queryParams);
    const isSingleEntry = responseType === responseTypes.Single;

    switch (queryType) {
      case QueryTypes.Query:
        return remapper(rows, mapper, isSingleEntry);
      case QueryTypes.Mutation:
        return remapper(rows, mapper, isSingleEntry);
      default:
        throw new Error("Invalid query type");
    }
  } catch (err) {
    logger.error(`Error running ${queryType}: ${err}`);
    return onError
      ? onError(err as Error)
      : new QueryError("Query failed", err as Error, queryType);
  }
};

export default QueryWrapper;
