import Link from 'next/link';
interface IProps {
  heading: string;
  paragraph: string;
}
export function Error(props: IProps) {
  return (
    <section className="w-full h-[863px] bg-headerMobile md:bg-headerDesktop bg-center bg-no-repeat bg-cover flex flex-col items-center justify-center gap-4">
      <h1 className="h-[100px] xl:h-[200px] font-PPNeueMachina text-[100px] xl:text-[200px] text-white">
        {props.heading}
      </h1>
      <p className="font-InterRegular text-[20ppx] xl:text-[32px] text-[#CECEF0]">
        {props.paragraph}
      </p>
      <Link href="/" legacyBehavior>
        <a className="bg-black font-InterRegular text-[12px] xl:text-[16px] text-white p-3 xl:p-6 rounded-full">
          Return to Home
        </a>
      </Link>
    </section>
  );
}
export default Error;
