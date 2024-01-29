import { create } from 'zustand';

interface modalState {
  modalOpen: boolean;
  modalContent: React.ReactNode | null;
  actions: modalAction;
}

interface modalAction {
  setModalOpen: (value: boolean) => void;
  setModalContent: (value: React.ReactNode) => void;
  initializeModal: () => void; // 추가: 초기화 함수
}

export const modalStore = create<modalState>((set) => ({
  modalOpen: false,
  modalContent: null,
  actions: {
    setModalOpen: (value: boolean) => set(() => ({ modalOpen: value })),
    setModalContent: (value: React.ReactNode) =>
      set(() => ({ modalContent: value })),
    initializeModal: () =>
      set(() => ({ modalOpen: false, modalContent: null })),
  },
}));

// State
export const useModalOpen = () => modalStore((state) => state.modalOpen);
export const useModalContent = () => modalStore((state) => state.modalContent);

// Actions
export const useModalActions = () => modalStore((state) => state.actions);
