import { createContext } from 'react';

import { Theme } from '../../const/theme';

export type ThemeContextProps = {
	theme?: Theme;
	setTheme?: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextProps>({});
