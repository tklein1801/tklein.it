/** @jest-environment node */
import {GET} from './route';
import {config} from '../../config';
import {ProjectService} from '../../components/Project/Project.service';

jest.mock('../../components/Project/Project.service', () => ({
  ProjectService: {getProjects: jest.fn()},
}));

it('renders the current website data as plain text', async () => {
  jest
    .mocked(ProjectService.getProjects)
    .mockResolvedValue([
      {owner: {login: 'user'}, name: 'project', url: 'https://example.com', description: 'Description'} as Awaited<
        ReturnType<typeof ProjectService.getProjects>
      >[number],
    ]);

  const response = await GET();
  const text = await response.text();

  expect(response.headers.get('Content-Type')).toBe('text/plain; charset=utf-8');
  expect(text).toContain(config.name);
  expect(text).toContain(config.about[0][0].text);
  expect(text).toContain(config.workedWith.languages[0]);
  expect(text).toContain(config.experience.events[0].description);
  expect(text).toContain('[@user/project](https://example.com): Description');
});
