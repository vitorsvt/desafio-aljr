import create from 'zustand';
import { SwimState } from '../models/SwimState';

export const useStore = create<SwimState>((set) => ({
    points: 0,
    setPoints: (value) => set(() => ({ points: value }))
}));
