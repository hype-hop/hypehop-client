// eslint-disable-next-line no-unused-vars
function debounce(this: unknown, func: (...args: unknown[]) => void, delay: number): (...args: unknown[]) => void {
  // eslint-disable-next-line no-undef
  let timer: NodeJS.Timeout;
  // eslint-disable-next-line func-names
  return function (this: unknown, ...args: unknown[]) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}
export default debounce;
