import create from 'zustand';

type GlobalState = {
  now: Date;
};
const useGlobalStore = create<GlobalState>()((set, get) => ({
  now: new Date(),
}));

if (typeof window !== 'undefined') {
  window.setInterval(() => {
    useGlobalStore.setState({ now: new Date() });
  }, 60000);
}

export default useGlobalStore;
