gsap.registerPlugin(ScrollTrigger, SplitText);


const shapeColor = "	#C41E3A66";

const cinemaColor = shapeColor;

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const ns = "http://www.w3.org/2000/svg";

function desktopStuff() {

const burger = document.querySelector("#burger");



function drawHorts() {
  const rect = burger.getBoundingClientRect();

  const rows = 20;
  const cellSize = Math.floor(rect.height / rows);
  const gridHeight = cellSize * rows;
  const cols = Math.floor(rect.width / cellSize);
  const gridWidth = cols * cellSize;
  const offsetY = (rect.height - gridHeight) / 2;
  const offsetX = (rect.width - gridWidth) / 2;
  const bitSize = cellSize / 1;
  const io = (cellSize - bitSize) / 2;

  for (let row = 0; row < rows; row++) {
    let y = cellSize * row + offsetY + io;
    let x = offsetX + io;

    let br = document.createElement("div");
    br.style.background = "white";
    br.style.position = "absolute";
    br.style.borderRadius = "0px";
    br.style.left = `${x}px`;
    br.style.top = `${y}px`;
    br.style.width = `${gridWidth - io * 2}px`;
    br.style.height = `${bitSize}px`;
    br.style.opacity = "0";
    br.classList.add("oldHorts");
    br.classList.add("br");
    burger.append(br);
  }
}

function drawVerts() {
  const rect = burger.getBoundingClientRect();

  const rows = 14;
  const cellSize = Math.floor(rect.height / rows);
  const gridHeight = cellSize * rows;
  const cols = Math.floor(rect.width / cellSize);
  const offsetY = (rect.height - gridHeight) / 2;
  const offsetX = (rect.width - cols * cellSize) / 2;
  const bitSize = cellSize / 1.8;
  const io = (cellSize - bitSize) / 2;

  for (let col = 0; col < cols; col++) {
    let x = col * cellSize + offsetX + io;

    let br = document.createElement("div");
    br.style.background = "lime";
    br.style.position = "absolute";
    br.style.left = `${x}px`;
    br.style.top = `${offsetY + io}px`;
    br.style.width = `${bitSize}px`;
    br.style.height = `${gridHeight - 2 * io}px`;
    br.classList.add("oldVerts");
    br.classList.add("br");
    burger.append(br);
  }
}

let crosses = [];
let counter = 0;

function drawCrosses(targetSelector, cinemaNumber, rowAmount, crossColor) {
  const target = document.querySelector(targetSelector);
  target.innerHTML = "";
  const rect = target.getBoundingClientRect();

  if (rect.width <= 0 || rect.height <= 0) return; // bail if not visible/sized yet

  const rows = rowAmount;
  const cellSize = Math.floor(rect.height / rows);

  if (cellSize <= 0) return; // guard against runaway col 
  const gridHeight = cellSize * rows;
  const cols = Math.floor(rect.width / cellSize);
  const gridWidth = cols * cellSize;
  const offsetY = (rect.height - gridHeight) / 2;
  const offsetX = (rect.width - gridWidth) / 2;
  const bitSize = cellSize / 1.2;
  const io = (cellSize - bitSize) / 2;

  const crossHeight = bitSize / 12;
  const oTop = (bitSize - crossHeight) / 2;
  const crossWidth = crossHeight;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let y1 = row * cellSize + offsetY + io;
      let x1 = col * cellSize + offsetX + io + oTop;

      let pair = document.createElement("div");
      pair.style.position = "absolute";
      pair.style.left = `${col * cellSize + offsetX + io}px`;
      pair.style.top = `${row * cellSize + offsetY + io}px`;
      pair.style.width = `${bitSize}px`;
      pair.style.height = `${bitSize}px`;
      pair.style.transformOrigin = "50% 50%";
      pair.style.zIndex = "6";

      let br = document.createElement("div");
      br.style.background = crossColor ?? "white";
      br.style.position = "absolute";
      br.style.left = `${oTop}px`;
      br.style.top = `0px`;
      br.style.width = `${crossWidth}px`;
      br.style.height = `${bitSize}px`;
      const classCrossY = "crossy" + cinemaNumber;
      br.classList.add(classCrossY);
      br.dataset.row = row;
      br.dataset.col = col;

      let y2 = row * cellSize + offsetY + io + oTop;
      let x2 = col * cellSize + offsetX + io;

      let br2 = document.createElement("div");
      br2.style.background = crossColor ?? "white";
      br2.style.position = "absolute";
      br2.style.left = `0px`;
      br2.style.top = `${oTop}px`;
      br2.style.width = `${bitSize}px`;
      br2.style.height = `${crossWidth}px`;
      const classCrossX = "crossx" + cinemaNumber;
      br2.classList.add(classCrossX);
      br2.dataset.row = row;
      br2.dataset.col = col;

      crosses.push({
        crossNumber: counter,
        row: row,
        col: col,
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        crossWidth: crossWidth,
        bitSize: bitSize
      });

      pair.append(br, br2);
      const pairClassName = "pairs" + cinemaNumber;
      pair.classList.add(pairClassName);
      br.dataset.cross = counter;
      br2.dataset.cross = counter;
      pair.dataset.row = row;
      pair.dataset.col = col;
      pair.dataset.cross = counter;

      target.append(pair);

      if (col === 0) {
        let hort = document.createElement("div");
        hort.style.background = "#0007";
        hort.style.border = "2px solid #f007";
        hort.style.position = "absolute";
        hort.style.left = `${col * cellSize + offsetX + io}px`;
        hort.style.top = `${row * cellSize + offsetY + io}px`;
        hort.style.width = `${gridWidth - 2 * io}px`;
        hort.style.height = `${bitSize}px`;
        hort.style.zIndex = "4";
        hort.style.opacity = "0";
        const classHorts = "horts" + cinemaNumber;
        hort.classList.add(classHorts);
        target.append(hort);
      }

      if (row === 0) {
        let vert = document.createElement("div");
        vert.style.background = cinemaColor;
        vert.style.position = "absolute";
        vert.style.left = `${col * cellSize + offsetX + io}px`;
        vert.style.top = `${row * cellSize + offsetY + io}px`;
        vert.style.width = `${bitSize}px`;
        vert.style.height = `${gridHeight - 2 * io}px`;
        vert.style.zIndex = "2";
        vert.style.opacity = "0";
        const classVerts = "verts" + cinemaNumber;
        vert.classList.add(classVerts);
        target.append(vert);
      }

      counter++;
    }
  }
}

function allDraw() {
  drawCrosses("#burger", 1, 3);
  drawCrosses("#sandwich", 2, 7);
  drawHorts();
}

const sandwichtl = gsap.timeline({
  repeat: -1,
  yoyo: true
})

sandwichtl.to(".pairs2", {
  background: cinemaColor,
  scale: 3,
  stagger: {
    each: 0.1,
    from: "random"
  }
})

// ------- filters / static one-off SVG decoration (mySvg) -------


