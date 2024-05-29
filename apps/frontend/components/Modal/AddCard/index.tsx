import useClickOutSide from '../../../hooks/useClickOutSide';
import { Dispatch, SetStateAction, useRef } from 'react';

interface IProps {
  setModal: Dispatch<SetStateAction<boolean>>;
}

export default function AddCard({ setModal }: IProps) {
  const modalRef = useRef(null);

  useClickOutSide(modalRef, setModal);
  return (
    <>
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
              <div className="p-6 flex items-center">
                <h2 className="flex-grow text-xl lg:text-2xl text-center">
                  Add card
                </h2>
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
              <hr />
              <div className="h-[400px] overflow-scroll scrollbar-hide font-InterRegular w-[80%] mx-auto py-10">
                <div className="flex flex-col items-start justify-center gap-4">
                  <h3>1. ENTER CARD INFO</h3>
                  <div className="w-full flex flex-col gap-2">
                    <label
                      className="text-secondary text-sm"
                      htmlFor="cardName"
                    >
                      Name on card
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      placeholder="*Name on card"
                      className="h-[59px] px-3 border-solid border-2 border-[rgba(112,112,112,0.1)] rounded-xl bg-transparent focus:outline-none text-black placeholder-black"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label
                      className="text-secondary text-sm"
                      htmlFor="cardNumber"
                    >
                      Card number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      placeholder="*Card number"
                      className="h-[59px] px-3 border-solid border-2 border-[rgba(112,112,112,0.1)] rounded-xl bg-transparent focus:outline-none text-black placeholder-black"
                    />
                  </div>
                  <div className="w-full flex items-center gap-[4%]">
                    <div className="w-[48%] flex flex-col gap-2">
                      <label
                        className="text-secondary text-sm"
                        htmlFor="expirationDate"
                      >
                        Expiration date
                      </label>
                      <input
                        type="month"
                        id="expirationDate"
                        placeholder="*Expiration date"
                        className="h-[59px] px-3 border-solid border-2 border-[rgba(112,112,112,0.1)] rounded-xl bg-transparent focus:outline-none text-black placeholder-black"
                      />
                    </div>
                    <div className="w-[48%] flex flex-col gap-2">
                      <label className="text-secondary text-sm" htmlFor="cvv">
                        CVV
                      </label>
                      <input
                        type="text"
                        maxLength={3}
                        id="cvv"
                        placeholder="*CVV"
                        className="h-[59px] px-3 border-solid border-2 border-[rgba(112,112,112,0.1)] rounded-xl bg-transparent focus:outline-none text-black placeholder-black"
                      />
                    </div>
                  </div>
                  <h3>2. ENTER BILLING ADDRESS</h3>
                  <div className="w-full flex flex-col gap-2">
                    <label
                      className="text-secondary text-sm"
                      htmlFor="firstName"
                    >
                      First name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      placeholder="*First name"
                      className="h-[59px] px-3 border-solid border-2 border-[rgba(112,112,112,0.1)] rounded-xl bg-transparent focus:outline-none text-black placeholder-black"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label
                      className="text-secondary text-sm"
                      htmlFor="lastName"
                    >
                      Last name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      placeholder="*Last name"
                      className="h-[59px] px-3 border-solid border-2 border-[rgba(112,112,112,0.1)] rounded-xl bg-transparent focus:outline-none text-black placeholder-black"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label
                      className="text-secondary text-sm"
                      htmlFor="streetAddress"
                    >
                      Street address
                    </label>
                    <input
                      type="text"
                      id="streetAddress"
                      placeholder="Street address"
                      className="h-[59px] px-3 border-solid border-2 border-[rgba(112,112,112,0.1)] rounded-xl bg-transparent focus:outline-none text-black placeholder-black"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label className="text-secondary text-sm" htmlFor="city">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      placeholder="*City"
                      className="h-[59px] px-3 border-solid border-2 border-[rgba(112,112,112,0.1)] rounded-xl bg-transparent focus:outline-none text-black placeholder-black"
                    />
                  </div>
                  <div className="w-full flex items-center gap-[4%]">
                    <div className="w-[48%] flex flex-col gap-2">
                      <label className="text-secondary text-sm" htmlFor="state">
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        placeholder="*State"
                        className="h-[59px] px-3 border-solid border-2 border-[rgba(112,112,112,0.1)] rounded-xl bg-transparent focus:outline-none text-black placeholder-black"
                      />
                    </div>
                    <div className="w-[48%] flex flex-col gap-2">
                      <label className="text-secondary text-sm" htmlFor="ZIP">
                        ZIP
                      </label>
                      <input
                        type="text"
                        id="ZIP"
                        placeholder="*ZIP"
                        className="h-[59px] px-3 border-solid border-2 border-[rgba(112,112,112,0.1)] rounded-xl bg-transparent focus:outline-none text-black placeholder-black"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="font-InterRegular w-[80%] mx-auto py-10 flex flex-col items-center justify-center gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16.42"
                  height="21.239"
                  viewBox="0 0 16.42 21.239"
                >
                  <path
                    id="Path_4052"
                    data-name="Path 4052"
                    d="M21.493,8.746h-.964V6.819a4.819,4.819,0,1,0-9.638,0V8.746H9.928A1.927,1.927,0,0,0,8,10.674v9.638a1.927,1.927,0,0,0,1.928,1.928H21.493a1.927,1.927,0,0,0,1.928-1.928V10.674A1.927,1.927,0,0,0,21.493,8.746ZM15.71,17.42a1.928,1.928,0,1,1,1.928-1.928A1.927,1.927,0,0,1,15.71,17.42ZM18.7,8.746H12.722V6.819a2.988,2.988,0,1,1,5.975,0Z"
                    transform="translate(-7.5 -1.5)"
                    fill="#b1c1c9"
                    stroke="rgba(0,0,0,0)"
                    strokeMiterlimit="10"
                    strokeWidth="1"
                  />
                </svg>
                <p className="text-secondary text-sm text-center">
                  We does not store and cannot see your payment
                  information. Terms, Privacy Policy.
                </p>
                <button className="hover:bg-primary rounded-xl w-full h-[59px] bg-black text-white text-lg">
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
