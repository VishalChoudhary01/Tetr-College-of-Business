export function initHoverDisapper() {
  if (!window.Motion) return

  const { animate } = window.Motion

  const items = document.querySelectorAll(".itemHoverDisappear")
  if (!items.length) return

  items.forEach((item) => {
    const underline = item

    item.addEventListener("mouseenter", (e) => {
      const rect = item.getBoundingClientRect()
      const fromLeft = e.clientX < rect.left + rect.width / 2

      // text magnetic slide
      animate(
        item,
        {
          x: fromLeft ? -6 : 6,
        },
        { duration: 0.25, easing: "ease-out" }
      )

      // underline snap from cursor side
      animate(
        item,
        {
          transformOrigin: fromLeft ? "left" : "right",
        },
        { duration: 0 }
      )

      animate(
        item,
        {
          scaleX: 1,
        },
        { duration: 0.35, easing: "ease-out" }
      )
    })

    item.addEventListener("mouseleave", () => {
      // reset text
      animate(
        item,
        { x: 0 },
        { duration: 0.3, easing: "ease-out" }
      )

      // hide underline
      animate(
        item,
        { scaleX: 0 },
        { duration: 0.25, easing: "ease-in" }
      )
    })
  })
}
