export const DateUtils = {
  /**
   * dd.mm.yyyy
   */
  formatDate(value: string | Date): string {
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(value));
  },

  /**
   * dd.mm.yyyy HH:mm
   */
  formatDateTime(value: string | Date): string {
    const date = new Date(value);

    const datePart = new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);

    const timePart = new Intl.DateTimeFormat("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);

    return `${datePart} ${timePart}`;
  },

  /**
   * dd.mm.yyyy HH:mm:ss
   */
  formatDateTimeSeconds(value: string | Date): string {
    const date = new Date(value);

    const datePart = new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);

    const timePart = new Intl.DateTimeFormat("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date);

    return `${datePart} ${timePart}`;
  },

  /**
   * HH:mm
   */
  formatTime(value: string | Date): string {
    return new Intl.DateTimeFormat("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date(value));
  },

  /**
   * HH:mm:ss
   */
  formatTimeSeconds(value: string | Date): string {
    return new Intl.DateTimeFormat("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date(value));
  },

  /**
   * HH:mm dd.mm.yyyy
   */
  formatTimeDate(value: string | Date): string {
    const date = new Date(value);

    const timePart = new Intl.DateTimeFormat("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);

    const datePart = new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);

    return `${timePart} ${datePart}`;
  },

  /**
   * yyyy
   */
  formatYear(value: string | Date): string {
    return new Intl.DateTimeFormat("ru-RU", {
      year: "numeric",
    }).format(new Date(value));
  },

  /**
   * mmmm
   */
  formatMonth(value: string | Date): string {
    return new Intl.DateTimeFormat("ru-RU", {
      month: "long",
    }).format(new Date(value));
  },

  /**
   * d mmmm
   */
  formatDayMonth(value: string | Date): string {
    return new Intl.DateTimeFormat("ru-RU", {
      day: "numeric",
      month: "long",
    }).format(new Date(value));
  },
};