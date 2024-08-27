export function throttle(fn, delay: number) {
  let throttle = false;
  return function (...args) {
    if (throttle) return;
    throttle = true;
    setTimeout(() => {
      fn.apply(this, args);
      throttle = false;
    }, delay)
  };
}