import { MutableRefObject, ReactNode, useRef, useState } from 'react';
import useClickOutSide from '../../hooks/useClickOutSide';

interface IProps {
  children: ReactNode;
  tooltip: string;
  width: number;
  isHover?: boolean;
}

export function Tooltip(props: IProps) {
  const [isActive, setIsActive] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  useClickOutSide(container as MutableRefObject<HTMLDivElement>, setIsActive);

  return (
    <div
      ref={container}
      className="relative inline-block"
      onClick={() => {
        if (props.isHover === undefined) setIsActive(true);
      }}
      onMouseEnter={() => {
        if (props.isHover) setIsActive(true);
      }}
      onMouseLeave={() => {
        if (props.isHover) setIsActive(false);
      }}
    >
      {props.children}
      {isActive ? (
        <span
          className={`w-[${props.width}px] bg-[#101714] z-10 px-6 py-3 font-InterRegular text-xs text-white-0 rounded-[12px] absolute mt-2`}
        >
          {props.tooltip}
        </span>
      ) : null}
    </div>
  );
}
