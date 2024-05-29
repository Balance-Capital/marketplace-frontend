import { Dispatch, MutableRefObject, SetStateAction, useEffect } from 'react';

export default function useClickOutSide(
  menuRef: MutableRefObject<HTMLDivElement>,
  setToggleRef: Dispatch<SetStateAction<boolean>>
): void {
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (event: any) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setToggleRef(false);
    }
  };
}
