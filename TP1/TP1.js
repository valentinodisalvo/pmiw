// --- VARIABLES GLOBALES ---

// Arreglos (arrays) para almacenar los frames
let framesReposo = [];  
let framesCaminar = []; 
let framesFuego = [];   

// Variables para imágenes estáticas
let imgLogo;            
let imgPiso;            
let imgFondo;           

// Máquina de estados: 0 = Reposo, 1 = Caminar
let estadoActual = 0;   

// Variables para el control de animación y tiempo de Kratos
let frameActual = 0;    
let tiempoAnterior = 0;   

// Variable para el control del frame del fuego
let frameFuego = 0;

// Variables de posición del personaje
let posX = 400;         
let posY = 430;         

function preload() {
  // Carga de imágenes estáticas
  imgLogo = loadImage('data/logo.png');
  imgPiso = loadImage('data/piso.png');
  imgFondo = loadImage('data/fondo.png'); 

  // Uso de ciclos for para construir los arrays de frames
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
  // ==========================================
  // CAPAS DEL ESCENARIO (De atrás hacia adelante)
  // ==========================================

  // 1. DIBUJAR EL FONDO (Capa más lejana)
  if (imgFondo) {
    image(imgFondo, width / 2, height / 2, width, height);
  } else {
    background(30, 35, 45);
  }

  // 2. DIBUJAR EL FUEGO (Capa intermedia-trasera)
  if (frameCount % 6 === 0) { 
    frameFuego = frameFuego + 1;
    if (frameFuego >= framesFuego.length) {
      frameFuego = 0; 
    }
  }
  
  for (let i = 100; i < width + 100; i = i + 200) {
    // MODIFICADO: Subimos más el fuego (Y=385)
    image(framesFuego[frameFuego], i, 385, 120, 150); 
  }

  // 3. DIBUJAR EL PISO (Capa intermedia-frontal)
  if (imgPiso) {
    // MODIFICADO: Piso más a la derecha (X=415) y más ancho (830) para evitar bordes vacíos
    image(imgPiso, 415, 500, 830, 200); 
  }

  // ==========================================

  // 4. DIBUJAR EL LOGO
  if (imgLogo) {
    // MODIFICADO: Logo más abajo (Y=140) y más grande (360x125)
    image(imgLogo, width / 2, 140, 360, 125);
  }

  // 5. --- MÁQUINA DE ESTADOS PERSONAJE (Capa frontal) ---
  if (estadoActual === 0) {
    
    // Reposo
    animarPersonaje(framesReposo, posX, posY, 250);
    
  } else if (estadoActual === 1) {
    
    // Caminar
    animarPersonaje(framesCaminar, posX, posY, 120);
    
    // Movimiento
    posX = posX + 4; 
    
    // Si sale de la pantalla, vuelve por la izquierda
    if (posX > width + 50) { 
      posX = -50; 
    }
  }

  // Textos en pantalla (Interfaz, siempre último)
  fill(255);
  textSize(14);
  text("Controles: '1' Reposo | '2' Caminar | 'R' Reiniciar", 20, 30);
}

// ==========================================
// --- FUNCIONES PROPIAS ---
// ==========================================

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

// ==========================================
// --- EVENTOS DE TECLADO ---
// ==========================================
function keyPressed() {
  if (key === '1') {
    cambiarEstado(0); 
  } else if (key === '2') {
    cambiarEstado(1); 
  } else if (key === 'r' || key === 'R') {
    cambiarEstado(0); 
    posX = 400; 
  }
}
