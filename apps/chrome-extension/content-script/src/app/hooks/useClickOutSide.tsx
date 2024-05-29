import { Dispatch, RefObject, SetStateAction, useEffect } from 'react';

export default function useClickOutSide(
  menuRef: RefObject<HTMLElement>,
  setToggleRef: Dispatch<SetStateAction<boolean>>
): void {
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (event: any) => {
    if (
      menuRef?.current &&
      !menuRef?.current.contains(event.composedPath()[0])
    ) {
      setToggleRef(false);
    }
  };
}
