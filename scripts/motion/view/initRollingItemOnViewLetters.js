export function initRollingItemOnViewLetters() {
  if (!window.Motion) return

  const { animate, inView } = window.Motion
  const items = document.querySelectorAll(".roll-viewLetter")
  if (!items.length) return

  items.forEach((item) => {
    // prevent double init
    if (item.dataset.rollViewInit) return
    item.dataset.rollViewInit = "true"

    const originalText = item.textContent
    item.textContent = "" 

    // split text into spans
    Array.from(originalText).forEach((char) => {
      const span = document.createElement("span")
      span.textContent = char === " " ? "\u00A0" : char
      span.style.display = "inline-block"
      span.style.willChange = "transform"
      item.appendChild(span)

      // set initial state via Motion
      animate(span, { y: 20 }, { duration: 0 })
    })

    const letters = Array.from(item.children)

    const runAnimation = () => {
      letters.forEach((letter, i) => {
        animate(
          letter,
          { y: [20, -12, 0] }, 
          {
            duration: 0.6,
            delay: i * 0.08,
            easing: "ease-out",
          }
        )
      })
    }

    const rect = item.getBoundingClientRect()
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0

    if (isVisible) {
      requestAnimationFrame(runAnimation)
    } else {
      inView(item, runAnimation, { once: true })
    }
  })
}
