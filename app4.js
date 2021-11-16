const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const paintRange = document.getElementById("jsPaintRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const resetBtn = document.getElementById("jsReset");

canvas.width = 600;
canvas.height = 600;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, 600, 600);
ctx.strokeStyle = "#2c2c2c";
ctx.fillStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handlePaintRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeCilck() {
    if(filling) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasCilck() {
    if(filling) {
        ctx.fillRect(0, 0, 600, 600);
    }
}

function handleSaveCilck() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "🤡";
    link.click();
}

function handleCM(event) {
    event.preventDefault();
}

function handleResetClick() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 600, 600);
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasCilck);
    canvas.addEventListener("contextmenu", handleCM);
}

if(paintRange) {
    paintRange.addEventListener("input", handlePaintRangeChange);
}

if(mode) {
    mode.addEventListener("click", handleModeCilck);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveCilck);
}

if(resetBtn) {
    resetBtn.addEventListener("click", handleResetClick);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));