const tl3 = gsap.timeline();
tl3.to(crosses, { scale: 1.8, duration: 3, transformOrigin: "center" });

// ------- canvas dots (myCanvas) - static container, runs once -------
function setupCanvas(canvas, draw) {
  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();
  let width = rect.width;
  let height = rect.height;

  const dpr = window.devicePixelRatio || 1;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  function runDraw() {
    draw(ctx, width, height);
  }
  runDraw();
}





// ------- knowSvg (static, viewBox-based) -------








// ------- neoSvg (static, viewBox-based polygon morph) -------

// ------- mainSvg (static, viewBox-based lines + balloon paths) -------
const svg2 = document.querySelector("#mainSvg");
const vb2 = svg2.viewBox.baseVal;
const xm2 = vb2.width / 10;
const ym2 = vb2.height / 10;
const colspp = 20;
const cellSizepp = vb2.width / colspp;

function drawLines() {
  for (let colpp = 0; colpp < colspp + 1; colpp++) {
    const path2pp = document.createElementNS(ns, "path");
    let diff = colspp / 2 - colpp;
    let startx = xm2 * 5 - diff * 8;
    let starty = ym2 * 10;
    let endx = colpp * cellSizepp;
    let endy = 0;

    path2pp.setAttribute("d", `M ${startx} ${starty} L ${endx} ${endy}`);
    path2pp.setAttribute("stroke", "white");
    path2pp.setAttribute("stroke-width", "2");
    path2pp.classList.add("path2pp");
    svg2.append(path2pp);
  }
}
drawLines();

const oxa = xm2 * 1;

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
air.setAttribute("stroke", "white");
air.setAttribute("fill", "none");
air.setAttribute("stroke-miterlimit", "1");
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
air2.setAttribute("stroke", "white");
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
air3.setAttribute("stroke", "white");
air3.setAttribute("fill", "none");
svg2.append(air3);

const airl = air.getTotalLength();
const air2l = air2.getTotalLength();
const air3l = air3.getTotalLength();

air.setAttribute("stroke-dasharray", `${airl} ${airl + 2}`);
air.setAttribute("stroke-dashoffset", airl);
air2.setAttribute("stroke-dasharray", air2l);
air2.setAttribute("stroke-dashoffset", air2l);
air3.setAttribute("stroke-dasharray", `${air3l} ${air3l + 2}`);
air3.setAttribute("stroke-dashoffset", air3l);

const balloons = [air, air2, air3];

// runs once 
const split = SplitText.create(".maintext", { type: "chars" });

// static setup for verts2/pairs2 (unrelated to the resize-rebuilt grid)
gsap.set(".pairs2", { opacity: 0 });
gsap.set(".verts2", {
  scaleY: 0.2,
  opacity: 0,
  scaleX: 3,
  background: "white",
  y: (i, target, targets) => ((targets.length - 1) / 2 - i) * 20,
  border: "4px solid #fff7"
});
gsap.set(".pairs2", { opacity: 1 });

// =====================================================================
// The section below (#burger / #sandwich grid + its animation) is the
// only part that depends on rendered element size, so it's the only
// part that gets torn down and rebuilt on resize.
// ======

let masterTL = null;
let resizeTimer = null;

const sally = [4, 6, 9, 14, 17, 22, 24];
const sally2 = [2, 4, 9, 12, 17, 20, 22];
const sally3 = [0, 1, 2, 6, 7, 8, 9, 10, 11, 15, 16, 17, 18, 19, 20, 24, 25, 26];
const sally4 = [7, 26, 25, 1, 2, 6, 8, 18, 19, 24];

function buildEverything() {
  if (masterTL) masterTL.kill();

  
  const maintext = document.querySelector(".maintext");
  
  crosses = [];
  counter = 0;
  
allDraw(); 
  

  if (maintext) burger.appendChild(maintext);
  


  const allCrosses = [...document.querySelectorAll(".pairs1")];
  const newx = allCrosses.filter((el, i) => sally.includes(i));
  const newx3 = allCrosses.filter((el, i) => sally3.includes(i));
  const newx4 = allCrosses.filter((el, i) => sally4.includes(i));

  
  
  masterTL = gsap.timeline({ repeat: -1});

  masterTL
    .set(".pairs1", { opacity: 0, scale: 0.6 })
    .set(".path2pp", { opacity: 0 })
    .set(".horts1", { opacity: 0, x: 0 })
    .set(".verts1", { opacity: 0, backgroundColor: "transparent", scaleX: 1, rotation: 0 })
    .set(".maintext", { opacity: 0, scale: 1, color: "white" })
    .set(balloons, {
    strokeDashoffset: (i, target) => target.getTotalLength(),
    stroke: "white"
  })

    .to(newx, { opacity: 1, scale: 1, duration: 0.4, stagger: { each: 0.05, from: "center" } })

    .set(".pairs1", { opacity: 0, scale: 1 })
    .set(".path2pp", { opacity: 0 })

    .fromTo(
      ".verts1",
      { opacity: 0 },
      {
        x: 0,
        y: 0,
        opacity: 1,
        backgroundColor: "#fffb",
        duration: 0.4,
        ease: "expo.out",
        stagger: { each: 0.04, from: "edges" }
      }
    )

    .to(".verts1", { scaleX: 0, duration: 0.4 }, ">-0.4")

    .to(".verts1", {
      backgroundColor: "#40f7",
      rotation: 180,
      scale: 1,
      duration: 1.7,
      ease: "power3.out"
    })

    .fromTo(
      ".horts1",
      { opacity: 1, duration: 2, x: (i) => (i % 2 === 0 ? -400 : 400) },
      { x: 0, duration: 1.7, opacity: 0 },
      "<"
    )

    .to({}, { duration: 0.12 })

    .to(".verts1", { y: 400, stagger: { each: 0.03, from: "center" } }, ">-0.4")

    .set(".pairs1", { scale: 0.5 })

    .to(".horts1", {
      background: "transparent",
      border: "none",
      scaleX: 0.2,
      opacity: 0.8,
      duration: 0.8,
      x: 0,
      stagger: { from: "center", each: 0.08 }
    })

    .set(".horts1", { background: "transparent", border: "none", scale: 0, opacity: 0, x: 0 })
    .set(".crossy1, .crossx1", { background: "white" })

    .to(newx3, { opacity: 1, duration: 0.4, scale: 0.2, stagger: { each: 0.02, from: "center" } })

    .to(balloons, { strokeDashoffset: 0, stagger: 0.6, duration: 1.2, stroke: "white" }, ">-0.4")

    .set(
      newx3,
      {
        rotation: 360,
        ease: "power3.out",
        stagger: { each: 0.1, from: "center" }
      },
      "<.4"
    )

    .to(newx3, { opacity: 1, duration: 0.4, scale: 0.2, stagger: { each: 0.02, from: "center" } }, "<")

    .set(".pairs1", { opacity: 0, scale: 1 })

    .to(".maintext", { opacity: 1, duration: 1.4, scale: 1.4, color: "white" })
    .to(balloons, { stroke: "#fff4" }, "<")

    .to({}, { duration: 0.12 })
    .set(".pairs1", { scale: 0.2 })

    // resets
    .set(".maintext", { color: "#fffa" })
    .to({}, { duration: 0.1 })
    .set(".maintext", { color: "white" })
    .to({}, { duration: 10.2 })

    .to(
      newx4,
      {
        duration: 0.2,
        opacity: 0.6,
        scale: 0.4,
        repeat: 3,
        yoyo: true,
        repeatDelay: 0.6,
        stagger: { each: 0.2, repeat: 1, yoyo: true }
      },
      "<1"
    )

    .to({}, { duration: 0.2 });
}

