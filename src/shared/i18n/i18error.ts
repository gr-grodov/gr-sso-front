import i18next from 'i18next';

export const tError = (key: string, options?: Record<string, unknown>): string => {
  const message = i18next.t(`errors:${key}`, options)

  if (message === `errors:${key}`) {
    return tError("errors:global.default");
  }
  return message;
}
  ;