interface IDateProvider {
  compareHours(start_date: Date, end_date: Date): number
  convertToUTC(date: Date): string
  getCurrentDate(): Date
  getCurrentDayAfter24Hors(): Date
}
