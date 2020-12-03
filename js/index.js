const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext("2d");

let rows = 1;
let elementsInRow = 1;

let posX = 0;
let posY = 0;
let sizeX = 240;
let sizeY = 240;
let color = 120;
let rise = true;
let iteration = 240;

corridorsArr = [];

function Corridor(posX, posY) {
    this.posX = posX;
    this.posY = posY;

    this.draw = function() {
        context.fillStyle = `rgba(1, ${color}, 1)`;
        context.fillRect(this.posX, this.posY, sizeX, sizeY);
    }
}

function controller() {

    requestAnimationFrame(controller);

        if(iteration > 240 && rise) {
            rise = false;
            iteration = 0;
        } 
        if(iteration > 240 && !rise) {
            rise = true;
            iteration = 0;
        }
    
        if(rise) {
            color += 1;
            sizeX += 1;
            sizeY += 1;
            for(let i = 0; i < corridorsArr.length; i++) {
                corridorsArr[i].posX -= 0.5;
                corridorsArr[i].posY -= 0.5;
            }
        } else {
            color -= 1;
            sizeX -= 1;
            sizeY -= 1;
            for(let i = 0; i < corridorsArr.length; i++) {
                corridorsArr[i].posX += 0.5;
                corridorsArr[i].posY += 0.5;
            }
        }

        iteration += 1;

        for(let i = 0; i < corridorsArr.length; i++) {
            corridorsArr[i].draw();
        }
}

function genManager(rowsAmount, rowElementsAmount) {
    Xpos = 0;
    Ypos = 0;
    for(let i = 0; i < rowsAmount; i++) {
        genRow(Xpos, Ypos, rowElementsAmount)
        Ypos += 200;
    }

}

function genRow(Xpos, Ypos, rowElementsAmount) {
    for(let i = 0; i < rowElementsAmount ; i++) {
        corridorsArr.push(new Corridor(Xpos, Ypos));
        Xpos += 200;
    }
}

genManager(rows, elementsInRow);

controller();