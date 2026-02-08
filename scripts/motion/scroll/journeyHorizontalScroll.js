const { animate, scroll } = window.Motion

const journeySection = document.querySelector(".journey-section")
const track = document.querySelector(".track-container")
const panels = document.querySelectorAll(".panel-frame")

if (!journeySection || !track || !panels.length) {
  console.warn("Journey horizontal scroll: elements not found")
} else {
  scroll(
    animate(track, {
      transform: [
        "none",
        `translateX(-${(panels.length - 1) * 100}vw)`
      ]
    }),
    {
      target: journeySection
    }
  )
}
