import { useRouter } from 'next/router';
import getLanguage from '../../utils/getLanguage';
import language from './locale/index.json';
export interface IPagination {
  page: number;
  limit: number;
  pages: number;
  total: number;
  next: number;
  prev: number;
}
interface IProps {
  pagination: IPagination;
  clickPage: any;
  clickNextPage: any;
  clickBackPage: any;
}

export default function PaginationBar(props: IProps) {
  const router = useRouter();
  const { page, pages, next, prev } = props.pagination;
  const { clickPage, clickNextPage, clickBackPage } = props;
  const content = getLanguage(language, router.locale);
  const Pages = [];
  for(let z=1; z <= pages; z++ ) Pages.push(z);

  return (
    <div className="w-fit flex flex-wrap items-center gap-4 m-4 mx-auto font-InterRegular text-base text-[#74849D] [&>*]:cursor-pointer">
      {prev
        ? (
          <span onClick={()=>clickBackPage()} className="hover:text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26.888"
              height="26.888"
              viewBox="0 0 26.888 26.888"
              className="stroke-[#74849d] hover:stroke-primary inline"
            >
              <g
                id="_9041645_arrow_top_right_icon_1_"
                data-name="9041645_arrow_top_right_icon (1)"
                transform="translate(13.444 26.095) rotate(-135)"
              >
                <path
                  id="Path_3974"
                  data-name="Path 3974"
                  d="M16.28,15.28V.5H1.5"
                  transform="translate(1.111)"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  fillRule="evenodd"
                />
                <path
                  id="Path_3975"
                  data-name="Path 3975"
                  d="M17.391.5.5,17.391"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  fillRule="evenodd"
                />
              </g>
            </svg>
            <span> {content.previous}</span>
          </span>
        ) : ''}
      {Pages.map((item, index) => (
        <div key={index} onClick={()=>clickPage(item)} className={`w-8 h-8 rounded-full bg-primary ${page === item ? 'text-white' : 'bg-[rgba(185,184,189,0.1)] text-[#74849D] hover:bg-primary hover:text-white'} flex items-center justify-center`}>
          {item}
        </div>
      ))}
      {next
        ? (
          <span onClick={()=>clickNextPage()} className="hover:text-primary">
          <span>{content.next} </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26.888"
            height="26.888"
            viewBox="0 0 26.888 26.888"
            className="stroke-[#74849d] hover:stroke-primary inline"
          >
            <g
              id="_9041645_arrow_top_right_icon_1_"
              data-name="9041645_arrow_top_right_icon (1)"
              transform="translate(1.5 13.444) rotate(-45)"
            >
              <path
                id="Path_3974"
                data-name="Path 3974"
                d="M14.78,0V14.78H0"
                transform="translate(2.111 2.111)"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                fillRule="evenodd"
              />
              <path
                id="Path_3975"
                data-name="Path 3975"
                d="M16.891,16.891,0,0"
                transform="translate(0 0)"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                fillRule="evenodd"
              />
            </g>
          </svg>
        </span>
      ) : ''}
    </div>
  );
}
