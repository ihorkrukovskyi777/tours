export const isTomorrowOrToday = (value, numbDate = 0) => {
     // Oct 23
    const newData = value.replace(/(\d+[/])(\d+[/])/, '$2$1');
    const date = new Date(newData);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + numbDate);
    tomorrow.setHours(0, 0, 0, 0);
    const tomorrowStart = tomorrow.valueOf();
    tomorrow.setHours(23, 59, 59, 999);
    const tomorrowEnd = tomorrow.valueOf();
    return date.valueOf() >= tomorrowStart && date.valueOf() <= tomorrowEnd;
};
