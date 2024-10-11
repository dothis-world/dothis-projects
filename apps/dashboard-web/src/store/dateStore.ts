import dayjs from 'dayjs';
import { create } from 'zustand';

interface DateAction {
  setStartDate: (value: string) => void;
  setEndDate: (value: string) => void;
  setStartMonth: (value: string) => void;
  setEndMonth: (value: string) => void;
}

interface DateState {
  startDate: string;
  endDate: string;
  startMonth: string;
  endMonth: string;
  actions: DateAction;
}

/**
 * query hook에서 사용하는 날짜로 보내주는 query를 전역상태로 관리하기위해 생성하였습니다.
 * 추 후 캘린더 형식으로 날짜를 커스텀할 수도 있기때문에 이렇게 setter가 가능한 전역상태로 작성하였습니다
 */
export const dateStore = create<DateState>((set) => ({
  startDate: dayjs('2024-09-08').subtract(7, 'day').format('YYYY-MM-DD'),

  endDate: dayjs('2024-09-08').subtract(1, 'day').format('YYYY-MM-DD'),
  startMonth: dayjs().subtract(12, 'month').format('YYYY-MM'),
  endMonth: dayjs().subtract(1, 'month').format('YYYY-MM'),

  actions: {
    setStartDate: (value: string) => set(() => ({ startDate: value })),
    setEndDate: (value: string) => set(() => ({ endDate: value })),
    setStartMonth: (value: string) => set(() => ({ startMonth: value })),
    setEndMonth: (value: string) => set(() => ({ endMonth: value })),
  },
}));

// State
export const useStartDate = () => dateStore((state) => state.startDate);
export const useEndDate = () => dateStore((state) => state.endDate);
export const useStartMonth = () => dateStore((state) => state.startMonth);
export const useEndMonth = () => dateStore((state) => state.endMonth);

// Actions
export const useDateActions = () => dateStore((state) => state.actions);
