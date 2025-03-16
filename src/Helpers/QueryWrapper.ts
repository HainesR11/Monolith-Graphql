import { pool } from "../Services/Postgres/postgres";
import { QueryTypes, responseTypes } from "../types/types";
import { logger } from "../utils/logger";

interface IQueryWrapper {
  query: string;
  queryType: QueryTypes;
  responseType?: responseTypes;
  params?: Array<string>;
  mapper?: (value: any) => void;
}

const remapper = (
  row: any,
  isSingleEntry: boolean,
  mapper?: (value: any) => void
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
**/
const QueryWrapper = async ({
  query,
  queryType,
  responseType = responseTypes.Array,
  params = [],
  mapper,
}: IQueryWrapper) => {
  try {
    const isSingleEntry = responseType === responseTypes.Single;
    const result = await pool.query(query, params);

    return remapper(result.rows, isSingleEntry, mapper);
  } catch (err) {
    logger.error(`Error running ${queryType}: ${err}`);
    throw new Error(`Error running ${queryType}`);
  }
};

export default QueryWrapper;
