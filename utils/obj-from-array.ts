export function objFromArray<T>(arr: T[], key = "id"): Record<string, T> {
  return arr.reduce((accumulator: any, current: any) => {
    accumulator[current[key]] = current;
    return accumulator;
  }, {});
}
