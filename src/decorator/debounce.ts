export function debounce(delay) {
    let timerId;
    return function(target, name, descriptor) {
      const original = descriptor.value;
      descriptor.value = function(...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
          original.apply(this, args);
        }, delay);
      };
      return descriptor;
    };
  }