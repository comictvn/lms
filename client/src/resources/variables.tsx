// ##############################
// // // Function that converts from hex color to rgb color
// // // Example: input = #9c27b0 => output = 156, 39, 176
// // // Example: input = 9c27b0 => output = 156, 39, 176
// // // Example: input = #999 => output = 153, 153, 153
// // // Example: input = 999 => output = 153, 153, 153
// #############################
const hexToRgb = (input: string) => {
  input = input + "";
  input = input.replace("#", "");
  let hexRegex = /[0-9A-Fa-f]/g;
  if (!hexRegex.test(input) || (input.length !== 3 && input.length !== 6)) {
    throw new Error("input is not a valid hex color.");
  }
  if (input.length === 3) {
    let first = input[0];
    let second = input[1];
    let last = input[2];
    input = first + first + second + second + last + last;
  }
  input = input.toUpperCase();
  let first = input[0] + input[1];
  let second = input[2] + input[3];
  let last = input[4] + input[5];
  return (
    parseInt(first, 16) +
    ", " +
    parseInt(second, 16) +
    ", " +
    parseInt(last, 16)
  );
};

const transition = {
  transition: "all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
};

const primaryColor = "#005aa6";
const warningColor = "#9c27b0";
const dangerColor = "#9c27b0";
const successColor = "#9c27b0";
const infoColor = "#9c27b0";
const roseColor = "#9c27b0";
const blackColor = "#000";
const whiteColor = "#FFF";
const grayColor = '#d2d9e5';
const grayLightenColor = '#eef0f4';
const grayLightenMoreColor = '#f2f4f8';
const grayLightenMoreMoreColor = '#f9fafc';

const boxShadow = {
  boxShadow:
    "0 10px 30px -12px rgba(" +
    hexToRgb(blackColor) +
    ", 0.42), 0 4px 25px 0px rgba(" +
    hexToRgb(blackColor) +
    ", 0.12), 0 8px 10px -5px rgba(" +
    hexToRgb(blackColor) +
    ", 0.2)"
};

const primaryBoxShadow = {
  boxShadow:
    "0 4px 20px 0 rgba(" +
    hexToRgb(blackColor) +
    ",.14), 0 7px 10px -5px rgba(" +
    hexToRgb(primaryColor) +
    ",.4)"
};

const menuBg = '#222d32';

const baseFontSize = 13;

const pxToRem = (px: number, base: number = baseFontSize) => {
  return (
    `${Math.floor((px/base) * 100) / 100}rem`
  );
};


export {
  hexToRgb,
  pxToRem,
  transition,
  primaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  blackColor,
  whiteColor,
  grayLightenColor,
  grayLightenMoreColor,
  grayLightenMoreMoreColor,
  boxShadow,
  primaryBoxShadow,
  menuBg,
};
