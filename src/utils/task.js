import moment from "moment";

export const getCurrentDate = () => {
  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);

  return currentDate;
};

export const isTaskExpired = (dueDate, isToday) => {
  if (dueDate === null) {
    return false;
  }

  const currentDate = getCurrentDate();

  if (isToday) {
    return currentDate.getTime() === dueDate.getTime();
  } else {
    return currentDate.getTime() > dueDate.getTime();
  }
};

export const isTaskRepeating = (repeating) => {
  return Object.values(repeating).some(Boolean);
};

export const formatTaskDueDate = (dueDate) => {
  if (!(dueDate instanceof Date)) {
    return ``;
  }

  return moment(dueDate).format(`D MMMM`);
};

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortTasksUp = (a, b) => {
  const weight = getWeightForNullDate(a.dueDate, b.dueDate);

  if (weight !== null) {
    return weight;
  }

  return a.dueDate.getTime() - b.dueDate.getTime();
};

export const sortTasksDown = (a, b) => {
  const weight = getWeightForNullDate(a.dueDate, b.dueDate);

  if (weight !== null) {
    return weight;
  }

  return b.dueDate.getTime() - a.dueDate.getTime();
};

export const isDatesEqual = (dateA, dateB) => {
  return moment(dateA).isSame(dateB, `day`) || dateA === null && dateB === null;
};
