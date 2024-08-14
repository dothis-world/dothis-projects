import dayjs from 'dayjs';

export interface DateUtilsResultType {
  date: Date;
  year: string;
  month: string;
  day: string;
}
export class DateUtil {
  /**
   * 현재 날짜 정보를 반환합니다.
   */
  public static currentDate(): DateUtilsResultType {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 한 자리 수일 경우 앞에 '0'을 더함
    const day = date.getDate().toString().padStart(2, '0'); // 한 자리 수일 경우 앞에 '0'을 더함
    return { date, year, month, day };
  }
  /**
   * 현재 날짜에서 지정된 일수만큼 빼서 날짜 정보를 반환합니다.
   * @param days 빼고자 하는 일수
   * @returns 날짜 정보 (yyyy-mm-dd 형식)
   */
  public static getDaysAgo(days: number = 0): string {
    const today = new Date();
    today.setDate(today.getDate() - days);

    const year = today.getFullYear().toString();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  // 날짜를 조정하는 헬퍼 함수
  public static adjustDates(
    to: string,
    from: string,
  ): { adjustedTo: string; adjustedFrom: string } {
    const adjustedTo = dayjs(to).add(1, 'day').format('YYYY-MM-DD');
    const adjustedFrom = dayjs(from).subtract(1, 'day').format('YYYY-MM-DD');
    return { adjustedTo, adjustedFrom };
  }

  /**
   * 주어진 날짜가 일년 이내에 있는지 확인하는 헬퍼 함수
   * @param date
   * @param from
   * @param to
   */
  public static isWithinOneYear(date: string, from: string, to: string) {
    return (
      dayjs(date).isAfter(dayjs(from).subtract(1, 'year')) &&
      dayjs(date).isBefore(dayjs(to).add(1, 'day'))
    );
  }
  /**
   * 주어진 날짜가 기한 이내에 있는지 확인하는 헬퍼 함수
   * @param date
   * @param from
   * @param to
   */
  public static isWithinRange(date: string, from: string, to: string) {
    const dateToCheck = dayjs(date, 'YYYYMMDD').toDate();
    const fromDate = dayjs(from, 'YYYYMMDD').toDate(); // 시작 날짜
    const toDate = dayjs(to, 'YYYYMMDD').toDate();

    return dateToCheck >= fromDate && dateToCheck <= toDate;
  }
}
