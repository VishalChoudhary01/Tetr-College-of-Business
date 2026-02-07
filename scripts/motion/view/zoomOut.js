export function initZoomOut() {
  if (!window.Motion) return

  const { animate, inView } = window.Motion

  const items = document.querySelectorAll(".zoom-out")
  if (!items.length) return

  items.forEach((el) => {
    const target = el.firstElementChild || el

    // initial state (zoomed in)
    animate(
      target,
      {
        scale: 5.15,
        opacity: 0,
      },
      { duration: 0 }
    )

    inView(
      el,
      () => {
        // ENTER → zoom out to normal
        animate(
          target,
          {
            scale: 1,
            opacity: 1,
          },
          {
            duration: 0.8,
            easing: "ease-out",
          }
        )

        // LEAVE → reset
        return () => {
          animate(
            target,
            {
              scale: 1.15,
              opacity: 0,
            },
            {
              duration: 0.4,
              easing: "ease-in",
            }
          )
        }
      },
      {
        margin: "-20% 0px",
      }
    )
  })
}
