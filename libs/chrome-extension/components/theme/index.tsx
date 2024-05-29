import { useState, createContext, ReactNode, ReactElement } from 'react';

interface IProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: IProps): ReactElement {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = (): void => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <div className={isDarkMode ? 'dark' : ''}>{children}</div>
    </ThemeContext.Provider>
  );
}

export const ThemeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: (): void => undefined,
});
