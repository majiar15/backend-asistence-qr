export function getDateUTC(date: Date = new Date()): Date {
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0));
    return utcDate;
}