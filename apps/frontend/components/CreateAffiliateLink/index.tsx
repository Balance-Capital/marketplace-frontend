import SelectStoreDropDown from '../SelectStoreDropDown';

export default function CreateAffiliateLink() {
  return (
    <>
      <div className="flex flex-col gap-8 items-start lg:items-center">
        <h3 className="text-white font-PPNeueMachina text-xl lg:text-2xl">
          Create an affiliate link
        </h3>
        <div className="flex items-center justify-start lg:justify-center flex-wrap gap-6">
          <div>
            <h4 className="text-white font-InterRegular text-sm mb-3">
              1. Select the store
            </h4>
            <SelectStoreDropDown />
          </div>
          <div>
            <h4 className="text-white font-InterRegular text-sm mb-3">
              2. Paste the page link
            </h4>
            <div className="max-w-[570px] bg-[#101417] flex items-center justify-between rounded-[20px]">
              <input
                type="text"
                name="link"
                className="w-full mx-3 bg-transparent focus:outline-none text-secondary placeholder-secondary"
                placeholder="Paste the page link here"
              />
              <button className="bg-primary text-white font-InterRegular text-lg rounded-[20px] w-44 py-4">
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
