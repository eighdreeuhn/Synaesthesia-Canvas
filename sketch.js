const tone = require('tone')
const waveMenu = document.getElementById('waveforms')
const brushes = document.getElementById('brushes')
const note = new tone.OmniOscillator(440, waveMenu.value).toDestination()

function setup() {
    createCanvas(1000, 1000)
    background(10)
    strokeWeight(1)
    stroke(0)
    tone.start()
    note.start()
    // tone.Transport.start()
}

let time = 0

function handleWaveform(e) {
    console.log(waveMenu.value)
    note.type = waveMenu.value
}

function draw() {
    time = (time + 1) % 255
    if (mouseIsPressed && mouseX >= 0 && mouseY >= 0 && mouseX <= 1000 && mouseY <= 1000) {
        note.start()
        note.volume.value = 6
        note.frequency.value = Math.max((mouseX + mouseY)/4, 0) + 150
        fill(Math.max(255 - time), Math.floor(mouseX*255/1000), Math.floor(mouseY*255/1000))
        switch (brushes.value) {
            case 'triangle':
                triangle(mouseX, mouseY - time / 4, mouseX - time / 4, mouseY, mouseX + time / 4, mouseY)
                break
            case 'circle':
                circle(mouseX, mouseY, mouseX*Math.max(time, 255 - time)/1000)
                break
            case 'ellipse':
                ellipse(mouseX, mouseY, mouseX*Math.max(time, 255 - time)/1000, mouseY*Math.max(time, 255 - time)/1000)
                break
            case 'square':
                square(mouseX, mouseY, mouseX*Math.max(time, 255 - time)/1000)
                break
        }
    } else {
        note.stop()
        fill(110);
    }
}
