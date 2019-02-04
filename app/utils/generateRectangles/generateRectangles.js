// using a random color generator by Anatoliy from StackOverflow
// https://stackoverflow.com/questions/1484506/random-color-generator
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
//

export default function generate() {
  const rectangles = [];

  for (let i = 0; i < 30; i++) {
    const rectangle = {
      height: Math.floor(Math.random() * 201 + 100),
      color: getRandomColor()
    };
    rectangles.push(rectangle);
  }

  return rectangles;
}
