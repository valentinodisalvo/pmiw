

// Arreglos
let framesReposo = [];  
let framesCaminar = []; 
let framesFuego = [];   

// Variables para imágenes estáticas
let imgLogo;            
let imgPiso;            
let imgFondo;           

// Máquina de estados
let estadoActual = 0;   

// Variables para el control de animación y tiempo de Kratos
let frameActual = 0;    
let tiempoAnterior = 0;   

let frameFuego = 0;

// Variables de posición del personaje
let posX = 100;          
let posY = 430;         

// Variables para la animación del logo
let logoY = -150;        
let velocidadLogo = 3;   

function preload() {
  // Carga de imágenes
  imgLogo = loadImage('data/logo.png');
  imgPiso = loadImage('data/piso.png');
  imgFondo = loadImage('data/fondo.png'); 

  // Uso de ciclos for 
  for (let i = 0; i < 4; i++) {
    framesReposo.push(loadImage('data/reposo_' + i + '.png'));
    framesCaminar.push(loadImage('data/caminar_' + i + '.png'));
    framesFuego.push(loadImage('data/fuego_' + i + '.png'));
  }
}

function setup() {
  createCanvas(800, 600);
  imageMode(CENTER);
}

function draw() {
  // CAPAS DEL ESCENARIO 
 

  // EL FONDO (
  if (imgFondo) {
    image(imgFondo, width / 2, height / 2, width, height);
  } else {
    background(30, 35, 45);
  }

  // EL FUEGO
  if (frameCount % 6 === 0) { 
    frameFuego = frameFuego + 1;
    if (frameFuego >= framesFuego.length) {
      frameFuego = 0; 
    }
  }
  
  for (let i = 100; i < width + 100; i = i + 200) {
    image(framesFuego[frameFuego], i, 385, 120, 150); 
  }

  //EL PISO 
  if (imgPiso) {
    image(imgPiso, 415, 500, 830, 200); 
  }

  // ==========================================

  // EL LOGO
  if (imgLogo) {
    if (logoY < 140) {
      logoY = logoY + velocidadLogo; 
    }
    
    image(imgLogo, width / 2, logoY, 360, 125);
  }


  if (estadoActual === 0 && logoY >= 140) {
    cambiarEstado(1);
  }

  // MÁQUINA DE ESTADOS PERSONAJE 
  if (estadoActual === 0) {
    
    // Reposo
    animarPersonaje(framesReposo, posX, posY, 250);
    
  } else if (estadoActual === 1) {
    
    // Caminar
    animarPersonaje(framesCaminar, posX, posY, 120);
    
    // Movimiento
    posX = posX + 4; 
    
  
    if (posX > width + 50) { 
      posX = -50; 
    }
  }

}

// --- FUNCIONES PROPIAS ---

function animarPersonaje(arregloFrames, x, y, velocidadMs) {
  let pasarDeFrame = chequearTiempo(velocidadMs);
  
  if (pasarDeFrame === true) {
    frameActual = frameActual + 1; 
    
    if (frameActual >= arregloFrames.length) {
      frameActual = 0; 
    }
  }
  
  image(arregloFrames[frameActual], x, y);
}

function chequearTiempo(intervalo) {
  if (millis() - tiempoAnterior >= intervalo) {
    tiempoAnterior = millis(); 
    return true; 
  } else {
    return false; 
  }
}

function cambiarEstado(nuevoEstado) {
  estadoActual = nuevoEstado;
  frameActual = 0; 
}


//TECLADO 

function keyPressed() {
  if (key === '1') {
    cambiarEstado(0); 
  } else if (key === '2') {
    cambiarEstado(1); 
  } else if (key === 'r' || key === 'R') {                                     
    cambiarEstado(0); 
    posX = 100;       
    logoY = -150;     
  }
}
