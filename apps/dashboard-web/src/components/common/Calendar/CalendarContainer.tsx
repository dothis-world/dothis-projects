'use client';

import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useState } from 'react';

import Calendar from './Calendar';
import PopperProvider from './PopperProvider';
import ToggleProvider from './ToggleProvider';

const CalendarContainer = () => {
  const [selectedUploadDate, setSelectedUploadDate] = useState(dayjs());

  const [selectedExpectedDate, setSelectedExpectedDate] =
    useState<Dayjs | null>(null);

  const handleSetSelectedUploadDate = (date: string) => {
    setSelectedUploadDate(dayjs(date));
  };

  const handleSetSelectedExpectedDate = (date: string) => {
    setSelectedExpectedDate(dayjs(date));
  };

  const isInvalidStartDate = (date: Dayjs) =>
    date.isAfter(selectedExpectedDate, 'day');

  const isInvalidEndDate = (date: Dayjs) =>
    date.isBefore(selectedUploadDate, 'day');

  return (
    <div className="flex flex-col">
      <ToggleProvider>
        <PopperProvider isArrow align="center" side="bottom" arrowColor="red">
          <ToggleProvider.Trigger>
            <button>여기 클릭해주세요</button>
          </ToggleProvider.Trigger>

          <ToggleProvider.Portal>
            <ToggleProvider.Content>
              <Calendar
                calendarbaseDate={dayjs().format('YYYY-MM-DD')}
                selectedDate={selectedUploadDate.format('YYYY-MM-DD')}
                setSelectedDate={handleSetSelectedUploadDate}
                isInvalidate={isInvalidStartDate}
              />
            </ToggleProvider.Content>
          </ToggleProvider.Portal>
        </PopperProvider>
      </ToggleProvider>

      <ToggleProvider>
        <PopperProvider isArrow align="center" side="bottom" arrowColor="blue">
          <ToggleProvider.Trigger>
            <button>여기 클릭해주세요</button>
          </ToggleProvider.Trigger>
          <ToggleProvider.Portal>
            <ToggleProvider.Content>
              <Calendar
                calendarbaseDate={selectedUploadDate.format('YYYY-MM-DD')}
                selectedDate={
                  selectedExpectedDate
                    ? selectedExpectedDate.format('YYYY-MM-DD')
                    : ''
                }
                setSelectedDate={handleSetSelectedExpectedDate}
                isInvalidate={isInvalidEndDate}
              />
            </ToggleProvider.Content>
          </ToggleProvider.Portal>
        </PopperProvider>
      </ToggleProvider>
    </div>
  );
};

export default CalendarContainer;
