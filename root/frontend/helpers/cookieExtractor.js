export const cookieExtractor = (headers) => {
  let extractedStr = headers.map["set-cookie"];
  const lastVal = extractedStr.indexOf(";");
  return extractedStr.substring(12, lastVal);
};
