import create from 'zustand';
import { BurpeeState } from '../models/BurpeeState';

export const useStore = create<BurpeeState>((set) => ({
    points: 0,
    setPoints: (value) => set(() => ({ points: value }))
}));
