export function initRollingItemonHoverLetters() {
  if (!window.Motion) return

  const { animate } = window.Motion
  const items = document.querySelectorAll(".roll-hoverLetter")
  if (!items.length) return

  items.forEach((item) => {
    // prevent double init
    if (item.dataset.rollingInit) return
    item.dataset.rollingInit = "true"

    const originalText = item.textContent
    item.textContent = "";

    // split text into spans (safe version)
    Array.from(originalText).forEach((char) => {
      const span = document.createElement("span")
      span.textContent = char === " " ? "\u00A0" : char
      span.style.display = "inline-block"
      span.style.willChange = "transform"
      item.appendChild(span)
    })

    const letters = Array.from(item.children)
    let isAnimating = false

    item.addEventListener("mouseenter", () => {
      if (isAnimating) return
      isAnimating = true

      letters.forEach((letter, i) => {
        animate(
          letter,
          { y: [0, -18, 0] },
          {
            duration: 0.45,
            delay: i * 0.035,
            easing: "ease-out",
          }
        )
      })

      // unlock after animation
      setTimeout(() => {
        isAnimating = false
      }, 450 + letters.length * 35)
    })

    item.addEventListener("mouseleave", () => {
      letters.forEach((letter) => {
        animate(
          letter,
          { y: 0 },
          {
            duration: 0.2,
            easing: "ease-out",
          }
        )
      })
    })
  })
}
