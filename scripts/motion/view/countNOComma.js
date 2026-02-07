export function initCountUpNoComma() {
  if (!window.Motion) return

  const { animate, inView } = window.Motion

  const counters = document.querySelectorAll(".count-upNO")
  if (!counters.length) return

  counters.forEach((el) => {
    const from = Number(el.dataset.from ?? 0)
    const to = Number(el.dataset.to ?? 0)
    const duration = Number(el.dataset.duration ?? 1)

    // initial value
    el.textContent = from

    inView(
      el,
      () => {
        const controls = animate(
          (progress) => {
            const value = Math.round(from + (to - from) * progress)
            el.textContent = value // 👈 NO commas
          },
          { duration, easing: "ease-out" }
        )

        return () => controls.stop()
      },
      {
        once: true,
        margin: "-20% 0px",
      }
    )
  })
}
