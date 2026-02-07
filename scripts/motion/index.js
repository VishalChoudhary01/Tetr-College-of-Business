import {initSlideInLeftInView} from './view/SlideInLeftInView.js'
import {initSlideInRightInView} from './view/SlideInRightInView.js'
import {initTextBlurRevealDOWN} from './animate/textBlurRevealDOWN.js'
import {initTextBlurRevealUP} from './animate/textBlurRevealUP.js'
import {initSlideInLeft} from './animate/SlideInLeft.js'
import {initSlideInRight} from './animate/SlideInRight.js'
import {initCountUp} from './view/countUp.js'
import {initImageReveal} from './view/imageReveal.js'
import {initImageMaskReveal} from './view/imageMaskReveal.js'
import {initZoomIn} from './view/zoomIn.js'
import {initZoomOut} from './view/zoomOut.js'
import {initRotateBack} from './animate/rotateBack.js'
import {initMagneticReveal} from './animate/magneticReveal.js' 
import {initCountUpNoComma} from './view/countNOComma.js'

window.addEventListener("DOMContentLoaded",()=>{
    initSlideInLeftInView(),
    initSlideInRightInView(),
    initTextBlurRevealDOWN(),
    initTextBlurRevealUP(),
    initSlideInLeft(),
    initSlideInRight(),
    initCountUp(),
    initImageReveal(),
    initImageMaskReveal(),
    initZoomIn(),
    initZoomOut(),
    initRotateBack(),
    initMagneticReveal(),
    initCountUpNoComma()

})