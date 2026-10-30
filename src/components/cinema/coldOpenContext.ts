import { createContext, useContext } from 'react';

/** `opened` is false while a slate covers the page, so scenes can stage in after it lifts. */
export const ColdOpenContext = createContext({ opened: true });

export const useColdOpen = () => useContext(ColdOpenContext);