buildEverything();

const resizeHandler = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(buildEverything, 600);
  };
  window.addEventListener("resize", resizeHandler);

  return function cleanup() {
    if (masterTL) masterTL.kill();
    sandwichtl.kill();
    tl3.kill();
    window.removeEventListener("resize", resizeHandler);
    clearTimeout(resizeTimer);
    document.querySelector("#burger").innerHTML = "";
    document.querySelector("#sandwich").innerHTML = "";
    svg2.querySelectorAll(".path2pp").forEach(el => el.remove());
    [air, air2, air3].forEach(el => el.remove());
  };

}














/*  
const slideDiv2 = document.createElement("div");

slideDiv2.classList.add("slideDiv2");

for (let i = 0; i < 10; i++) {
  
  const para2 = document.createElement("p");

para2.textContent = "Frank";
if (i % 2 === 0) {
para2.style.color = "white";
  para2.style.background = "purple";
}
  else {
    para2.style.color = "orchid";
    para2.style.background = "black";
  }

  para2.classList.add("para");
  slideDiv2.append(para2);
  
}

box.append(slideDiv2);

const paraWidth2 = slideDiv2.firstElementChild.getBoundingClientRect().width;

let leftMan2 = 0;


function animatePara2() {
    leftMan2 -= 1;


  if (Math.abs(leftMan2) >=slideDiv2.firstElementChild.getBoundingClientRect().width) { 
    const first = slideDiv2.firstElementChild;
    const firstWidth = first.getBoundingClientRect().width;
     slideDiv2.append(first);
    leftMan2 +=firstWidth;
          
}
  
slideDiv2.style.left = `${leftMan2}px`;
  requestAnimationFrame(animatePara2)
  
}

animatePara2();  

*/
  

const newtl = gsap.timeline({
  repeat: -1,
  yoyo: true,
  paused: true 
});

newtl.to(".para", {
  stagger: 0.3,
  scale: 1.8,
  duration: 1
})





// all the glory of sliced shapes 



const triangleWedges = [];


function buildTriangle() {
const coverboxtriangle = document.querySelector(".coverboxone");
const triangleSvg = document.querySelector("#triangleSvg");
const ns = "http://www.w3.org/2000/svg";


const trivb = triangleSvg.viewBox.baseVal;

const mx = trivb.width/2;
const my = trivb.height/2;

const s = 160;
const h = Math.sqrt((s*s)-(s/2 * s/2));
let triTopPoint = my - h/3 * 1.7;
const splits = 8;
const cellSize = h/splits;
const bitSize = cellSize/1.05;
const io = (cellSize-bitSize)/2;


let splitStart;
let splitEnd;

for (let split = 0; split < splits; split++) {
if (split === 0) {
  splitStart = split * cellSize;
   splitEnd = split * cellSize + io + bitSize;
}
  else if (split === splits-1) {
   splitStart = split * cellSize + io;

 splitEnd = split * cellSize + io + bitSize;  
  }
else {  
 splitStart = split * cellSize + io;

 splitEnd = split * cellSize + io + bitSize;
}
      let ssd = splitStart + triTopPoint;
  let sed = splitEnd + triTopPoint;
let ssw = s * (splitStart/h);
let sew = s * (splitEnd/h);

let ssx1 = mx - ssw/2;
let ssx2 = mx + ssw/2;
let sex1 = mx - sew/2;
  let sex2 = mx + sew/2
    let ssy = splitStart;
  let sey = splitEnd;

 const tri = document.createElementNS(ns, "path");
tri.setAttribute("d", `
M ${ssx1} ${ssd}
L ${ssx2} ${ssd}
L ${sex2} ${sed}
L ${sex1} ${sed}
Z`);
  tri.setAttribute("stroke", "none");
  tri.setAttribute("stroke-width", 0.5);
  tri.setAttribute("fill", shapeColor);
  triangleWedges.push(tri);
  triangleSvg.append(tri);
}
}
buildTriangle();
  



const circleWedges = [];
function buildCircle() {
const coverboxball = document.querySelector(".coverboxball");
const ballSvg = document.querySelector("#ballSvg");
const ns = "http://www.w3.org/2000/svg";


const fvb = ballSvg.viewBox.baseVal;

const mx = fvb.width/2;
const my = fvb.height/2;


function giveX1(m1,m2,r,y) {
  const x = m1 + Math.sqrt(r * r - (y-m2) * (y-m2));
  return x;
}

function giveX2(m1,m2,r,y) {
  const x = m1 - Math.sqrt(r * r - (y-m2) * (y-m2));
  return x;
}



const r = 80;
const h = 2*r;
let topPoint = my - h/2;
const splits = 8;
const cellSize = h/splits;
const bitSize = cellSize/1.05;
const io = (cellSize-bitSize)/2;


let splitStart;
let splitEnd;



for (let split = 0; split < splits; split++) {
if (split === 0) {
  splitStart = split * cellSize;
   splitEnd = split * cellSize + io + bitSize;
}
  else if (split === splits-1) {
   splitStart = split * cellSize + io;

 splitEnd = split * cellSize + io + bitSize + io;  
  }
else {  
 splitStart = split * cellSize + io;

 splitEnd = split * cellSize + io + bitSize;
}
splitStart = splitStart + my - r; 
  splitEnd = splitEnd + my -r;
 const ssl = giveX1(mx, my, r, splitStart)
  const ssr = giveX2(mx, my, r, splitStart)
  
  const sel = giveX1(mx, my, r, splitEnd)
  const ser = giveX2(mx, my, r, splitEnd)

 const path = document.createElementNS(ns, "path");
  circleWedges.push(path);
  
path.setAttribute("d", `
M ${ssl} ${splitStart}
L ${ssr} ${splitStart}
A ${r} ${r} 0 0 0 ${ser} ${splitEnd}
L ${sel} ${splitEnd}
A ${r} ${r} 0 0 0 ${ssl} ${splitStart}
Z`);
  path.setAttribute("stroke", "none");
  path.setAttribute("stroke-width", 0.5);

  path.setAttribute("fill", shapeColor);
  ballSvg.append(path);
  path.setAttribute("stroke-linejoin", "round");
}
 
}
buildCircle();


