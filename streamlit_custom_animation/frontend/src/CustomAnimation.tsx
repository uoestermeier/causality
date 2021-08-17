import React, { useEffect, useState, useRef } from "react"
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
  const groupRef = useRef(null)
  const discRef = useRef(null)
  const coverRef = useRef(null)
  const arc1Ref = useRef(null)
  const arc2Ref = useRef(null)
  let animated = false

  useEffect(() => {
    Streamlit.setFrameHeight()
    if (arc1Ref && arc1Ref.current) {
      // @ts-ignore: Object is possibly 'null'.
      arc1Ref.current.setAttribute("d", describeMichotteArcs(300, 300, 240, 220, 310, 190, 355, 120, -10, -20))
    }
    if (arc2Ref && arc2Ref.current) {
      // @ts-ignore: Object is possibly 'null'.
      arc2Ref.current.setAttribute("d", describeMichotteArcs(300, 300, 180, 220, 360, 150, 40, 120, 10, -20))
    }
  
    gsap.set(discRef.current, {transformOrigin: '50% 50%'})
    gsap.set(coverRef.current, {transformOrigin: '50% 100%'})
    Draggable.create(discRef.current, {
      type: "rotation",
      allowEventDefault: true,
      inertia: true
    })
  })

  function animate() {
    if (animated) {
        gsap.to(groupRef.current, { scale: 1, y: "+=290" })
    }
    else {
        gsap.to(groupRef.current, { scale: 2, y: "-=290" })
        gsap.to(discRef.current, { rotate: 0 })
        gsap.to(discRef.current, { delay: 2, duration: 2, rotate: -180 })
    }
    animated = !animated;
};

  return (
    <>
      <div style={{backgroundColor: "gray"}}>
      <h3>{label} {value}</h3>
      <svg width="100%"  viewBox="0 0 600 600">
        <g ref={groupRef}>
            <mask id="myMask">
                <rect x="0" y="150" width="300" height="300" fill="white" />
                <rect x="50" y="295" width="200" height="10" fill="black" rx="5" ry="5"/>
            </mask>
            <text x="40" y="35" fill="white" className="heavy">Click and drag circle to rotate, click black cover to animate</text>
            <g ref={discRef}>
                <circle cx="300" cy="300" r="250" fill="white"/>
                <path ref={arc1Ref} stroke="red" fill="white" strokeWidth="10" />
                <path ref={arc2Ref} stroke="blue" fill="white" strokeWidth="10" />
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
