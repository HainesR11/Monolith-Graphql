export default (query?: string) => {
  const q2 = query?.substring(10, query?.indexOf(" "));

  return q2?.includes("query") ? "Query" : "Mutation";
};