const squareWedges = [];
function buildSquare() {
const coverboxsquare = document.querySelector(".coverbox");
const squareSvg = document.querySelector("#squareSvg");
const ns = "http://www.w3.org/2000/svg";


const fvb = squareSvg.viewBox.baseVal;

const mx = fvb.width/2;
const my = fvb.height/2;


function giveX1(m1,m2,r,y) {
  const x = m1 + Math.sqrt(r * r - (y-m2) * (y-m2));
  return x;
}

function giveX2(m1,m2,r,y) {
  const x = m1 - Math.sqrt(r * r - (y-m2) * (y-m2));
  return x;
}



const r = 80;
const h = 2*r;
const w = h;
let topPoint = my - h/2;
const splits = 8;
const cellSize = h/splits;
const bitSize = cellSize/1.05;
const io = (cellSize-bitSize)/2;


let splitStart;
let splitEnd;



for (let split = 0; split < splits; split++) {
if (split === 0) {
  splitStart = split * cellSize;
   splitEnd = split * cellSize + io + bitSize;
}
  else if (split === splits-1) {
   splitStart = split * cellSize + io;

 splitEnd = split * cellSize + io + bitSize + io;  
  }
else {  
 splitStart = split * cellSize + io;

 splitEnd = split * cellSize + io + bitSize;
}
splitStart = splitStart + my - r; 
  splitEnd = splitEnd + my -r;
 const ssl = mx - w/2;
  const ssr = mx + w/2;
  
  const sel = mx - w/2;
  const ser = mx + w/2;

 const path = document.createElementNS(ns, "path");

  
path.setAttribute("d", `
M ${ssl} ${splitStart}
L ${ssr} ${splitStart}
L ${ser} ${splitEnd}
L ${sel} ${splitEnd}
L ${ssl} ${splitStart}
Z`);
  path.setAttribute("stroke", "none");
  path.setAttribute("stroke-width", 0.5);
  path.setAttribute("fill", shapeColor);
    squareWedges.push(path);
  squareSvg.append(path);
}
}
  
  
  buildSquare();
  
  

/*const triTl = gsap.timeline({
  repeat: -1,
  yoyo: true,
});


const middle = (triangleWedges.length - 1) / 2;
const spacing = 100;

triTl.to(triangleWedges, {
  opacity: 0.25,
  stagger: 0.1,
  duration: 0.02,
  ease: "power2.inOut",
  stagger: 0.1
});
triTl.to(triangleWedges, {
  opacity: 0.1,
  stagger: 0.1,
  duration: 0.02,
  ease: "power2.inOut",
  stagger: 0.1
});
triTl.to(triangleWedges, {
  opacity: 0.0,
  stagger: 0.1,
  duration: 0.02,
  ease: "power2.inOut",
  stagger: 0.1,
  stroke: "black",
  strokeWidth: 1
});



const cirTl = gsap.timeline({
  repeat: -1,
  yoyo: true,
});

cirTl.to(circleWedges, {
})
*/




const introblocks = document.querySelectorAll(".introblock");


introblocks.forEach((introblock, index)=> {
let totalT = 5;
let word = "myMedia ";
for (let i = 0; i < totalT; i++) {
  const svg = document.createElementNS(ns, "svg");
  
svg.setAttribute("viewBox", "0 0 40 40");
  svg.setAttribute("width", 40);
  svg.setAttribute("height", 40);
  
  const path = document.createElementNS(ns, "path");
  path.setAttribute("d", "M 20 20 l -20 0 l 40 0");
  path.setAttribute("stroke-width", 4);
  path.setAttribute("stroke", "coral");
  path.setAttribute("opacity", "0.6")
  svg.append(path);
  
  
  const className = "smallBars" + (index+1);
  svg.classList.add(className)
  introblock.append(svg);
}
  });






const sctl = gsap.timeline({
  scrollTrigger: {
    trigger: ".forwork",
    toggleActions: "play none none none"
  }
})

sctl.from(".smallBars1", {
  opacity: 0,
  stagger: {
    from: "edges",
    each: 0.2
  }
})
sctl.from(".forwork", {
  y: 40,
  opacity: 0,
  duration: 2
},"<")

sctl.from(".pforwork", {
  y: 40,
  opacity: 0,
  duration: 2
}, "<0.4")

sctl.from(".listforwork li", {
  x: -40,
  stagger: 0.4,
  opacity: 0
},"<0.9")

gsap.from(".smallBars2", {
  opacity: 0,
  scrollTrigger: {
    trigger: ".smallBars2",
    start: "top 90%"
  },
  stagger: {
    from: "edges",
    each: 0.2
  }
})





const trianglep = SplitText.create(".trianglep",{})

const triangleh3 = SplitText.create(".triangleh3",{})

const circlep = SplitText.create(".circlep", {});

const circleh3 = SplitText.create(".circleh3",{})

const squarep = SplitText.create(".squarep", {});

const squareh3 = SplitText.create(".squareh3",{})


const h3Time = 0.1;


const triangleTl = gsap.timeline({
  scrollTrigger: {
 trigger: ".triangleblock",
    start: "top 68%",
    toggleActions: "play none none none"
}
})
triangleTl.from(trianglep.chars, {
  opacity: 0,
  duration: 0.1,
  stagger: {
    amount: 2.8
  }
})

triangleTl.from(triangleh3.chars, {
  opacity: 0,
  duration: 0.1,
  stagger: {
    each: h3Time,
    from: "end"
  }
},"<0.2")

triangleTl.from(triangleWedges, {
  opacity: 0,
  stagger: {
    from: "end",
    each: 0.22
  }
},"<0.4")



const circleTl = gsap.timeline({
  scrollTrigger: {
 trigger: ".circleblock",
    start: "top 90%",
    toggleActions: "play none none none"
}
})
circleTl.from(circlep.chars, {
  opacity: 0,
  duration: 0.1,
  stagger: {
    amount: 2.8
  }
})

circleTl.from(circleh3.chars, {
  opacity: 0,
  duration: 0.1,
  stagger: {
    each: h3Time,
    from: "end"
  }
},"<0.2")

circleTl.from(circleWedges, {
  opacity: 0,
  stagger: {
    from: "end",
    each: 0.22
  }
},"<0.4")





const squareTl = gsap.timeline({
  scrollTrigger: {
 trigger: ".squareblock",
    start: "top 90%",
    toggleActions: "play none none none"
}
})
squareTl.from(squarep.chars, {
  opacity: 0,
  duration: 0.1,
  stagger: {
    amount: 2.8
  }
})

squareTl.from(squareh3.chars, {
  opacity: 0,
  duration: 0.1,
  stagger: {
    each: 0.07,
    from: "end"
  }
},"<0.2")

squareTl.from(squareWedges, {
  opacity: 0,
  stagger: {
    from: "end",
    each: 0.22
  }
},"<0.4")













const svg1 = document.querySelector("#svg1");

