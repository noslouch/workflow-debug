/**
 * Function that takes a targeted pixel value for font size and returns calculated rem value based off different factors
 * @param {number} value - Number that represents targeted pixel value
 * @returns string - CSS property value with targeted rem value based off base font size and current text size scale
 */
const articleFontSize = (value) =>
  `calc((${value} / var(--article-base-font-size)) * var(--article-text-size-scale) * 1rem)`;

export default articleFontSize;
