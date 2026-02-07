export function initSlideInLeftInView() {
  if (!window.Motion) {
    console.warn("Motion not loaded")
    return
  }

  const { animate, inView } = window.Motion

  const buttons = document.querySelectorAll(".View-slide-left")
  if (!buttons.length) return

  buttons.forEach((btn) => {
    // initial state (offscreen left)
    animate(
      btn,
      { x: -60, opacity: 0 },
      { duration: 0 }
    )

    // slide in when visible
    inView(
      btn,
      () => {
        animate(
          btn,
          { x: 0, opacity: 1 },
          { duration: 0.6, easing: "ease-out" }
        )
      },
    )
  })
}
