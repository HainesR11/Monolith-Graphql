import { pool } from "../Services/Postgres/postgres";
import { QueryTypes, ResultsTypes } from "../types/types";

type QueryWrapper = {
  query: string;
  queryType: QueryTypes;
  resultsType?: ResultsTypes;
  params?: Array<string>;
};

/**
    Wrapper for Postrgres Querys and mutations. Used to return results or catch errors

    @param query - The query to run
    @param queryType - The type of query
    @param resultsType - The type of results to expect
**/
const QueryWrapper = async ({
  query,
  queryType,
  resultsType = ResultsTypes.Array,
  params = [],
}: QueryWrapper) => {
  try {
    const result = await pool.query(query, params);

    if (resultsType === ResultsTypes.Single) {
      return result.rows[0];
    }

    return result.rows;
  } catch (err) {
    throw new Error(`Error running ${queryType}`);
  }
};

export default QueryWrapper;
