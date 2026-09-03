const ns = "http://www.w3.org/2000/svg";

const svg2 = document.querySelector("#myLogo");
const vb2 = svg2.viewBox.baseVal;
const xm2 = vb2.width / 10;
const ym2 = vb2.height / 10;
const colspp = 20;
const cellSizepp = vb2.width / colspp;


const oxa = xm2 * 1;


function drawBalloons(color, strokeWidth) {
const air = document.createElementNS(ns, "path");
air.setAttribute(
  "d",
  `M ${xm2 * 5 - oxa} ${ym2 * 8.2}
C ${xm2 * 5.3 - oxa} ${ym2 * 7.62} 
${xm2 * 4.67 - oxa} ${ym2 * 7.51}
${xm2 * 5.1 - oxa} ${ym2 * 6.19}
S ${xm2 * 4.7 - oxa} ${ym2 * 5.29} ${xm2 * 5.16 - oxa} ${ym2 * 4.55}
L ${xm2 * 5.0 - oxa} ${ym2 * 4.56}
L ${xm2 * 5.1 - oxa} ${ym2 * 4.4}
C ${xm2 * 4.4 - oxa} ${ym2 * 3.5}
${xm2 * 4.88 - oxa} ${ym2 * 1.3}
${xm2 * 5.3 - oxa} ${ym2 * 1.8}
C ${xm2 * 5.6 - oxa} ${ym2 * 2.05} 
${xm2 * 5.78 - oxa} ${ym2 * 3.5} ${xm2 * 5.08 - oxa} ${ym2 * 4.34}`
);
air.setAttribute("stroke", color);
air.setAttribute("fill", "none");
air.setAttribute("stroke-miterlimit", "1");
    air.setAttribute("stroke-width", strokeWidth);
svg2.append(air);

const air2 = document.createElementNS(ns, "path");
air2.setAttribute(
  "d",
  `M ${xm2 * 4.8} ${ym2 * 8.3}
C ${xm2 * 5.2} ${ym2 * 7.9} 
${xm2 * 4.7} ${ym2 * 7.5}
${xm2 * 5.1} ${ym2 * 6.3}
S ${xm2 * 4.7} ${ym2 * 5.3} ${xm2 * 5.0} ${ym2 * 4.6}
L ${xm2 * 4.92} ${ym2 * 4.5}
L ${xm2 * 5.03} ${ym2 * 4.4}
C ${xm2 * 4.4} ${ym2 * 3.5}
${xm2 * 4.8} ${ym2 * 1.3}
${xm2 * 5.3} ${ym2 * 1.7}
C ${xm2 * 5.6} ${ym2 * 2.05} 
${xm2 * 5.85} ${ym2 * 3.5} ${xm2 * 5.0} ${ym2 * 4.3}`
);
air2.setAttribute("stroke", color);
  air2.setAttribute("stroke-width", strokeWidth);
air2.setAttribute("fill", "none");
svg2.append(air2);

const air3 = document.createElementNS(ns, "path");
air3.setAttribute(
  "d",
  `M ${xm2 * 4.86 + oxa} ${ym2 * 8.3}
C ${xm2 * 5 + oxa} ${ym2 * 7.9} 
${xm2 * 4.7 + oxa} ${ym2 * 7.5}
${xm2 * 5 + oxa} ${ym2 * 6.3}
S ${xm2 * 4.7 + oxa} ${ym2 * 5.3} ${xm2 * 5.1 + oxa} ${ym2 * 4.6}
L ${xm2 * 5 + oxa} ${ym2 * 4.5}
L ${xm2 * 5.08 + oxa} ${ym2 * 4.4}
C ${xm2 * 4.3 + oxa} ${ym2 * 3.5}
${xm2 * 4.8 + oxa} ${ym2 * 1.3}
${xm2 * 5.3 + oxa} ${ym2 * 1.91}
C ${xm2 * 5.6 + oxa} ${ym2 * 2.25} 
${xm2 * 5.66 + oxa} ${ym2 * 4} ${xm2 * 5.0 + oxa} ${ym2 * 4.3}`
);
air3.setAttribute("stroke", color);
    air3.setAttribute("stroke-width", strokeWidth);
air3.setAttribute("fill", "none");
svg2.append(air3);

const airl = air.getTotalLength();
const air2l = air2.getTotalLength();
const air3l = air3.getTotalLength();

/* air.setAttribute("stroke-dasharray", `${airl} ${airl + 2}`);
air.setAttribute("stroke-dashoffset", airl);
air2.setAttribute("stroke-dasharray", air2l);
air2.setAttribute("stroke-dashoffset", air2l);
air3.setAttribute("stroke-dasharray", `${air3l} ${air3l + 2}`);
air3.setAttribute("stroke-dashoffset", air3l);

*/

const balloons = [air, air2, air3];
}
// drawBalloons(color, strokeWidth)
drawBalloons("white", 1.8)


const coverRect = document.createElementNS(ns, "path");

coverRect.setAttribute("d", `
M ${xm2 * 5 - oxa * 1.5} 0 v ${ym2 * 10} h ${xm2 * 3.2} 
v ${-ym2 * 10} Z `);

coverRect.setAttribute("fill", "transparent");

coverRect.classList.add("coverRect");

svg2.append(coverRect);

const myLogo = document.querySelector(".containerMylogo");



const scrollTops = document.querySelectorAll(".scrollTop")

scrollTops.forEach(el=> {
el.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
  
  })

