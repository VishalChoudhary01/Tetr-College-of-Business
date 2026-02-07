export function initViewRevealUP() {
  if (!window.Motion) {
    console.warn("Motion not loaded")
    return
  }

  const { animate, inView } = window.Motion

  const texts = document.querySelectorAll(".view-text-reveal-UP")
  if (!texts.length) return

  texts.forEach((el) => {
    // initial hidden state
    animate(
      el,
      { y: 80, opacity: 0 },
      { duration: 0 }
    )

    // reveal on scroll
    inView(
      el,
      () => {
        animate(
          el,
          { y: 0, opacity: 1 },
          { duration: 0.6, easing: "ease-out" }
        )
      },
    )
  })
}
