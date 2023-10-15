export function createArrayFrom1ToN(n: number) {
  return Array.from({ length: n }, (_, index) => index + 1)
}

export function convertText(text: string) {
  return text
    .split('_')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ')
}

export function capitalizeFirstLetter(text: string) {
  return text[0].toUpperCase() + text.slice(1)
}
