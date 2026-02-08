export function initFlapFromTop() {
  if (!window.Motion) return

  const { animate, inView } = window.Motion
  const items = document.querySelectorAll(".flap-3d img")
  if (!items.length) return

  items.forEach((el) => {
    // initial folded state (hidden above)
    animate(
      el,
      {
        rotateX: 185,
        opacity: 0,
      },
      { duration: 0 }
    )

    const flapIn = () => {
      // flap down with overshoot
      animate(
        el,
        {
          rotateX: [185, 12, 0],
          opacity: 1,
        },
        {
          duration: 4,
          easing: "ease-out",
        }
      )
    }

    // if already visible → animate immediately
    const rect = el.getBoundingClientRect()
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0

    if (isVisible) {
      requestAnimationFrame(flapIn)
    } else {
      inView(el, flapIn, { once: true })
    }
  })
}
