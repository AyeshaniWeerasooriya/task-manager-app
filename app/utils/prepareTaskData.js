// utils/prepareTaskData.js
import { getNextDueDate } from "./dateUtils";

export function prepareTaskData({ title, description, userId }) {
  const allText = `${title} ${description}`;
  const tags = [...allText.matchAll(/#\w+/g)].map((m) => m[0].toLowerCase());

  const weekdays = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };

  const monthNames = {
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    may: 4,
    jun: 5,
    jul: 6,
    aug: 7,
    sep: 8,
    oct: 9,
    nov: 10,
    dec: 11,
  };

  let dueDate = new Date(); // fallback default
  let isRepeatable = false;
  let repeatRule = null;

  // === 1. Smart hashtags (due date)
  if (tags.includes("#today")) {
    dueDate = new Date();
  } else if (tags.includes("#tomorrow")) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dueDate = tomorrow;
  }

  // === 2. Repeatable hashtags (only one allowed for now)
  const repeatTags = tags.filter((t) => t.startsWith("#every"));

  if (repeatTags.length > 0) {
    isRepeatable = true;

    // Use the first valid one
    for (const tag of repeatTags) {
      const value = tag.replace("#every", "").toLowerCase();

      if (value === "day" || value === "daily") {
        dueDate = getNextDueDate("daily");
        repeatRule = { type: "daily" };
        break;
      }

      if (weekdays[value] !== undefined) {
        dueDate = getNextDueDate("weekly", { dayOfWeek: weekdays[value] });
        repeatRule = { type: "weekly", dayOfWeek: weekdays[value] };
        break;
      }

      if (/^\d{1,2}(st|nd|rd|th)?$/.test(value)) {
        const dayNum = parseInt(value);
        dueDate = getNextDueDate("monthly", { dayOfMonth: dayNum });
        repeatRule = { type: "monthly", dayOfMonth: dayNum };
        break;
      }

      const match = value.match(
        /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)(\d{1,2})(st|nd|rd|th)?$/
      );
      if (match) {
        const month = monthNames[match[1]];
        const day = parseInt(match[2]);
        dueDate = getNextDueDate("yearly", { month, day });
        repeatRule = { type: "yearly", month, day };
        break;
      }
    }
  }

  return {
    title,
    description,
    createdAt: new Date().toISOString(),
    dueDate: dueDate.toISOString(),
    isRepeatable,
    repeatRule,
    tags: tags.filter(
      (t) => !t.startsWith("#every") && t !== "#today" && t !== "#tomorrow"
    ),
    userId,
  };
}
