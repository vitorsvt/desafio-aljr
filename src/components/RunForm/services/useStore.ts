import create from 'zustand';
import { RunState } from '../models/RunState';

export const useStore = create<RunState>((set) => ({
    points: 0,
    setPoints: (value) => set(() => ({ points: value }))
}));
