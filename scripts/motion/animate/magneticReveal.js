export function initMagneticReveal() {
  if (!window.Motion) return

  const { animate, inView } = window.Motion

  const items = document.querySelectorAll(".magnetic-reveal")
  if (!items.length) return

  items.forEach((el) => {
    const target = el.firstElementChild || el

    // initial "repelled" state
    animate(
      target,
      {
        opacity: 0,
        x: -30,
        y: 30,
        rotate: -6,
        scale: 0.92,
      },
      { duration: 0 }
    )

    inView(
      el,
      () => {
        // SNAP IN (magnetic pull)
        animate(
          target,
          {
            opacity: 1,
            x: 4,
            y: -4,
            rotate: 1.5,
            scale: 1.02,
          },
          {
            duration: 0.45,
            easing: "ease-out",
          }
        )

        // SETTLE BACK (snap to origin)
        animate(
          target,
          {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
          },
          {
            duration: 0.35,
            easing: "ease-out",
            delay: 0.45,
          }
        )

        // RESET when leaving view
        return () => {
          animate(
            target,
            {
              opacity: 0,
              x: -30,
              y: 30,
              rotate: -6,
              scale: 0.92,
            },
            {
              duration: 0.3,
              easing: "ease-in",
            }
          )
        }
      },
      {
        margin: "-15% 0px",
      }
    )
  })
}
