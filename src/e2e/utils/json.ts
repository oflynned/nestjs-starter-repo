export const prettyPrint = (json: unknown): void => {
  console.log(JSON.stringify(json, null, 2));
};
