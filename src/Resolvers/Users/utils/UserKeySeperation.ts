import { TUsers } from "../../../types/types";

type TUserKeySeperation = {
  props: Partial<TUsers>;
  mapper: (props: Partial<TUsers>) => Partial<TUsers>;
};

/**
 * Function that separates the user properties into keys and values. Also provides the updated_at key
 * 
 * PropsToUpdate is an object that contains the user properties and the updated_at key
 * 
 * @param props User properties to be separated
 * @param mapper Function that maps the user properties to the database columns
 * @returns 3 Object containing the query keys, params, and propsToUpdate ( updated_at key included )
 */

export const userKeySeperation = ({ props, mapper }: TUserKeySeperation) => {
  const propsToUpdate = {
    ...mapper(props),
    updated_at: new Date().toDateString(),
  };

  let queryKeys: Array<string> = [];
  let params: Array<string> = [];

  Object.keys(propsToUpdate).forEach((key, i) => {
    queryKeys.push(key + " = ($" + (i + 1) + ")");
  });

  Object.values(propsToUpdate).forEach((value, i) => {
    return params.push(value as string);
  });

  return { queryKeys, params, propsToUpdate };
};
