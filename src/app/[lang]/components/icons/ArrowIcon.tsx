import { SVGProps } from "react";

const ArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 43 32"
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        // fill="#fff"
        d="M.12 11.308 11.863.156l9.687 9.197L31.237.156l11.744 11.152-21.43 20.351L.119 11.309Zm11.744-9.42-9.922 9.42 19.609 18.62 19.607-18.62-9.92-9.42-9.687 9.196-9.687-9.197Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path
          // fill="#fff"
          d="M.12.156H42.98V31.66H.12z"
        />
      </clipPath>
    </defs>
  </svg>
);
export default ArrowIcon;