/* const vb1 = svg1.viewBox.baseVal;

const vb1xm = vb1.width/2;
const vb1ym = vb1.height/2;

const vb1x = vb1.width/10;
const vb1y = vb1.height/10;

const rectW = 150;







function installGrid(rows, cols, padding, rowRatio, colRatio,strokeWidth, strokeColor, fillColor, classNumber) {
const allPadding = vb1.height/20 * padding;

const gridPaddingY = allPadding;
const gridPaddingX = allPadding;
const boxBaseHeight = vb1.height - gridPaddingY * 2;
const boxBaseWidth = vb1.width - gridPaddingX * 2;

const colSize = Math.floor(boxBaseWidth/cols);
const gridWidth = colSize * cols;
const gridOffsetX = (boxBaseWidth - gridWidth)/2 + ((vb1.width - boxBaseWidth) / 2);
const colBitSize = colSize / colRatio;
const cio = (colSize - colBitSize)/2;

const rowSize = Math.floor(boxBaseHeight/rows);
const gridHeight = rowSize * rows;

const gridOffsetY = (boxBaseHeight - gridHeight)/2 + ((vb1.height - boxBaseHeight) / 2);
const rowBitSize = rowSize / rowRatio;
const rio = (rowSize - rowBitSize) /2;


  
  
function drawGrid(fillColor, strokeColor, strokeWidth, classNumber) {
  for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    let y = row * rowSize + gridOffsetY + rio;
    let x = col * colSize + gridOffsetX + cio;
        let h = rowBitSize;
    let w = colBitSize;

    let baseClass = "cells"
    let className = baseClass + classNumber;
    
    const rect = document.createElementNS(ns, "rect");
    rect.setAttribute("x", `${x}`);
        rect.setAttribute("y", `${y}`);
        rect.setAttribute("width", `${w}`);
        rect.setAttribute("height", `${h}`);
        rect.setAttribute("stroke", "none");
 rect.setAttribute("stroke-width", 0.2);   rect.setAttribute("fill", `${fillColor}`);
    
 rect.classList.add(baseClass);   rect.classList.add(className);
    
    
    
    svg1.append(rect);
  }
  }
}

drawGrid(fillColor, strokeColor, strokeWidth,classNumber);
}

//installGrid(rows, cols, padding, rowRatio, colRatio,strokeWidth, strokeColor, fillColor, classNumber)
installGrid(4, 1, 2, 1.2, 1.2, 0, "none", "white", 1);
installGrid(1, 4, 2, 1.2, 1.2, 0, "none", "white", 2)
installGrid(1, 4, 2, 1.2, 1.2, 0, "none", "white", 3)








function drawHalfCircles(i, spread, offset) {
  let vary = vb1x/2 * (i * spread);
  let offsetY = vb1y * offset;

  function drawPath1() {
    
      const path = document.createElementNS(ns, "path");

    
path.setAttribute("d", `
M ${vb1xm - vary} ${vb1ym + offsetY}
A ${vary} ${vary} 0 0 0 ${vb1xm + vary} ${vb1ym + offsetY}`)
  path.setAttribute("stroke", "white");
  path.setAttribute("fill", "none");
    path.classList.add("bottoms");
svg1.append(path);
  }
  
    function drawPath2() {
      
       const path = document.createElementNS(ns, "path");
 
      
path.setAttribute("d", `
M ${vb1xm - vary} ${vb1ym - offsetY}
A ${vary} ${vary} 0 0 1 ${vb1xm + vary} ${vb1ym -offsetY}`)
  path.setAttribute("stroke", "white");
  path.setAttribute("fill", "none");
       path.classList.add("tops");
svg1.append(path);
  }
  drawPath1();
  drawPath2();
}


function makeHalfCircles(circles, spread, offset) {
for (let circle = 0; circle < circles; circle++) {
  drawHalfCircles(circle, spread, offset);
}
}
//makeHalfCircles(4, 1.2, 0);




function makeFullCircles(circles, startRadius, increment, strokeColor, fillColor, strokeWidth) {
  let baseR = startRadius * vb1y;
  let baseI = increment * vb1y;
 for (let circle = 0; circle < circles; circle++) {
   let cx = vb1xm;
   let cy = vb1ym;
   let r = baseR + (baseI * circle);
   drawFullCircle(r, cx, cy, fillColor, strokeColor, strokeWidth)
 } 
}

function drawFullCircle(r, cx, cy, fillColor, strokeColor, strokeWidth) {
const circle = document.createElementNS(ns, "circle");
  circle.setAttribute("cx", cx);
    circle.setAttribute("cy", cy);
  circle.setAttribute("r", r);
  circle.setAttribute("fill", `${fillColor}`);
  circle.setAttribute("stroke", `${strokeColor}`);
  circle.setAttribute("stroke-width", `${strokeWidth}`)
  svg1.append(circle);
}





// makeFullCircles(circles, startRadius, increment, strokeColor, fillColor) 
//makeFullCircles(4, 0.4, 0.6, "white", "none", 2);




const forestColors = ["forestgreen", "lawngreen", "#143", "teal", "#181", "#032"];
const beachColors = ["darkorchid", "lightcoral", "beige", "whitesmoke", "navajowhite", "coral", "indigo"];

const blueColors = ["#587B7F", "#E2FDFF", "#BFD7FF", "#9FCC2E"];





const myPeaks = [];




const tl = gsap.timeline({
  repeatDelay: 0.2,
  repeat: -1
});

tl.addLabel("point1", 0);
  tl.addLabel("point2", 1);
  tl.addLabel("point3", 2);
  tl.addLabel("point4", 3);
  tl.addLabel("point5", 4);
  tl.addLabel("point6", 5);
  tl.addLabel("point7", 6);
  tl.addLabel("point8", 7);
  tl.addLabel("point9", 8);
  tl.addLabel("point10", 9);
  tl.addLabel("point11", 10);
  tl.addLabel("point12", 11);
  tl.addLabel("point13", 12);
  tl.addLabel("point14", 13);



tl.set(".cells1", {
  transformOrigin: "center",
  opacity: 0
})
tl.set(".cells2", {
  transformOrigin: "center",
  opacity: 0
})
tl.set(".cells3", {
  transformOrigin: "center",
  opacity: 0
})
tl.set(".headline1, .headline2", {
  opacity: 0
})




tl.set(".cells2", {
y: -90
},"point1")

tl.set(".cells3", {
y: 90
},"point1")


tl.to(".cells2", {
  y: -100,
  duration: 0.8,
  stagger: {
  amount: 0.8},
  opacity: 0.6
},"point1")

tl.to(".cells3", {
  y: 100,
    duration: 0.8,
  stagger: {
  amount: 0.8},
  stagger: 0.2,
  opacity: 0.6
},"<")


tl.fromTo(".headline1",{
  x: -10,
}, {
  x: 0,
  duration: 2,
  opacity: 1,
  ease: "sine.out"
},"<")

tl.to(".cells2", {
  y: -110,
  duration: 0.8,
  stagger: {
  amount: 0.8},
  opacity: 0
},"point3")


tl.to(".cells3", {
  y: 110,
    duration: 0.8,
  stagger: {
  amount: 0.8},
  stagger: 0.2,
  opacity: 0
},"<")


tl.fromTo(".headline1",{
  x: 0,
}, {
  x: 20,
  duration: 2,
  opacity: 0,
  ease: "sine.out"
},"<")





tl.set(".cells2", {
y: -90
},"point5")
tl.set(".cells3", {
y: 90
},"point5")

tl.to(".cells2", {
  y: -100,
  duration: 0.8,
  stagger: {
  amount: 0.8},
  opacity: 0.6
},"point5")


tl.to(".cells3", {
  y: 100,
    duration: 0.8,
  stagger: {
  amount: 0.8},
  stagger: 0.2,
  opacity: 0.6
},"<")



tl.fromTo(".headline2",{
  x: -10,
}, {
  x: 0,
  duration: 2,
  opacity: 1,
  ease: "sine.out"
},"<")

tl.to(".cells2", {
  y: -110,
  duration: 0.8,
  stagger: {
  amount: 0.8},
  opacity: 0
},"point7")

tl.to(".cells3", {
  y: 110,
    duration: 0.8,
  stagger: {
  amount: 0.8},
  stagger: 0.2,
  opacity: 0
},"<")


tl.fromTo(".headline2",{
  x: 0,
}, {
  x: 20,
  duration: 2,
  opacity: 0,
  ease: "sine.out"
},"<")



*/


