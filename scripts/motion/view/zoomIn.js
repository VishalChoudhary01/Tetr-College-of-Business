export function initZoomIn() {
  if (!window.Motion) return

  const { animate, inView } = window.Motion

  const items = document.querySelectorAll(".zoom-in")
  if (!items.length) return

  items.forEach((el) => {
    const target = el.firstElementChild || el

    // initial state
    animate(
      target,
      {
        scale: 0.2,
        opacity: 0,
      },
      { duration: 0 }
    )

    inView(
      el,
      () => {
        // ENTER → zoom in
        animate(
          target,
          {
            scale: 1,
            opacity: 1,
          },
          {
            duration: 1.1,
            easing: "ease-out",
          }
        )

        // LEAVE → reset
        return () => {
          animate(
            target,
            {
              scale: 0.9,
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
