export function initRollUpOnView() {
  if (!window.Motion) return

  const { animate, inView } = window.Motion
  const items = document.querySelectorAll(".roll-up-view")
  if (!items.length) return

  items.forEach((item) => {
    if (item.dataset.rollViewInit) return
    item.dataset.rollViewInit = "true"

    const text = item.textContent
    item.textContent = "" 

    // split text into spans
    Array.from(text).forEach((char) => {
      const span = document.createElement("span")
      span.textContent = char === " " ? "\u00A0" : char
      span.style.display = "inline-block"
      span.style.willChange = "transform"
      item.appendChild(span)

      animate(span, { y: 84 }, { duration: 0 })
    })

    const letters = Array.from(item.children)

    const runAnimation = () => {
      letters.forEach((letter, i) => {
        animate(
          letter,
          { y: 0 },
          {
            duration: 0.6,
            delay: i * 0.06,
            easing: "ease-out",
          }
        )
      })
    }

    const rect = item.getBoundingClientRect()
    const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0

    if (alreadyVisible) {
      requestAnimationFrame(runAnimation)
    } else {
      // otherwise wait for scroll
      inView(item, runAnimation)
    }
  })
}