const svgBox = document.querySelector(".letsWorkSvg");

let ccc = 7;
let word = "myMedia ";
for (let i = 0; i < ccc; i++) {
  const svg = document.createElementNS(ns, "svg");
  
svg.setAttribute("viewBox", "0 0 40 40");
  svg.setAttribute("width", 40);
  svg.setAttribute("height", 40);
  
  const circle = document.createElementNS(ns, "circle");
  circle.setAttribute("cx", "20");
  circle.setAttribute("cy", "20");
  circle.setAttribute("r", "4");
  circle.setAttribute("stroke-width", 4);
  circle.setAttribute("stroke", "none");
  circle.setAttribute("fill", "white");
  circle.setAttribute("zIndex", 400);
  svg.classList.add("workBalls");
  svg.append(circle)
  svgBox.append(svg);

}





const letswork = SplitText.create(".letswork",{});

const letsworksub = SplitText.create(".letsworksub", {});
const rightnow = SplitText.create(".rightnow", {});



const letsTl = gsap.timeline({
  repeat: -1,
  scrollTrigger: {
    trigger: ".doit",
    start: "top 90%"
  }
})
letsTl.set(letsworksub.chars, {
  opacity: 0
})
letsTl.set(letswork.chars, {
  opacity: 0
})

letsTl.set(rightnow.chars, {
  opacity: 0
})

letsTl.set(".workBalls", {
  opacity: 0
})
letsTl.set(letswork.chars, 
{y: 0,
  opacity: 0.1,
  duration: 0.02,
    stagger: {
    amount: 0.7,
  }
})

letsTl.to({},{duration: 0.1})

letsTl.set(letswork.chars,{
  opacity: 0
})
letsTl.set(letswork.chars, {
  
  opacity: 0.3,
  duration: 0.8,
  stagger: {
    amount: 0.7,
  }
})
letsTl.to({},{duration: 0.1})

letsTl.set(letswork.chars, {
  opacity: 0});

letsTl.set(letswork.chars, {
  
  opacity: 0.5,
  duration: 0.8,
  stagger: {
    amount: 0.7,
  }
})

letsTl.set(letsworksub.chars, {
  
  opacity: 1,
  duration: 0.8,
  ease: "sine.out",
  stagger: {
    from: "end",
    amount: 2.2,
  }
},"0")

letsTl.to({},{duration: 2})

letsTl.set(letsworksub.chars, {
  
  opacity: 0,
  duration: 0.8,
   ease: "sine.out",
  stagger: {
    amount: 1.2,
  }
},">1")

letsTl.set(letswork.chars, {
  
  opacity: 0,
  duration: 0.8,
   ease: "sine.out",
  stagger: {
    amount: 1.2,
    from: "end"
  }
},"<")

letsTl.to({},{duration: 1})






const bottomfirst = SplitText.create(".bottomfirst",{});
const extrabar = SplitText.create(".extrabar", {});
const bottomsecond = SplitText.create(".bottomsecond", {});





const bottomTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".bottom",
    start: "top 90%"
  }
})

gsap.set(bottomfirst.chars, {
opacity: 0  
})
gsap.set(bottomsecond.chars, {
opacity: 0  
})

gsap.set(extrabar.chars, {
opacity: 0  
})

gsap.set(".barleft", {
opacity: 0  
})
gsap.set(".barright", {
opacity: 0  
})


bottomTl.set(bottomfirst.chars, {
opacity: 1,
  stagger: {
    amount: 2
  }
})

bottomTl.set(bottomsecond.chars, {
opacity: 1,
  stagger: {
    amount: 2,
    from: "end"
  }
},"<")

bottomTl.set(extrabar.chars, {
color: "firebrick",
  opacity: 1,
  stagger: {
    amount: 2,
    from: "center"
  }
},"<")

bottomTl.to(".barleft", {
opacity: 1,
  duration: 4
},"<")

bottomTl.to(".barright", {
opacity: 1,
  duration: 4
},"<")





const imprintlink1 = SplitText.create(".imprintlink1",{});
const imprintlink2 = SplitText.create(".imprintlink2", {});


const imprintTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".imprint",
    start: "top 90%"
  }
})

imprintTl.set(imprintlink1.chars, {
opacity: 0  
})
imprintTl.set(imprintlink2.chars, {
opacity: 0  
})

imprintTl.set(".imprintlink3", {
opacity: 0  
})

imprintTl.fromTo(imprintlink1.chars, {
y: 40,
  opacity: 0,
},
{
    duration: 2,
 y: 0,
  opacity: 1
}
)

imprintTl.fromTo(imprintlink2.chars, {
y: 40,
  opacity: 0
},
{
  duration: 2,
 y: 0,
  opacity: 1
}, "<0.8")

  imprintTl.fromTo(".imprintlink3, {
y: 40,
  opacity: 0
},
{
  duration: 2,
 y: 0,
  opacity: 1
}, "<0.8")










const formTl = gsap.timeline({
  scrollTrigger: {
    trigger: "form",
    start: "top 90%"
  }
})

gsap.set("label", {
opacity: 0  
})

gsap.set(".submitbutton", {
opacity: 0  
})
gsap.set("input", {
opacity: 0  
})
gsap.set("textarea", {
opacity: 0  
})

formTl.to("label", {
  opacity: 0.7,
  stagger: {
  amount: 1
  }
})



formTl.to(["input", "textarea"], {
  opacity: 0.7,
  stagger: {
    amount: 1,
    from: "end"
  }
})

formTl.to(".submitbutton", {
opacity: 1,
  duration: 2
})












