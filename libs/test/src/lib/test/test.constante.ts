export type Multiplication = {
  id: number;
  question: string;
  result: number;
  answer: number;
  responseTime: number;
};

export const TABLE = (x: number) =>
  Array.from({ length: 10 }, (_, k) => ({
    id: k + 1 + x * 10,
    question: `${x} × ${k + 1} = `,
    answer: x * (k + 1),
    result: x * (k + 1),
    responseTime: 0,
  }));

export const LIST_TABLE = Array.from({ length: 10 }, (_, k) => TABLE(k + 1));

export function shuffle(array: Multiplication[]) {
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
