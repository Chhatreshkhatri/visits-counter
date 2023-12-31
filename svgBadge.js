// Get an approximate width of the given string
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

// Generate and return the SVG code for the badge
function svgBadge(label, shadowLabel, shadowCount, opacity, swap, labelBGColor, countBGColor, labelTextColor, countTextColor, visits) {
  // Format the given parameter values
  shadowLabel = processColor(shadowLabel);
  shadowCount = processColor(shadowCount);
  labelBGColor = processColor(labelBGColor);
  countBGColor = processColor(countBGColor);
  labelTextColor = processColor(labelTextColor);
  countTextColor = processColor(countTextColor);
  swap = typeof swap === "boolean" ? (swap ? "1" : "0") : swap;
  if (typeof opacity === "string") opacity = parseInt(opacity, 10);

  // Swap label and visits text if swap parameter is true
  if (swap === "1") [label, visits] = [visits, label];

  // Calculate the text widths
  let visitsWidth = 10 + approxWidth(label.toString()) * 10;
  let countWidth = 10 + approxWidth(visits.toString()) * 10;

  // Text shadow template
  let shadowTemplate = `
      <text transform="matrix(1 0 0 1 ${visitsWidth + 4.9 + 0.5} 14)" fill="${shadowCount === "1" ? `#000` : `#${shadowCount}`}" >${visits}</text>
      <text transform="matrix(1 0 0 1 5.5 14)" fill="${shadowLabel === "1" ? `#000` : `#${shadowLabel}`}" >${label}</text>
    `;

  // Main SVG template
  let svg = `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 ${
      visitsWidth + countWidth - 1
    } 20" xml:space="preserve">
    <defs>
    </defs>
    <g id="badge" font-family="Arial" font-size="10px">
        <path fill="#${labelBGColor}" d="M46.11,20H4c-2.21,0-4-1.79-4-4V4c0-2.21,1.79-4,4-4h${visitsWidth - 3.5}V20z"/>
        <path fill="#${countBGColor}" d="M46.11,20H${visitsWidth + countWidth - 5}c2.21,0,4-1.79,4-4V4c0-2.21-1.79-4-4-4H${visitsWidth + 0.5}V20z"/>
        ${shadowTemplate}
        <text transform="matrix(1 0 0 1 ${visitsWidth + 4.9} 13.8)" fill="#${countTextColor}" >${visits}</text>
        <text transform="matrix(1 0 0 1 5 13.8)" fill="#${labelTextColor}">${label}</text>
    </g>
    </svg>
    `;

  // Return the SVG template
  return svg;
}

module.exports = svgBadge;
