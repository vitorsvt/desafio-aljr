import create from 'zustand';
import { BikeState } from '../models/BikeState';

export const useStore = create<BikeState>((set) => ({
    points: 0,
    setPoints: (value) => set(() => ({ points: value }))
}));
