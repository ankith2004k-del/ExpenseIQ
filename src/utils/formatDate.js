export function formatDate(dateString) {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function getRelativeDate(dateString) {
  const today = new Date();

  const date = new Date(dateString);

  const todayOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const compareDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  const diff =
    (todayOnly - compareDate) / (1000 * 60 * 60 * 24);

  if (diff === 0) return "Today";

  if (diff === 1) return "Yesterday";

  return formatDate(dateString);
}