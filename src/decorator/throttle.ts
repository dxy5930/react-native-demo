export function throttle(interval) {
    let canRun = true;
    return function(target, name, descriptor) {
      const original = descriptor.value;
      descriptor.value = function(...args) {
        if (canRun) {
          canRun = false;
          original.apply(this, args);
          setTimeout(() => {
            canRun = true;
          }, interval);
        }
      };
      return descriptor;
    };
  }