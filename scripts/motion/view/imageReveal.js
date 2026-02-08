export function initImageReveal() {
  if (!window.Motion) return

  const { animate, inView } = window.Motion

  const items = document.querySelectorAll(".img-reveal img")
  if (!items.length) return

  items.forEach((img) => {
    // initial state
    animate(
      img,
      {
        opacity: 0,
        y: 30,
        scale: 1.05,
        filter: "blur(12px)",
      },
      { duration: 0 }
    )

    // reveal on view
    inView(
      img,
      () => {
        animate(
          img,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
          },
          {
            duration: 0.9,
            delay:0.5,
            easing: "ease-out",
          }
        )
      },
      {
        margin: "-20% 0px",
      }
    )
  })
}
