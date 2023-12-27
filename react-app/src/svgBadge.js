import React from "react";

const approxWidth = (str) => {
  let size = 0;
  for (let i = 0; i < str.length; i++) {
    let s = str[i];
    if ("lij|' ".includes(s)) size += 37;
    else if ("![]fI.,:;/\\t".includes(s)) size += 50;
    else if ('`-(){}r"'.includes(s)) size += 60;
    else if ("*^zcsJkvxy".includes(s)) size += 85;
    else if ("aebdhnopqug#$L+<>=?_~FZT0123456789".includes(s)) size += 95;
    else if ("BSPEAKVXY&UwNRCHD".includes(s)) size += 112;
    else if ("QGOMm%W@".includes(s)) size += 135;
    else size += 50;
  }
  return (size * 6) / 1000.0;
};

// Strip the # in the color code if present
const processColor = (color) => {
  if (color[0] === "#") return color.substring(1);
  else return color;
};
const SvgBadge = ({
  label,
  shadowLabelColor,
  shadowCountColor,
  opacity,
  swap,
  labelBGColor,
  countBGColor,
  labelTextColor,
  countTextColor,
  visits,
}) => {
  // Format the given parameter values
  shadowLabelColor = processColor(shadowLabelColor);
  shadowCountColor = processColor(shadowCountColor);
  labelBGColor = processColor(labelBGColor);
  countBGColor = processColor(countBGColor);
  labelTextColor = processColor(labelTextColor);
  countTextColor = processColor(countTextColor);
  swap = typeof swap === "boolean" ? (swap ? "1" : "0") : swap;
  if (typeof opacity === "string") opacity = parseInt(opacity, 10);

  if (swap === "1") [label, visits] = [visits, label];

  let visitsWidth = 10 + approxWidth(label.toString()) * 10;
  let countWidth = 10 + approxWidth(visits.toString()) * 10;

  let shadowTemplate = [
    <text
      key="countText"
      transform={`matrix(1 0 0 1 ${visitsWidth + 4.9 + 0.75} 14)`}
      fill={shadowCountColor === "1" ? `#00000000` : `#${shadowCountColor}`}>
      {visits}
    </text>,
    <text key="labelText" transform="matrix(1 0 0 1 5.75 14)" fill={shadowLabelColor === "1" ? `#00000000` : `#${shadowLabelColor}`}>
      {label}
    </text>,
  ];

  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      height={60}
      viewBox={`0 0 ${visitsWidth + countWidth - 1} 20`}
      xmlSpace="preserve">
      <g id="badge" fontFamily="Arial" fontSize={10}>
        <path fill={`#${labelBGColor}`} d={`M46.11,20H4c-2.21,0-4-1.79-4-4V4c0-2.21,1.79-4,4-4h${visitsWidth - 3.5}V20z`} />
        <path
          fill={`#${countBGColor}`}
          d={`M46.11,20H${visitsWidth + countWidth - 5}c2.21,0,4-1.79,4-4V4c0-2.21-1.79-4-4-4H${visitsWidth + 0.5}V20z`}
        />
        {shadowTemplate}
        <text transform={`matrix(1 0 0 1 ${visitsWidth + 4.9} 13.8)`} fill={`#${countTextColor}`}>
          {visits}
        </text>
        <text transform="matrix(1 0 0 1 5 13.8)" fill={`#${labelTextColor}`}>
          {label}
        </text>
      </g>
    </svg>
  );
};

export default SvgBadge;
