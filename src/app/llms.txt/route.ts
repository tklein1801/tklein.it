import {config} from '../../config';
import {ProjectService} from '../../components/Project/Project.service';

export async function GET() {
  const projects = await ProjectService.getProjects();
  const content = [
    `# ${config.name}`,
    '## About me',
    ...config.about.map(paragraph =>
      paragraph.map(part => (part.href ? `[${part.text}](${part.href})` : part.text)).join(''),
    ),
    '## Languages',
    ...config.workedWith.languages.map(language => `- ${language}`),
    '## Technologies',
    ...config.workedWith.technologies.map(technology => `- ${technology}`),
    '## Experience',
    ...config.experience.events.map(event => `- ${event.year}: ${event.headline} — ${event.description}`),
    '## Projects',
    ...projects.map(
      project =>
        `- [@${project.owner.login}/${project.name}](${project.url}): ${project.description ?? 'No description'}`,
    ),
  ].join('\n\n');

  return new Response(content, {headers: {'Content-Type': 'text/plain; charset=utf-8'}});
}
