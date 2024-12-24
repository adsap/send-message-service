import moment from 'moment-timezone';

export class DateHelper {
  static isCurrentTimeMatching(
    localTime: string,
    currentTime: string,
  ): boolean {
    return moment(localTime).isSame(moment(currentTime), 'minute');
  }
}
