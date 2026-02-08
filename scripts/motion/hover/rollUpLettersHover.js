export function initRollUpLettersHover
() {
  if (!window.Motion) return

  const { animate } = window.Motion
  const items = document.querySelectorAll(".roll-up")
  if (!items.length) return

  items.forEach((item) => {
    // prevent double init
    if (item.dataset.rollInit) return
    item.dataset.rollInit = "true"

    const text = item.textContent
    item.textContent = ""; 

    // split text into letters
    Array.from(text).forEach((char) => {
      const span = document.createElement("span")
      span.textContent = char === " " ? "\u00A0" : char
      item.appendChild(span)
    })

    const letters = Array.from(item.children)

    item.addEventListener("mouseenter", () => {
      letters.forEach((letter, i) => {
        animate(
          letter,
          { y: [0, -22, 0] },
          {
            duration: 0.5,
            delay: i * 0.04,
            easing: "ease-out",
          }
        )
      })
    })

    item.addEventListener("mouseleave", () => {
      letters.forEach((letter) => {
        animate(letter, { y: 0 }, { duration: 0.2 })
      })
    })
  })
}
