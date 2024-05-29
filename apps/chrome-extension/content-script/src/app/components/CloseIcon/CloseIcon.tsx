import { Dispatch, SetStateAction } from 'react';

export default function CloseIcon({
  hexColor,
  setToggleRef,
}: {
  hexColor: string;
  setToggleRef: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <svg
      onClick={() => setToggleRef(false)}
      xmlns="http://www.w3.org/2000/svg"
      width="21.656"
      height="21.656"
      viewBox="0 0 21.656 21.656"
    >
      <g id="Group_13774" name="Group 13774" transform="translate(1.414 1.414)">
        <path
          id="Path_3961"
          name="Path 3961"
          d="M19.327,19.327.5.5Z"
          transform="translate(-0.5 -0.5)"
          fill="none"
          stroke={hexColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          fillRule="evenodd"
        />
        <path
          id="Path_3962"
          name="Path 3962"
          d="M19.327.5.5,19.327"
          transform="translate(-0.5 -0.5)"
          fill="none"
          stroke={hexColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          fillRule="evenodd"
        />
      </g>
    </svg>
  );
}
