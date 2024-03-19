'use client';

import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { Dispatch, FC, SetStateAction } from 'react';
import { useEffect, useState } from 'react';

import createCalendar from '@/utils/createCalendar';

import SvgComp from '../SvgComp';
import * as Style from './styles';

interface Props {
  calendarbaseDate: string;
  selectedDate: string | null;

  setSelectedDate: (value: string) => void;
  setOpenDrop: Dispatch<SetStateAction<boolean>>;
  trigger?: JSX.Element;
  isInvalidate?: (date: Dayjs) => boolean;
  test: Dayjs;
}

const CalendarTest = ({
  calendarbaseDate,
  selectedDate,
  setSelectedDate,
  setOpenDrop,
  trigger,
  isInvalidate,
  test,
}: Props) => {
  console.log(calendarbaseDate, 'calendarbaseDate');
  const [baseDate, setBaseDate] = useState(dayjs(calendarbaseDate));

  useEffect(() => {
    setBaseDate(dayjs(calendarbaseDate));
  }, [calendarbaseDate]);
  console.log(baseDate.format('YYYY-MM-DD'), 'based');
  const [tempDate, setTempDate] = useState(
    dayjs(selectedDate).format('YYYY-MM-DD'),
  );
  const calendarArray = createCalendar(baseDate);

  //   console.log(calendarArray);

  const DAY_LIST = ['일', '월', '화', '수', '목', '금', '토'];

  const handleDate = (date: Dayjs) => {
    setSelectedDate(date.format('YYYY-MM-DD'));
    // if (!trigger) {
    //   setSelectedDate(date.format('YYYY-MM-DD'));
    //   setOpenDrop(false);
    //   return;
    // }
    // setTempDate(date.format('YYYY-MM-DD'));
  };

  const handleSubmit = () => {
    setSelectedDate(tempDate);
    setOpenDrop(false);
  };

  const decreaseMonth = () => {
    setBaseDate((prev) => prev.subtract(1, 'month'));
  };

  const increaseMonth = () => {
    setBaseDate((prev) => prev.add(1, 'month'));
  };

  return (
    <Style.Calendar>
      <Style.DateTitle>
        <Style.ArrowIcon onClick={decreaseMonth}>
          <SvgComp icon="KeywordLeftArrow" size={18} />
        </Style.ArrowIcon>
        <Style.Date>
          {`${baseDate.year()}년 ${baseDate.month() + 1}월`}{' '}
        </Style.Date>

        <Style.ArrowIcon onClick={increaseMonth}>
          <SvgComp icon="KeywordRightArrow" size={18} />
        </Style.ArrowIcon>

        {/* <Style.ArrowBlock>
        </Style.ArrowBlock> */}
      </Style.DateTitle>
      <Style.DayTitle>
        {DAY_LIST.map((day, i) => (
          <Style.DayType isSunday={i === 0} key={i}>
            {day}
          </Style.DayType>
        ))}
      </Style.DayTitle>
      {calendarArray.map((week) => {
        return (
          <Style.Week key={week[0].format('YYYY-MM-DD')}>
            {week.map((date, i) => {
              const isInvalid = isInvalidate && isInvalidate(date);

              return (
                <Style.Day
                  isOtherMonth={date.month() !== baseDate.month()}
                  // isToday={date.isSame(dayjs(),'day')}
                  isSelected={tempDate === date.format('YYYY-MM-DD')}
                  isSunday={i === 0}
                  isInvalid={isInvalid}
                  onClick={() => {
                    if (isInvalid) return;
                    handleDate(date);
                  }}
                  key={date.format('YYYY-MM-DD')}
                >
                  {date.date()}
                </Style.Day>
              );
            })}
          </Style.Week>
        );
      })}
      {trigger && (
        <Style.Trigger>
          <span onClick={handleSubmit}>{trigger}</span>
        </Style.Trigger>
      )}
    </Style.Calendar>
  );
};

export default CalendarTest;
