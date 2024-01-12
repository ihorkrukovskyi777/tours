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


export function toHoursAndMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return {hours, minutes};
}

export function pad2(number) {
    return (number < 10 ? '0' : '') + number
}

export const setFormatDDMMYYYYtoMMDDYYYY = (date, separator = '/') => {
    const [day, month, year] = date.split('/');
    return month + separator + day + separator + year;
};
