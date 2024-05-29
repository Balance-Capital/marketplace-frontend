import { useRef } from 'react';
import useClickOutSide from '../../../hooks/useClickOutSide';
import CreateAffiliateLink from '../../CreateAffiliateLink';

export default function AffiliateLink({ setModal }) {
  const modalRef = useRef(null);

  useClickOutSide(modalRef, setModal);
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-black bg-opacity-60"></div>

      <div className="flex items-center justify-end fixed inset-0 z-10">
        <div
          className="w-full overflow-auto md:w-[500px] mt-[20vh] md:mt-0 h-[80vh] md:h-screen bg-black rounded-tl-[25px] rounded-tr-[25px] md:rounded-none"
          ref={modalRef}
        >
          <div className="md:hidden flex justify-end p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="53"
              height="53"
              viewBox="0 0 53 53"
              onClick={() => setModal(false)}
            >
              <g
                id="Group_13635"
                data-name="Group 13635"
                transform="translate(-358 -222)"
              >
                <rect
                  id="Rectangle_806"
                  data-name="Rectangle 806"
                  width="53"
                  height="53"
                  rx="26.5"
                  transform="translate(358 222)"
                  fill="#101417"
                />
                <g id="g2246" transform="translate(377.284 241.284)">
                  <path
                    id="path1419"
                    d="M-1479.2-17.007l15.079-15.079"
                    transform="translate(1479.199 32.087)"
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                  <path
                    id="path1421"
                    d="M-1479.2-32.087l15.079,15.079"
                    transform="translate(1479.199 32.087)"
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </g>
              </g>
            </svg>
          </div>
          <div className="px-12 mt-0 md:mt-12">
            <CreateAffiliateLink />
          </div>
        </div>
      </div>
    </div>
  );
}
