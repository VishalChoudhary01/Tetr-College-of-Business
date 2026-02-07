export function initTextBlurRevealUP() {
  const { animate, inView } = window.Motion

  const texts = document.querySelectorAll(".text-blur-revealUP")
  if (!texts.length) return

  texts.forEach((el) => {
    // initial state
    animate(
      el,
      {
        opacity: 0,
        y: 40,
        filter: "blur(10px)",
      },
      { duration: 0 }
    )

    // reveal on scroll
    inView(
      el,
      () => {
        animate(
          el,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          },
          {
            duration: 0.8,
            easing: "ease-out",
          }
        )
      },
      { once: true }
    )
  })
}
