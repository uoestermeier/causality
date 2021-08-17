function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    let angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

function betweenPoints(x1, y1, x2, y2, dx=0, dy=0) {
    return {
        x: (x1 + x2) / 2 + dx,
        y: (y1 + y2) / 2 + dy
    }
}

export function describeMichotteArcs(x, y, radius1, startAngle1, endAngle1, radius2, startAngle2, endAngle2, dx=0, dy=0) {
    let start1 = polarToCartesian(x, y, radius1, startAngle1);
    let end1 = polarToCartesian(x, y, radius1, endAngle1);
    let largeArcFlag1 = endAngle1 - startAngle1 <= 180 ? "0" : "1";

    let start2 = polarToCartesian(x, y, radius2, startAngle2);
    let end2 = polarToCartesian(x, y, radius2, endAngle2);
    let largeArcFlag2 = endAngle2 - startAngle2 <= 180 ? "0" : "1";

    let between = betweenPoints(end1.x, end1.y, start2.x, start2.y)
    let d = [
        "M", start1.x, start1.y,
        "A", radius1, radius1, 0, largeArcFlag1, 1, end1.x, end1.y,
        "Q", between.x + dx, between.y + dy, start2.x, start2.y,
        "A", radius2, radius2, 0, largeArcFlag2, 1, end2.x, end2.y,
    ].join(" ");

    return d;
}

