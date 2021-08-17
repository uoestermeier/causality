let animated = false

arc1.setAttribute("d", describeMichotteArcs(300, 300, 240, 220, 310, 190, 355, 120, -10, -20));
arc2.setAttribute("d", describeMichotteArcs(300, 300, 180, 220, 360, 150, 40, 120, 10, -20));
gsap.set(disc, {transformOrigin: '50% 50%'});
gsap.set(cover, {transformOrigin: '50% 100%'});
Draggable.create(disc, {
    type: "rotation",
    allowEventDefault: true,
    inertia: true
});

function animate() {
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
