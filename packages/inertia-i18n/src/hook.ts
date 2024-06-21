import { useContext } from 'react';

import { Context } from './context';

import ContextInterface from './interfaces/context';

export default function useTranslation<T extends string = string>() {
  return useContext<ContextInterface<T>>(Context);
}
