import { useNavigate } from 'react-router-dom';

export default function BackIcon({ hexColor }: { hexColor: string }) {
  const navigate = useNavigate();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26.624"
      height="24.538"
      viewBox="0 0 26.624 24.538"
      onClick={() => navigate(-1)}
    >
      <g id="Group_13792" name="Group 13792" transform="translate(1 1.414)">
        <line
          id="Line_1"
          name="Line 1"
          x1="24.624"
          transform="translate(0 10.687)"
          fill="none"
          stroke={hexColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          id="Path_2922"
          name="Path 2922"
          d="M15.855,26.71,5,15.855,15.855,5"
          transform="translate(-4.972 -5)"
          fill="none"
          stroke={hexColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}
