import { useDispatch } from 'react-redux';

import { AppDispatch } from '@/app/providers/StoreProvider';

export const useAppDispacth = () => useDispatch<AppDispatch>();
