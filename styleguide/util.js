export const withVariants = function (...opts) {
  let result = {};
  opts.forEach((opt) => {
    if (Array.isArray(opt)) {
      result[opt[0]] = opt[1];
    }
    else {
      result = Object.assign(result, opt);
    }
  });
  return result;
}