function mobileStuff() {
const burger = document.querySelector("#burgerMobile");
let crosses = [];
let counter = 0;



const pairsMobile = [];
const hortsMobile = [];
const vertsMobile = [];

  
  
  
  
  
function drawLay(targetSelector, cinemaNumber, rowAmount, crossColor) {
  const target = document.querySelector(targetSelector);
  const rect = target.getBoundingClientRect();

  if (rect.width <= 0 || rect.height <= 0) return; 

  const rows = rowAmount;
  const cellSize = Math.floor(rect.height / rows);

  if (cellSize <= 0) return; // guard against runaway col 
  const gridHeight = cellSize * rows;
  const cols = Math.floor(rect.width / cellSize);
  const gridWidth = cols * cellSize;
  const offsetY = (rect.height - gridHeight) / 2;
  const offsetX = (rect.width - gridWidth) / 2;
  const bitSize = cellSize / 1.2;
  const io = (cellSize - bitSize) / 2;

  const crossHeight = bitSize / 12;
  const oTop = (bitSize - crossHeight) / 2;
  const crossWidth = crossHeight;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let y1 = row * cellSize + offsetY + io;
      let x1 = col * cellSize + offsetX + io + oTop;

      let pair = document.createElement("div");
      pair.style.position = "absolute";
      pair.style.left = `${col * cellSize + offsetX + io}px`;
      pair.style.top = `${row * cellSize + offsetY + io}px`;
      pair.style.width = `${bitSize}px`;
      pair.style.height = `${bitSize}px`;
      pair.style.transformOrigin = "50% 50%";
      pair.style.zIndex = "6";

      let br = document.createElement("div");
      br.style.background = crossColor ?? "white";
      br.style.position = "absolute";
      br.style.left = `${oTop}px`;
      br.style.top = `0px`;
      br.style.width = `${crossWidth}px`;
      br.style.height = `${bitSize}px`;
      const classCrossY = "crossy" + cinemaNumber;
      br.classList.add(classCrossY);
      br.dataset.row = row;
      br.dataset.col = col;

      let y2 = row * cellSize + offsetY + io + oTop;
      let x2 = col * cellSize + offsetX + io;

      let br2 = document.createElement("div");
      br2.style.background = crossColor ?? "white";
      br2.style.position = "absolute";
      br2.style.left = `0px`;
      br2.style.top = `${oTop}px`;
      br2.style.width = `${bitSize}px`;
      br2.style.height = `${crossWidth}px`;
      const classCrossX = "crossx" + cinemaNumber;
      br2.classList.add(classCrossX);
      br2.dataset.row = row;
      br2.dataset.col = col;

      crosses.push({
        crossNumber: counter,
        row: row,
        col: col,
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        crossWidth: crossWidth,
        bitSize: bitSize
      });

      pair.append(br, br2);
      const pairClassName = "pairs" + cinemaNumber;
      pair.classList.add(pairClassName);
      br.dataset.cross = counter;
      br2.dataset.cross = counter;
      pair.dataset.row = row;
      pair.dataset.col = col;
      pair.dataset.cross = counter;
      pairsMobile.push(pair);
      target.append(pair);

      if (col === 0) {
        let hort = document.createElement("div");
        hort.style.background = cinemaColor;
        hort.style.position = "absolute";
        hort.style.left = `${col * cellSize + offsetX + io}px`;
        hort.style.top = `${row * cellSize + offsetY + io}px`;
        hort.style.width = `${gridWidth - 2 * io}px`;
        hort.style.height = `${bitSize}px`;
        hort.style.zIndex = "4";
    
        const classHorts = "horts" + cinemaNumber;
        hort.classList.add(classHorts);
        target.append(hort);
        hortsMobile.push(hort);
      }

      if (row === 0) {
        let vert = document.createElement("div");
        vert.style.background = cinemaColor;
        vert.style.position = "absolute";
        vert.style.left = `${col * cellSize + offsetX + io}px`;
        vert.style.top = `${row * cellSize + offsetY + io}px`;
        vert.style.width = `${bitSize}px`;
        vert.style.height = `${gridHeight - 2 * io}px`;
        vert.style.zIndex = "2";
        const classVerts = "verts" + cinemaNumber;
        vert.classList.add(classVerts);
        target.append(vert);
        vertsMobile.push(vert);
      }

      counter++;
    }
  }
}


// function drawLay(targetSelector, cinemaNumber, rowAmount, crossColor);
drawLay("#burgerMobile", 100, 3);

  


const cd = 0.4;


const split = SplitText.create(".endtitleMobile", {
  
});


const moTl = gsap.timeline({
  repeat: -1
});

moTl.timeScale(1.25);
moTl.set(".horts100", {
  opacity: 0
});

moTl.set(".verts100", {
  opacity: 0
});

moTl.set(".maintextMobile", {
  opacity: 0
});
moTl.set(".endtextMobile", {
  opacity: 0
})
moTl.set(".pairs100", {
  opacity: 0,
});

moTl.fromTo(pairsMobile[1], {
  opacity: 0,
  scale: 0.2,
},
           {
  scale: 0.6,
  opacity: 1,
  duration: cd,
  stagger: {
    amount: 0.3
  }
});
moTl.fromTo(pairsMobile[10], {
  opacity: 0,
  scale: 0.2,
},
           {
  scale: 0.2,
  opacity: 1,
  duration: cd,
  stagger: {
    amount: 0.3
  }
},"<");

moTl.fromTo([pairsMobile[4],pairsMobile[7]],{
  opacity: 0,
  scale: 0.2,
},
           {
  scale: 0.4,
  opacity: 1,
  duration: cd,
  stagger: {
    amount: 0.24
  }
},"<");
moTl.fromTo([pairsMobile[3], pairsMobile[9]], {
  opacity: 0,
  scale: 0.2,
},
           {
  scale: 0.6,
  opacity: 1,
  duration: cd,
  stagger: {
    amount: 0.28
  }
},"<");






moTl.to({}, {duration: 0.3})
moTl.to(pairsMobile, {
  opacity: 0,
  duration: 0.2
});

moTl.fromTo(pairsMobile[0], {
  opacity: 0,
  scale: 0.2,
},
           {
  scale: 0.4,
  opacity: 1,
  duration: cd,
  stagger: {
    amount: 0.2
  }
});
moTl.fromTo(pairsMobile[2], {
  opacity: 0,
  scale: 0.2,
},
           {
  scale: 0.2,
  opacity: 1,
  duration: cd,
  stagger: {
    amount: 0.2
  }
},"<");

moTl.fromTo([pairsMobile[3],pairsMobile[6]],{
  opacity: 0,
  scale: 0.2,
},
           {
  scale: 0.4,
  opacity: 1,
  duration: cd,
  stagger: {
    amount: 0.3
  }
},"<");

moTl.fromTo([pairsMobile[5], pairsMobile[9]], {
  opacity: 0,
  scale: 0.2,
},
           {
  scale: 0.6,
  opacity: 1,
  duration: cd,
  stagger: {
    amount: 0.24
  }
},"<");

