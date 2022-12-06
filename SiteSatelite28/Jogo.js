const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')
const scoreEl = document.querySelector('#scoreEl')
const startgameBtn = document.querySelector('#startgameBtn')
const modalEl = document.querySelector('#modalEl')
const bigScoreEl = document.querySelector('#bigScoreEl')

canvas.width = innerWidth
canvas.height = innerHeight

var ctx = canvas.getContext("2d");

class Jogador {
    constructor(x, y, radius, color) {
        var decimal = Math.random()
        this.x = x
        x = decimal * canvas.width;
        this.y = y
        this.radius = radius
        this.color = color
    }
    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }
}


class Projetil { 
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }
    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }
    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

class Asteroides {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }
    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }

    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}


class Especial {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }
    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }

    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

const friction = 0.99
class Particula {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
        this.alpha = 1
    }
    draw() {
        c.save()
        c.globalAlpha = this.alpha
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.restore()
    }

    update() {
        this.draw()
        this.velocity.x *= friction
        this.velocity.y *= friction
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
        this.alpha -= 0.01
    }
}

function novo_circulo() {

    //Especial explodindo

    c.strokeStyle = 'red';
    c.lineWidth = 6;

    var startTime = 0;
    var animationTime = 5; // segundos
    var fn = function (time) {
        if (startTime) {
            var t = (time - startTime) / 100;
            if (t > animationTime) {
                t = animationTime;
            }
            var i = canvas.height / 2 * t / animationTime;
            c.beginPath();
            c.arc(canvas.width / 2, canvas.height / 2, i, 0, 2 * Math.PI);

            //explosao qnd os tiros batem no inimigo
            inimigos.forEach((asteroides, index) => {
                const dist = Math.hypot(c.x - asteroides.x, c.y - asteroides.y)
                if (dist - asteroides.radius - c.radius < 1) {
                    for (let i = 0; i < c.radius * 2; i++) {
                        Particula.push(new Particula(c.x, c.y, Math.random() * 2, asteroides.color, {
                            x: (Math.random() - 0.5) * (Math.random() * 6),
                            y: (Math.random() - 0.5) * (Math.random() * 6),
                        }))
                    }
                }
                setTimeout(() => {
                    inimigos.splice(index, 1)
                    projetil.splice(projetilIndex, 1)
                }, 0)
            })
            c.fill();
            c.stroke();
            //-----------------------
            if (t < animationTime) {
                requestAnimationFrame(fn);
            }
        } else { //start
            startTime = time;
            requestAnimationFrame(fn);
        }
    };
    requestAnimationFrame(fn);
}



const x = canvas.width / 2
const y = canvas.height / 2

let jogador = new Jogador(x, y, 20, '#c1c1c1')
let projeteis = []
let inimigos = []
let especiais = []
let particulas = []

function init() {
    jogador = new Jogador(x, y, 20, '#c1c1c1')
    projetil = []
    inimigos = []
    especiais = []
    particulas = []
    score = 0
    scoreEl.innerHTML = score
    bigScoreEl.innerHTML = score
}

function spawInimigos() {
    setInterval(() => {
        const radius = Math.random() * (30 - 4) + 4

        let x
        let y

        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
            y = Math.random() * canvas.height
        } else {
            x = Math.random() * canvas.width
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
        }
        const color = '#red'
        const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x)
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }

        inimigos.push(new Asteroides(x, y, radius, color, velocity));
    }, 1000)
    

}

function spawEspecias() {
    setInterval(() => {
        const radius = Math.random() * (30 - 4) + 4

        let x
        let y

        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
            y = Math.random() * canvas.height
        } else {
            x = Math.random() * canvas.width
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
        }
        var color = 'rgba(255,255,0, 0.6)'
        const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x)
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }

        especiais.push(new Especial(x, y, radius, color, velocity));
    }, 30000)
}

let animationId
let score = 0

