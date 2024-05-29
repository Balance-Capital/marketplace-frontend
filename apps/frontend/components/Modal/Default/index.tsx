import { useRef } from 'react';
import useClickOutSide from '../../../hooks/useClickOutSide';

export default function Default({ children, setModal }) {
  const modalRef = useRef(null);

  useClickOutSide(modalRef, setModal);
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-black bg-opacity-60 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            ref={modalRef}
            className="relative transform overflow-hidden rounded-[30px] bg-white text-left shadow-xl transition-all sm:my-8 sm:w-[90%] sm:max-w-lg"
          >
            <div className="p-6 flex items-center justify-end">
              <svg
                className="w-[22px] h-[22px]"
                onClick={() => setModal(false)}
                xmlns="http://www.w3.org/2000/svg"
                width="46.673"
                height="46.673"
                viewBox="0 0 46.673 46.673"
              >
                <g
                  id="_9041735_cross_icon"
                  data-name="9041735_cross_icon"
                  transform="translate(2.828 2.828)"
                >
                  <path
                    id="Path_3961"
                    data-name="Path 3961"
                    d="M41.516,41.516.5.5Z"
                    transform="translate(-0.5 -0.5)"
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                    fillRule="evenodd"
                  />
                  <path
                    id="Path_3962"
                    data-name="Path 3962"
                    d="M41.516.5.5,41.516"
                    transform="translate(-0.5 -0.5)"
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                    fillRule="evenodd"
                  />
                </g>
              </svg>
            </div>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