moTl.fromTo(pairsMobile[11], {
  opacity: 0,
  scale: 0.2,
},
           {
  scale: 0.3,
  opacity: 1,
  duration: cd,
  stagger: {
    amount: 0.4
  }
},"<");


moTl.to({}, {duration: 0.2})
moTl.to(pairsMobile, {
  opacity: 0,
  duration: 0.2
});
moTl.to({}, {duration: 0.1})
moTl.set(".maintextMobile",
           {
  scale: 1,
  opacity: 0.6,
  duration: 0.4,
  stagger: {
    amount: 0.3
  }
});

moTl.to(".maintextMobile",
           {
  scale: 1,
  opacity: 0,
  duration: 0.1,
  stagger: {
    amount: 0.3
  }
});
moTl.to({}, {duration: 0.1})

moTl.set(hortsMobile, {
  opacity: 0,
  scaleX: 0.9,
},"<")
moTl.to(vertsMobile, {
  duration: 0.6,
  opacity: 0.4,
  scale: 1,
  stagger: {
    from: "start",
    amount: 0.1
  }
});

moTl.to(vertsMobile, {
  transformOrigin: "50% 50%",
  duration: 0.4,
  opacity: 0,
  stagger: {
    from: "start",
    amount: 0.2
  }
});

moTl.to({}, {duration: 0.05})
moTl.to(hortsMobile, {
  duration: 0.6,
  opacity: 0.4,
  scaleX: 1,
  stagger: {
    from: "start",
    amount: 0.01
  }
});

moTl.to(hortsMobile, {
  opacity: 0,
  duration: 0.4,
  stagger: {
    from: "start",
    amount: 0.2
  }
});

moTl.to({}, {duration: 0.1});

moTl.set(".maintextMobile",
           {
  scale: 1,
  opacity: 0.6,
  duration: 0.4,
  stagger: {
    amount: 0.3,
    from: "end"
  }
});

moTl.to(".maintextMobile",
           {
  scale: 1,
  opacity: 0,
  duration: 0.1,
  stagger: {
    amount: 0.3,
    from: "end"
  }
});
moTl.to({}, {duration: 0.1});




moTl.set(vertsMobile, {
   y: i=>i%2===0 ? 20 : -20,
  opacity: 0,
  scaleY: 1
});

moTl.to(vertsMobile, {
  duration: 0.6,
  y: 0,
  opacity: 0.4,
  ease: "sine.out",
    stagger: {
    from: "start",
    amount: 0.1
  }
});

moTl.to(vertsMobile, {
  duration: 0.4,
  opacity: 0,
  scaleX: 1.2,
    ease: "sine.in",
  stagger: {
    from: "start",
    amount: 0.2
  }
});
moTl.to({}, {duration: 0.1});



moTl.to(vertsMobile, {
  duration: 0.6,
  scaleX: 1,
  background: cinemaColor,
  y: 0,
  ease: "sine.out",
  opacity: 0.4,
});
moTl.to({}, {duration: 0.2})

moTl.to(vertsMobile, {
     y: i=>i%2===0 ? 20 : -20,
  duration: 0.6,
    ease: "sine.out",
  opacity: 0
});



moTl.to({}, {duration: 0.1})
moTl.set(".maintextMobile",
           {
  scale: 1,
  opacity: 0.6,
  duration: 0.4,
  stagger: {
    amount: 0.3
  }
});

moTl.to(".maintextMobile",
           {
  scale: 1,
  opacity: 0,
  color: 	cinemaColor,
  duration: 0.1,
  stagger: {
    amount: 0.3
  }
});

moTl.to(".maintextMobile",
           {
  scale: 1,
  opacity: 0.0,
  duration: 0.05,
});

moTl.to({}, {duration: 0.1})


moTl.to(".endtextMobile", {
  duration: 4.8,
  opacity: 1,
})
  
  
  
  
  moTl.fromTo([pairsMobile[1], pairsMobile[2], pairsMobile[8], pairsMobile[10]], {
  opacity: 0,
  scale: 0.2,
},
           {
  scale: 0.4,
  opacity: 1,
  duration: 0.2,
  stagger: {
    amount: 1.8
  }
   ,
},"<0.8");
  
   moTl.to([pairsMobile[1], pairsMobile[2], pairsMobile[8], pairsMobile[10]],
           {
  opacity: 0,
  duration: 0.2,
  stagger: {
    amount: 0.2,
    from: "end"
  }
   ,
},">0.2");
  
  
    moTl.fromTo([pairsMobile[2], pairsMobile[3], pairsMobile[8], pairsMobile[11]], {
  opacity: 0,
  scale: 0.2,
},
           {
  scale: 0.4,
  opacity: 1,
  duration: cd,
  stagger: {
    amount: 1.8
  }
   ,
});
  moTl.to([pairsMobile[2], pairsMobile[3], pairsMobile[8], pairsMobile[11]],
           {
  opacity: 0,
  duration: 0.2,
  stagger: {
    amount: 0.2,
    from: "end"
  }
   ,
},">0.2");

  
  
/* moTl.to({}, {duration: 3}) */
/*moTl.to(".endtext", {
  opacity: 0.2,
  duration: 0.1,
})
*/
moTl.to({}, {duration: 0.5})
moTl.set(".endtextMobile", {
  opacity: 1,
})
moTl.to({}, {duration: .6})


moTl.to(".endtextMobile", {
  opacity: 0,
  duration: 0.4
})
moTl.to({}, {duration: 0.2})
  
    return function cleanup() {
    moTl.kill();
    burger.innerHTML = "";
  };

}

const mq = window.matchMedia("(max-width: 600px)");
let activeCleanup = null;

function handleBreakpointChange(e) {
  if (activeCleanup) {
    activeCleanup();
    activeCleanup = null;
  }

  if (e.matches) {
    activeCleanup = mobileStuff();
  } else {
    activeCleanup = desktopStuff();
  }
}

handleBreakpointChange(mq);
mq.addEventListener("change", handleBreakpointChange);



const contactForm = document.querySelector(".contact-form");

const inputs = contactForm.querySelectorAll("input");



contactForm.addEventListener("submit", (e)=> {
  e.preventDefault();
  console.log("feuert nur wenn alles ausgefüllt ist")
})



function createLogo() {
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
  
    balloons.forEach(balloon=> {
    balloon.classList.add("balloons")
  });
  
  
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
  
}


createLogo();







  window.formspree = window.formspree || function () {
    (formspree.q = formspree.q || []).push(arguments);
  };
  formspree('initForm', {
    formElement: '#contact-form',
    formId: 'mrpgewkr',
    onSuccess: function () {
      document.getElementById('contact-form').style.display = 'none';
      document.getElementById('form-success').style.display = 'block';
 
    }
  });





gsap.set(".balloons", {
  opacity: 0
})

gsap.to(".balloons", {
  opacity: 0.6,
  duration: 4
})
