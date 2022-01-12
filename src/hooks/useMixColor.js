export default function useMixColor() {
  return function mixColor(color1, color2) {
    color1 = color1.substring(1);
    color2 = color2.substring(1);
    color1 = [
      parseInt(color1[0] + color1[1], 16),
      parseInt(color1[2] + color1[3], 16),
      parseInt(color1[4] + color1[5], 16),
    ];
    color2 = [
      parseInt(color2[0] + color2[1], 16),
      parseInt(color2[2] + color2[3], 16),
      parseInt(color2[4] + color2[5], 16),
    ];
    let color3 = [
      (color1[0] + color2[0]) / 2,
      (color1[1] + color2[1]) / 2,
      (color1[2] + color2[2]) / 2,
    ];
    color3 =
      "#" + intToHex(color3[0]) + intToHex(color3[1]) + intToHex(color3[2]);

    function intToHex(num) {
      var hex = Math.round(num).toString(16);
      if (hex.length == 1) hex = "0" + hex;
      return hex;
    }
    return color3;
  };
}
