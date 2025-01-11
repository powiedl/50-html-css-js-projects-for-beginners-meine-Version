function genHexString(len) {
  let output = '';
  for (let i = 0; i < len; ++i) {
    output += Math.floor(Math.random() * 16).toString(16);
  }
  return output;
}

function contrastingColor(hex, factorAlpha = false) {
  let [r, g, b, a] = hex
    .replace(
      /^#?(?:(?:(..)(..)(..)(..)?)|(?:(.)(.)(.)(.)?))$/,
      '$1$5$5$2$6$6$3$7$7$4$8$8'
    )
    .match(/(..)/g)
    .map((rgb) => parseInt('0x' + rgb));
  return (~~(r * 299) + ~~(g * 587) + ~~(b * 114)) / 1000 >= 128 ||
    (!!(~(128 / a) + 1) && factorAlpha)
    ? '#000'
    : '#FFF';
}

const max = 30;
const mainEl = document.querySelector('main');
for (let i = 1; i < max; i++) {
  const div = document.createElement('div');
  div.classList.add('box');
  const color = `#${genHexString(6)}`;
  div.innerHTML = color;
  div.style.backgroundColor = color;
  div.style.color = contrastingColor(color);
  mainEl.appendChild(div);
}
