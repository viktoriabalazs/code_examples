import moment from 'moment';

export const calcNumberOfWeek = (date) => {
  const tdt = moment(date.valueOf());
  const dayn = (date.day() + 6) % 7;
  tdt.set('date', tdt.date() - dayn + 3);
  const firstThursday = tdt.valueOf();
  tdt.set({'month': 0, 'date': 1});
  if (tdt.day() !== 4) {
    tdt.set({'month': 0, 'date': 1 + ((4 - tdt.day()) + 7) % 7});
  }
  const weekNumber = 1 + Math.ceil((firstThursday - tdt) / 604800000);
  return weekNumber;
}