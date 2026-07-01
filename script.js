const canvas = document.getElementById('techCanvas');

if (canvas) {
  const c = canvas.getContext('2d');
  const postCanvas = document.createElement('canvas');
  postCanvas.className = 'techCanvasPost';
  document.body.appendChild(postCanvas);
  const postctx = postCanvas.getContext('2d');

  const vertices = [];
  const vertexCount = 6400;
  const vertexSize = 3;
  const oceanWidth = 204;
  const oceanHeight = -72;
  const gridSize = 34;
  const waveSize = 16;
  const perspective = 110;
  const depth = (vertexCount / oceanWidth) * gridSize;
  let frame = 0;
  let oldTimeStamp = performance.now();
  let rad = 0;
  let rad2 = 0;

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    postCanvas.width = window.innerWidth;
    postCanvas.height = window.innerHeight;
  };

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const loop = (timeStamp) => {
    const dt = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;
    frame += dt * 55;
    rad = Math.sin(frame / 100) * Math.PI / 20;
    rad2 = Math.sin(frame / 50) * Math.PI / 10;

    c.fillStyle = 'hsl(200deg, 100%, 2%)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.save();
    c.translate(canvas.width / 2, canvas.height / 2);

    vertices.forEach((vertex, i) => {
      let x = vertex[0] - frame % (gridSize * 2);
      let z = vertex[2] - frame * 2 % gridSize + (i % 2 === 0 ? gridSize / 2 : 0);
      const wave = (
        Math.cos(frame / 45 + x / 50) -
        Math.sin(frame / 20 + z / 50) +
        Math.sin(frame / 30 + z * x / 10000)
      );
      let y = vertex[1] + wave * waveSize;
      let a = Math.max(0, 1 - (Math.sqrt(x ** 2 + z ** 2)) / depth);
      let tx;
      let ty;
      let tz;

      y -= oceanHeight;

      tx = x;
      ty = y;
      tz = z;

      tx = x * Math.cos(rad) + z * Math.sin(rad);
      tz = -x * Math.sin(rad) + z * Math.cos(rad);
      x = tx;
      y = ty;
      z = tz;

      tx = x * Math.cos(rad) - y * Math.sin(rad);
      ty = x * Math.sin(rad) + y * Math.cos(rad);
      x = tx;
      y = ty;
      z = tz;

      ty = y * Math.cos(rad2) - z * Math.sin(rad2);
      tz = y * Math.sin(rad2) + z * Math.cos(rad2);
      x = tx;
      y = ty;
      z = tz;

      x /= z / perspective;
      y /= z / perspective;

      if (a < 0.01 || z < 0) return;

      c.globalAlpha = a;
      c.fillStyle = `hsl(${180 + wave * 20}deg, 100%, 56%)`;
      c.fillRect(x - a * vertexSize / 2, y - a * vertexSize / 2, a * vertexSize, a * vertexSize);
    });

    c.restore();
    c.globalAlpha = 1;

    postctx.clearRect(0, 0, postCanvas.width, postCanvas.height);
    postctx.drawImage(canvas, 0, 0);
    postctx.globalCompositeOperation = 'screen';
    postctx.filter = 'blur(16px)';
    postctx.drawImage(canvas, 0, 0);
    postctx.filter = 'blur(0px)';
    postctx.globalCompositeOperation = 'source-over';

    requestAnimationFrame(loop);
  };

  for (let i = 0; i < vertexCount; i++) {
    const x = i % oceanWidth;
    const y = 0;
    const z = i / oceanWidth >> 0;
    const offset = oceanWidth / 2;
    vertices.push([(-offset + x) * gridSize, y * gridSize, z * gridSize]);
  }

  loop(performance.now());
}

const proyectos = [
  {
    id: 'Siguiente Uno',
    nombre: 'E-FORM',
    descripcion: 'E-FORM: Plataforma digital que permite gestionar inventarios y registrar información de manera organizada, automatizando procesos para mejorar el control y la eficiencia de las operaciones.',
    url: 'siguinete_uno.html',
    icon: '<img src="logo eform.png" alt="Logo E-FORM" class="project-icon-image">'
  },
  {
    id: 'Siguiente Dos',
    nombre: 'Dent visión',
    descripcion: 'Plataforma web para digitalizar y optimizar la gestión integral de clínicas dentales: citas, historiales clínicos, usuarios y servicios odontológicos con seguridad y eficiencia.',
    url: 'siguiente_tres.html',
    icon: '<img src="logo dentvision.png" alt="Logo DentVision" class="project-icon-image">'
  },
  {
    id: 'Siguiente Tres',
    nombre: 'Datastock',
    descripcion: 'Datastock impulsa decisiones estratégicas mediante análisis avanzado y visualización de datos, integrando inteligencia y soluciones operativas para resultados empresariales.',
    url: 'siguiente_dos.html',
    icon: '<img src="logo de data stock.png" alt="Logo Datastock" class="project-icon-image">'
  }
];

const lista = document.getElementById('projectList');

const renderProjects = (items) => {
  if (!lista) return;
  lista.innerHTML = '';
  items.forEach(proyecto => {
    const card = document.createElement('article');
    card.className = 'project-card';

    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'project-icon';
    iconWrapper.innerHTML = proyecto.icon;

    const number = document.createElement('div');
    number.className = 'project-number';
    number.textContent = proyecto.id;

    const title = document.createElement('h3');
    title.className = 'project-title';
    title.textContent = proyecto.nombre;

    const description = document.createElement('p');
    description.className = 'project-description';
    description.textContent = proyecto.descripcion;

    const button = document.createElement('a');
    button.className = 'project-button';
    button.href = proyecto.url;
    button.textContent = 'ENTRA';

    card.appendChild(iconWrapper);
    card.appendChild(number);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(button);
    lista.appendChild(card);
  });
};

renderProjects(proyectos);
