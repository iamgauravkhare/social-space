export const getExtension = (uri) => {
  const parts = uri.split(".");
  const ext = parts[parts.length - 1];
  return ext;
};
