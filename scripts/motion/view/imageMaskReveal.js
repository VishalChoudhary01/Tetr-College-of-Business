export function initImageMaskReveal() {
  if (!window.Motion) return

  const { animate, inView } = window.Motion

  const images = document.querySelectorAll(".img-mask-reveal")
  if (!images.length) return

  images.forEach((img) => {
    // ensure initial masked state
    animate(
      img,
      {
        clipPath: "inset(100% 0% 0% 0%)",
        scale: 1.05,
      },
      { duration: 0 }
    )

    inView(
      img,
      () => {
        animate(
          img,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
          },
          {
            duration: 1,
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
