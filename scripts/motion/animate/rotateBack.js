export function initRotateBack() {
  if (!window.Motion) return

  const { animate, inView } = window.Motion

  const items = document.querySelectorAll(".rotate-back")
  if (!items.length) return

  items.forEach((el) => {
    const target = el.firstElementChild || el

    // initial rotated state
    animate(
      target,
      {
        rotate: -20,
        opacity: 0,
      },
      { duration: 0 }
    )

    inView(
      el,
      () => {
        // ENTER → rotate back to origin
        animate(
          target,
          {
            rotate: 0,
            opacity: 1,
          },
          {
            duration: 0.7,
            easing: "ease-out",
          }
        )

        // LEAVE → reset rotation
        return () => {
          animate(
            target,
            {
              rotate: -20,
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
