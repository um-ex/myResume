async function loadProjects() {
  const container = document.getElementById('projects-list');
  if (!container) return;

  try {
    const response = await fetch('./projects.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Failed to load projects.json');
    const projects = await response.json();

    if (!Array.isArray(projects)) throw new Error('projects.json must be an array');

    for (const project of projects) {
      const card = document.createElement('article');
      card.className = 'project-card';

      const title = document.createElement('h3');
      title.className = 'project-title';
      title.textContent = project.title || 'Untitled Project';

      const desc = document.createElement('p');
      desc.textContent = project.description || '';

      const tags = document.createElement('ul');
      tags.className = 'tags';
      (project.tech || []).forEach((t) => {
        const li = document.createElement('li');
        li.className = 'tag';
        li.textContent = t;
        tags.appendChild(li);
      });

      const links = document.createElement('div');
      links.className = 'project-links';
      if (project.links?.demo) {
        const a = document.createElement('a');
        a.href = project.links.demo;
        a.textContent = 'Demo';
        a.className = 'link';
        a.target = '_blank';
        a.rel = 'noopener';
        links.appendChild(a);
      }
      if (project.links?.repo) {
        const a = document.createElement('a');
        a.href = project.links.repo;
        a.textContent = 'Code';
        a.className = 'link';
        a.target = '_blank';
        a.rel = 'noopener';
        links.appendChild(a);
      }

      card.appendChild(title);
      card.appendChild(desc);
      card.appendChild(tags);
      card.appendChild(links);
      container.appendChild(card);
    }
  } catch (err) {
    console.error('Error loading projects:', err);
    const error = document.createElement('p');
    error.textContent = 'Unable to load projects at this time.';
    container.appendChild(error);
  }
}

window.addEventListener('DOMContentLoaded', loadProjects);
