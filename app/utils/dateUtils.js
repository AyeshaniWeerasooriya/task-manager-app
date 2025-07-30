// utils/dateUtils.js
export function getNextDueDate(recurrenceType, options = {}) {
  const today = new Date();
  let nextDate = new Date(today);

  switch (recurrenceType) {
    case "daily":
      nextDate.setDate(today.getDate() + 1);
      break;

    case "weekly":
      const dayOfWeek = options.dayOfWeek ?? 1;
      const currentDay = today.getDay();
      const diff = (dayOfWeek + 7 - currentDay) % 7 || 7;
      nextDate.setDate(today.getDate() + diff);
      break;

    case "monthly":
      const dayOfMonth = options.dayOfMonth ?? today.getDate();
      nextDate.setMonth(today.getMonth() + 1);
      nextDate.setDate(dayOfMonth);
      break;

    case "yearly":
      const { month = today.getMonth(), day = today.getDate() } =
        options.monthDay ?? {};
      nextDate.setFullYear(today.getFullYear() + 1);
      nextDate.setMonth(month);
      nextDate.setDate(day);
      break;

    default:
      throw new Error("Unknown recurrence type");
  }

  nextDate.setHours(0, 0, 0, 0);
  return nextDate;
}
