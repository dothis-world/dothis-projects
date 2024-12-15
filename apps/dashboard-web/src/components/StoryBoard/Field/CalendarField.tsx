'use client';

import clsx from 'clsx';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

import Calendar from '@/components/common/Calendar/Calendar';
import PopperProvider from '@/components/common/Calendar/PopperProvider';
import ToggleProvider from '@/components/common/Calendar/ToggleProvider';

interface CalendarFieldProps {
  inputProps: React.HTMLProps<HTMLInputElement>;
  dateFormat?: string;
  label?: string;
  defaultDate?: Date;
  handleSelectDate?: (dateStr: string) => void;
  validAfterDate?: Date;
}

const CalendarField = ({
  inputProps,
  dateFormat = 'YY.MM.DD',
  label,
  defaultDate = new Date(),
  handleSelectDate,
  validAfterDate,
}: CalendarFieldProps) => {
  const isValidEndDate = (date: Dayjs) => {
    const validAfter = validAfterDate && dayjs(validAfterDate, dateFormat);
    return validAfter ? date.isAfter(validAfter, 'day') : true;
  };

  // useEffect(() => {
  //   console.log(
  //     '~~!!! useEffect - CalendarField',
  //     defaultDate,
  //     dayjs(defaultDate).format(dateFormat),
  //   );
  //   handleSelectDate?.(dayjs(defaultDate).format(dateFormat));
  // }, [defaultDate]);

  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <ToggleProvider>
        <PopperProvider isArrow align="center" side="bottom" arrowColor="red">
          <ToggleProvider.Trigger>
            <input
              {...inputProps}
              className="border-none text-center font-bold focus:outline-none"
            />
          </ToggleProvider.Trigger>

          <ToggleProvider.Portal>
            <ToggleProvider.Content>
              <Calendar
                calendarbaseDate={defaultDate}
                selectedDate={defaultDate}
                setSelectedDate={(date: Date) => {
                  const formattedDate = dayjs(date).format(dateFormat);
                  handleSelectDate?.(formattedDate);
                }}
                isInvalidate={(date: any) => {
                  return !isValidEndDate(date);
                }}
                dateFormat={dateFormat}
              />
            </ToggleProvider.Content>
          </ToggleProvider.Portal>
        </PopperProvider>
      </ToggleProvider>
    </div>
  );
};

export default CalendarField;
