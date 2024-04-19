export function getFormattedDate(date: Date | null): string | null {
  if (!date) {
    return null;
  }
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const getFormattedDateForInput = (date: Date | null) => {
  if (date === null) {
    return null;
  }
  const dateString = new Date(date);
  const year = dateString.getFullYear();
  const month = (dateString.getMonth() + 1).toString().padStart(2, '0');
  const day = dateString.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const capitalizeTitle = (key: string) => {
  return key
    .replace(/_/g, ' ') // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
};

export const getFormattedDateWithTime = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const getFormattedDateFromString = (dateString: string) => {
  if (!dateString) {
    return '---';
  }
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const getQueryString = (
  startDate: Date | null,
  endDate: Date | null
) => {
  let queryString;
  if (startDate && endDate) {
    const startYear = startDate.getFullYear();
    const startMonth = String(startDate.getMonth() + 1).padStart(2, '0');
    const startDay = String(startDate.getDate()).padStart(2, '0');

    const endYear = endDate.getFullYear();
    const endMonth = String(endDate.getMonth() + 1).padStart(2, '0');
    const endDay = String(endDate.getDate()).padStart(2, '0');

    queryString = `start=${startYear}-${startMonth}-${startDay}&end=${endYear}-${endMonth}-${endDay}`;
  } else {
    queryString = '';
  }
  return queryString;
};
