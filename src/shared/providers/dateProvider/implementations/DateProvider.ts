import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export class DateProvider implements IDateProvider {
  getCurrentDate(): Date {
    return dayjs().toDate()
  }

  getCurrentDayAfter24Hors(): Date {
    return dayjs().add(1, 'day').toDate()
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format()
  }

  compareHours(start_date: Date, end_date: Date): number {
    const startDateUTC = this.convertToUTC(start_date)
    const endDateUTC = this.convertToUTC(end_date)

    return dayjs(endDateUTC).diff(startDateUTC, 'hours')
  }
}
