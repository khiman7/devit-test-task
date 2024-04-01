type DebouncedFunction<F extends (...args: any[]) => any> = (
  ...args: Parameters<F>
) => void;

export default function debounce<F extends (...args: any[]) => any>(
  func: F,
  delay: number
): DebouncedFunction<F> {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const context = this as ThisParameterType<F>;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}
