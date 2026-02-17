// Sentry removed: instrumentation is no longer present.
export const onRequestError = (err: unknown) => {
  // no-op; previously forwarded to Sentry
  console.error(err);
};
