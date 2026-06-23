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
    descripcion: 'Sistema de diagnóstico y análisis odontológico con visión avanzada e inteligencia.',
    url: 'siguiente_tres.html',
    icon: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32 12C24 20 18 20 18 34C18 46 26 54 32 54C38 54 46 46 46 34C46 20 40 20 32 12Z" stroke="#7dd3ff" stroke-width="4"/><path d="M32 14C32 14 38 18 40 24" stroke="#7dd3ff" stroke-width="4" stroke-linecap="round"/></svg>'
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

proyectos.forEach(proyecto => {
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
