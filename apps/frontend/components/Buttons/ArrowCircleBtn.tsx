interface IProps {
  handleClick: () => void;
  direction: 'left' | 'right';
}

export function ArrowCircleBtn(props: IProps) {
  return (
    <button
      onClick={props.handleClick}
      className="bg-[#fafafa] w-12 h-12 rounded-full"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19.375"
        height="20.492"
        viewBox="0 0 19.375 20.492"
        className="mx-auto"
      >
        {props.direction === 'left' ? (
          <g
            id="_8666600_arrow_left_icon"
            data-name="8666600_arrow_left_icon"
            transform="translate(1 1.414)"
          >
            <line
              id="Line_355"
              data-name="Line 355"
              x1="17.375"
              transform="translate(0 9.1)"
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              id="Path_3716"
              data-name="Path 3716"
              d="M13.832,22.664,5,13.832,13.832,5"
              transform="translate(-5 -5)"
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </g>
        ) : (
          <g
            id="_8666600_arrow_left_icon"
            name="8666600_arrow_left_icon"
            transform="translate(1 1.414)"
          >
            <line
              id="Line_355"
              name="Line 355"
              x2="17.375"
              transform="translate(0 9.1)"
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              id="Path_3716"
              data-name="Path 3716"
              d="M5,22.664l8.832-8.832L5,5"
              transform="translate(3.543 -5)"
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </g>
        )}
      </svg>
    </button>
  );
}
