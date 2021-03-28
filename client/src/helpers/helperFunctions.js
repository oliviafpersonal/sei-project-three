export const convertTimestamp = (timestamp) => {
  const date = Date.parse(timestamp)
  console.log('🚀 ~ file: Profile.js ~ line 36 ~ convertTimestamp ~ date', date)
  const newDate = new Date(date)
  console.log('🚀 ~ file: Profile.js ~ line 38 ~ convertTimestamp ~ newDate', newDate)
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
  ]

  return (months[newDate.getMonth()] + ' ' + newDate.getFullYear())
}