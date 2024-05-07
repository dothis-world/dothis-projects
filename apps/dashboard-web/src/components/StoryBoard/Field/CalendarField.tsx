'use client';

import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import type { InputHTMLAttributes } from 'react';
import React, { forwardRef, useEffect, useState } from 'react';

import Calendar from '@/components/common/Calendar/Calendar';
import PopperProvider from '@/components/common/Calendar/PopperProvider';
import ToggleProvider from '@/components/common/Calendar/ToggleProvider';

dayjs.extend(isSameOrAfter);

interface CalendarFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  dateFormat?: string;
  label?: string;
  handleSelectDate?: (dateStr: string) => void;
  validAfterDate?: string;
}

/**
 * 기존 inputProps의 value, defaultValue의 타입을 Date 나 dayjs 타입으로 제어하려고 시도했습니다.
 
 * InputHTMLAttributes -> value의 타입에서 해당 Date Object 형식의 구조로 적용할 수가 없어서 string으로 대체하였습니다.
 */
const CalendarField = forwardRef<HTMLInputElement, CalendarFieldProps>(
  (
    {
      dateFormat = 'YYYY-MM-DD',
      label,
      handleSelectDate,
      validAfterDate,
      ...props
    },
    ref,
  ) => {
    const date = dayjs(props.value as string);

    const isValidEndDate = (date: Dayjs) => {
      const validAfter = validAfterDate && dayjs(validAfterDate, dateFormat);
      return validAfter ? date.isSameOrAfter(validAfter, 'day') : true;
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
                value={dayjs(props.value as string).format('YY.MM.DD')}
                className="border-none text-center font-bold focus:outline-none"
              />
            </ToggleProvider.Trigger>

            <ToggleProvider.Portal>
              <ToggleProvider.Content>
                <Calendar
                  calendarbaseDate={props.value as string}
                  selectedDate={props.value as string}
                  setSelectedDate={(date: string) => {
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
