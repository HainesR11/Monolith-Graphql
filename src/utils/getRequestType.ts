export default (query?: string) => {
  const q2 = query?.substring(0, query?.indexOf(" "));
  return q2 === "query" ? "Query" : "Mutation";
};
