exports.onClientEntry = async () => {
  if (typeof window.IntersectionObserver === `undefined`) {
    await import(`intersection-observer`)
    console.log(`👍 IntersectionObserver is polyfilled`)
  }
};

require("typeface-inter")
require("typeface-inconsolata")