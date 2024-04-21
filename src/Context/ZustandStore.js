import { create } from "zustand";

const useZustandStore = create((set) => ({
  user: localStorage.getItem("userId"),
  setUser: (val) => set((state) => ({ user: val })),
  email: "",
  setEmail: (val) => set((state) => ({ email: val })),
  signedIn: false,
  setSignedIn: (val) => set((state) => ({ signedIn: val })),
  searchInput: "",
  setSearchInput: (val) => set((state) => ({ searchInput: val })),
}));

export default useZustandStore;