function animate() {
    animationId = requestAnimationFrame(animate)
    stars = 200;

    c.fillStyle = 'rgba(0, 0, 0, 0.2)' //cor background -> 0.1 é a "sombra do tiro"
    c.fillRect(0, 0, canvas.width, canvas.height)
    jogador.draw()
    particulas.forEach((particula, index) => {
        if (particula.alpha <= 0) {
            particulas.splice(index, 1)
        } else {
            particula.update()
        }

    })
    projeteis.forEach((projetil, index) => {
        projetil.update()

        //remove o projetil do canto da tela
        if (projetil.x + projetil.radius < 0 || projetil.x - projetil.radius > canvas.width || projetil.y + projetil.radius < 0 || projetil.y - projetil.radius > canvas.height) {
            setTimeout(() => {
                projeteis.splice(index, 1)
            }, 0)
        }
    })

    inimigos.forEach((asteroides, index) => {
        asteroides.update()

        const dist = Math.hypot(jogador.x - asteroides.x, jogador.y - asteroides.y)

        //Fim do jogo 
        if (dist - asteroides.radius - jogador.radius < 1) {
            cancelAnimationFrame(animationId)
            modalEl.style.display = 'flex'
            bigScoreEl.innerHTML = score
        }

        projeteis.forEach((projetil, projetilIndex) => {
            const dist = Math.hypot(projetil.x - asteroides.x, projetil.y - asteroides.y)

            //tiro acerta o inimigo 
            if (dist - asteroides.radius - projetil.radius < 10) {

                //explosões
                for (let i = 0; i < asteroides.radius * 2; i++) {
                    particulas.push(new Particula(projetil.x, projetil.y, Math.random() * 2, asteroides.color, {
                        x: (Math.random() - 0.5) * (Math.random() * 6),
                        y: (Math.random() - 0.5) * (Math.random() * 6),
                    }))
                }
                if (asteroides.radius - 10 > 5) {

                    //pontuar
                    score += 100
                    scoreEl.innerHTML = score / 10

                    gsap.to(asteroides, {
                        radius: asteroides.radius - 10
                    })
                    setTimeout(() => {
                        projeteis.splice(projetilIndex, 1)
                    }, 0)
                } else {
                    //pontua quando mata
                    score += 25
                    scoreEl.innerHTML = score / 10
                    setTimeout(() => {
                        inimigos.splice(index, 1)
                        projeteis.splice(projetilIndex, 1)
                    }, 0)
                }
            }
        })
    })
    //----------------------------------------------
    especiais.forEach((especial, index) => {
        especial.update()

        const dist = Math.hypot(jogador.x - especial.x, jogador.y - especial.y)

        //Quando o especial toca no jogador
        if (dist - especial.radius - jogador.radius < 1) {
            setTimeout(() => {
                especiais.splice(index, 1)
            }, 0)
            novo_circulo();
        }

        projeteis.forEach((projetil, projetilIndex) => {
            const dist = Math.hypot(projetil.x - especial.x, projetil.y - especial.y)

            //quando os projeteis tocam no especial 
            if (dist - especial.radius - projetil.radius < 1) {

                //explosões
                for (let i = 0; i < especial.radius * 2; i++) {
                    particulas.push(new Particula(projetil.x, projetil.y, Math.random() * 2, especial.color, {
                        x: (Math.random() - 0.5) * (Math.random() * 6),
                        y: (Math.random() - 0.5) * (Math.random() * 6),
                    }))
                }
                if (especial.radius - 10 > 5) {

                    //pontuando
                    score += 10
                    scoreEl.innerHTML = score / 10

                    gsap.to(especial, {
                        radius: especial.radius - 10
                    })
                    setTimeout(() => {
                        projeteis.splice(projetilIndex, 1)
                    }, 0)
                } else {
                    //pontua qnd mata
                    score += 25
                    scoreEl.innerHTML = score / 10
                    setTimeout(() => {
                        especiais.splice(index, 1)
                        projeteis.splice(projetilIndex, 1)
                    }, 0)
                }
            }
        })

    })
}

addEventListener('click', (event) => {
    const angle = Math.atan2(event.clientY - canvas.height / 2, event.clientX - canvas.width / 2)
    const velocity = {
        x: Math.cos(angle) * 5,
        y: Math.sin(angle) * 5
    }
    projeteis.push(new Projetil(canvas.width / 2, canvas.height / 2, 5, 'red', velocity))
})

startgameBtn.addEventListener('click', () => {
    init()
    animate()
    spawInimigos()
    spawEspecias()
    modalEl.style.display = 'none'

})