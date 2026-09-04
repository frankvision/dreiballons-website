gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const ns = "http://www.w3.org/2000/svg";

function createLogo() {

  const svg2 = document.querySelector("#myLogo");
  const vb2 = svg2.viewBox.baseVal;
  const xm2 = vb2.width / 10;
  const ym2 = vb2.height / 10;
  const oxa = xm2 * 1;

  const backdrop = document.createElementNS(ns, "rect");
  backdrop.setAttribute("width", "40%");
  backdrop.setAttribute("height", "100%");
  backdrop.setAttribute("fill", "#242424");
  backdrop.setAttribute("x", "30.5%");
  backdrop.setAttribute("y", "0");
  backdrop.setAttribute("fill-opacity", 1);
  svg2.append(backdrop);

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

    const balloons = [air, air2, air3];
    balloons.forEach(balloon => {
      balloon.classList.add("balloons");
    });
  }

  drawBalloons("white", 1.8);

  const coverRect = document.createElementNS(ns, "path");
  coverRect.setAttribute("d", `
M ${xm2 * 5 - oxa * 1.5} 0 v ${ym2 * 10} h ${xm2 * 3.2} 
v ${-ym2 * 10} Z `);
  coverRect.setAttribute("fill", "transparent");
  coverRect.classList.add("coverRect");
  svg2.append(coverRect);
}

createLogo();

gsap.set("#myLogo", {
  opacity: 0
});

// Scroll-to-top
const scrollTops = document.querySelectorAll(".scrollTop");
scrollTops.forEach(el => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    gsap.to(window, {
      duration: 1.8,
      scrollTo: 0,
      ease: "sine.out"
    });
  });
});

// Logo verschwindet beim Runterscrollen, kommt beim Hochscrollen zurück (nur Mobile)
ScrollTrigger.matchMedia({
  "(max-width: 600px)": function () {
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (self.direction === 1) {
          gsap.to(".containerMyLogoWrapper", {
            y: -200,
            autoAlpha: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        } else {
          gsap.to(".containerMyLogoWrapper", {
            y: 0,
            autoAlpha: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }
    });
  }
});

// Body- und Logo-Fade-in nach dem Laden
window.addEventListener("load", () => {
  document.body.classList.add("ready");

  setTimeout(() => {
    gsap.to("#myLogo", { opacity: 1, duration: 4 });
  }, 1500); // entspricht der CSS transition-duration von body
});
