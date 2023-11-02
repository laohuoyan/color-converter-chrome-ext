import React, { useState } from 'react';
import './Popup.css';

// #FFF
const REG_COLOR_HEX_3 = /^#([\d,a-f,A-F]{3})$/;
// #FFFFFF
const REG_COLOR_HEX_6 = /^#([\d,a-f,A-F]{6})$/;
// rgb(255, 255, 255)
const REG_COLOR_RGB = /^rgb\(?(\d{1,3}),(\d{1,3}),(\d{1,3})\)?$/

/** 移除所有空格 */
function removeAllWhitespace(str) {
  return str.replace(/\s+/g, '');
}

function isHex3Color(str) {
  return REG_COLOR_HEX_3.test(str)
}

function isHex6Color(str) {
  return REG_COLOR_HEX_6.test(str)
}

function isHexColor(source) {
  return isHex3Color(source) || isHex6Color(source);
}

function isRGBColor(source) {
  return REG_COLOR_RGB.test(source);
}

function isValidColor(source) {
  return isHexColor(source) || isRGBColor(source);
}

function numToHex(num) {
  return Number(num).toString(16);
}

function hex3Tohex6(str) {
  return `#${str[1]}${str[1]}${str[2]}${str[2]}${str[3]}${str[3]}`;
}

/** 色值转换成 16 进制 */
function colorToHEX(str) {
  console.assert(isValidColor(str), 'invalid color');

  str = removeAllWhitespace(str);
  if (isHex6Color(str)) {
    return str;
  }
  if (isHex3Color(str)) {
    return hex3Tohex6(str);
  }
  if (isRGBColor(str)) {
    const matches = str.match(REG_COLOR_RGB);
    const [_, r, g, b] = matches;
    return `#${numToHex(r)}${numToHex(g)}${numToHex(b)}`;
  }
}

/** 色值转换成 RGB */
function colorToRGB(str) {
  console.assert(isValidColor(str), 'invalid color');

  if (isRGBColor(str)) {
    return str;
  }
  let hexStr = str;
  if (isHex3Color(str)) {
    hexStr = hex3Tohex6(str);
  }
  const r = parseInt(hexStr.substr(1, 2), 16);
  const g = parseInt(hexStr.substr(3, 2), 16);
  const b = parseInt(hexStr.substr(5, 2), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

const Popup = () => {
  const [source, setSource] = useState('');
  const [target, setTarget] = useState('');

  const handleChange = (str) => {
    setSource(str);

    if (isValidColor(str)) {
      const noSpaceStr = removeAllWhitespace(str);
      if (isHexColor(noSpaceStr)) {
        setTarget(colorToRGB(noSpaceStr));
      } else {
        setTarget(colorToHEX(noSpaceStr));
      }
    } else {
      setTarget('');
    }
  }

  return (
    <div className="App">
      <input value={source} onChange={e => handleChange(e.target.value)} />
      {target}
    </div>
  );
};

export default Popup;
