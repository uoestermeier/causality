import React, { useEffect, useState } from "react"
import { ComponentProps, Streamlit, withStreamlitConnection } from "streamlit-component-lib"
import { describeMichotteArcs } from "./utils.js"
import gsap from "gsap"
import { Draggable } from "gsap/Draggable"
import { InertiaPlugin } from "gsap/InertiaPlugin"

gsap.registerPlugin(Draggable, InertiaPlugin)

/**
 * We can use a Typescript interface to destructure the arguments from Python
 * and validate the types of the input
 */
interface PythonArgs {
  label: string
  minValue?: number
  maxValue?: number
  initialValue: number[]
}

/**
 * No more props manipulation in the code.
 * We store props in state and pass value directly to underlying Slider
 * and then back to Streamlit.
 */
const CustomAnimation = (props: ComponentProps) => {
  // Destructure using Typescript interface
  // This ensures typing validation for received props from Python
  const { label, initialValue }: PythonArgs = props.args
  const [value] = useState(initialValue)
  let animated = false
  
  function animate() {
    let group = document.getElementById('group')
    let disc = document.getElementById('disc')

    if (animated) {
        gsap.to(group, { scale: 1, y: "+=290" })
    }
    else {
        gsap.to(group, { scale: 2, y: "-=290" })
        gsap.to(disc, { rotate: 0 })
        gsap.to(disc, { delay: 2, duration: 2, rotate: -180 })
    }
    animated = !animated;
};


  useEffect(() => {
    Streamlit.setFrameHeight()
   
    let arc1 = document.getElementById('arc1')
    let arc2 = document.getElementById('arc2')
    arc1!.setAttribute("d", describeMichotteArcs(300, 300, 240, 220, 310, 190, 355, 120, -10, -20))
    arc2!.setAttribute("d", describeMichotteArcs(300, 300, 180, 220, 360, 150, 40, 120, 10, -20))

    gsap.set('#disc', {transformOrigin: '50% 50%'})
    gsap.set('#cover', {transformOrigin: '50% 100%'})
    Draggable.create('#disc', {
        type: "rotation",
        allowEventDefault: true,
        inertia: true
    })
  })

  return (
    <>
      <div style={{backgroundColor: "gray"}}>
      <h3>{label} {value}</h3>
      <svg width="100%"  viewBox="0 0 600 600">
        <g id="group">
            <mask id="myMask">
                <rect x="0" y="150" width="300" height="300" fill="white" />
                <rect x="50" y="295" width="200" height="10" fill="black" rx="5" ry="5"/>
            </mask>
            <text x="40" y="35" fill="white" className="heavy">Click and drag circle to rotate, click black cover to animate</text>
            <g id="disc" >
                <circle cx="300" cy="300" r="250" fill="white"/>
                <path id="arc1" stroke="red" fill="white" stroke-width="10" />
                <path id="arc2" stroke="blue" fill="white" stroke-width="10" />
            </g>
            <rect id="cover" x="0" y="150" width="300" height="300" fill="black"  mask="url(#myMask)" onClick={animate}/>
            <text x="70" y="420" fill="white" className="heavy">Michottes launch event</text>
        </g>
    </svg>
    </div>
   
    </>
  )
}

export default withStreamlitConnection(CustomAnimation)
