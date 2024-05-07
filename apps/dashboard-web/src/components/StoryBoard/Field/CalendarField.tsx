'use client';

import clsx from 'clsx';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { InputHTMLAttributes } from 'react';
import React, { forwardRef, useEffect, useState } from 'react';

import Calendar from '@/components/common/Calendar/Calendar';
import PopperProvider from '@/components/common/Calendar/PopperProvider';
import ToggleProvider from '@/components/common/Calendar/ToggleProvider';

interface CalendarFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  inputProps: React.HTMLProps<HTMLInputElement>;
  dateFormat?: string;
  label?: string;
  defaultDate?: Date;
  handleSelectDate?: (dateStr: string) => void;
  validAfterDate?: Date;
}

const CalendarField = forwardRef<HTMLInputElement, CalendarFieldProps>(
  (
    {
      inputProps,
      dateFormat = 'YY.MM.DD',
      label,
      defaultDate = new Date(),
      handleSelectDate,
      validAfterDate,
      ...props
    },
    ref,
  ) => {
    const isValidEndDate = (date: Dayjs) => {
      const validAfter = validAfterDate && dayjs(validAfterDate, dateFormat);
      return validAfter ? date.isAfter(validAfter, 'day') : true;
    };

    return (
      <div className="flex flex-col">
        <label>{label}</label>
        <ToggleProvider>
          <PopperProvider isArrow align="center" side="bottom" arrowColor="red">
            <ToggleProvider.Trigger>
              <input
                ref={ref}
                {...props}
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
  },
);

export default CalendarField;
