import ChromeExtBtn from '../ChromeExtBtn';

interface IProps {
  header: string;
  paragraph: string;
  button: string;
}

function BanerExtChrome(props: IProps) {
  const { header, paragraph, button } = props;
  return (
    <section className="max-w-[1920px] mx-auto my-20">
      <div className="w-[90%] mx-auto bg-gradient-to-b from-[#473FAD] to-[#5E57CB] rounded-[50px] overflow-hidden">
        <div className="h-[579px] md:h-[388px] mx-auto pt-8 lg:pt-0 flex items-start lg:items-center justify-center bg-homeBanner bg-contain bg-bottom md:bg-auto md:bg-right bg-no-repeat">
          <div className="w-[90%] flex flex-col md:items-start items-center justify-start text-center md:text-start">
            <div className="w-[280px] md:w-[418px]">
              <h3 className="font-PPNeueMachina text-[#f3f3f3] text-[40px] lg:text-[41px]">
                {header}
              </h3>
              <p className="font-InterRegular text-[#EDEDEE] text-[15px] lg:text-[22px] mt-6">
                {paragraph}
              </p>
            </div>
            <div className="w-[250px] mt-12">
              <ChromeExtBtn text={button} className="bg-black" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default BanerExtChrome;
