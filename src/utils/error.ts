const ensureError = (value: unknown): Error => {
  if (value instanceof Error) return value;
  return new Error(JSON.stringify(value));
};

export default ensureError;
