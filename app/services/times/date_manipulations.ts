import { differenceInDays, differenceInMinutes } from 'date-fns'
export const getPeriodOfTime = (started_date: string, ended_date: string) => {
  return differenceInDays(ended_date, started_date)
}

export const getMinuteFromDate = (started_date: string, ended_date: string) => {
  return differenceInMinutes(ended_date, started_date)
}
