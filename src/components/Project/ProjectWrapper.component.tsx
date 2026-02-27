import {Grid} from '@mui/material';
import {withSuspense} from '@/hooks';
import {Project} from './Project.component';
import {LoadingProject} from './LoadingProject.component';
import {ProjectService} from './Project.service';

export const ProjectWrapper = async () => {
  try {
    const projects = await ProjectService.getProjects();
    if (projects.length === 0) return null;
    return (
      <Grid container spacing={3}>
        {projects.map(project => (
          <Grid size={{xs: 12, md: 6, lg: 6, xl: 4}} key={project.id}>
            <Project
              repositoryUrl={project.url}
              repositoryName={`@${project.owner.login}/${project.name}`}
              repositoryDescription={project.description}
              repositoryLanguage={project.primaryLanguage?.name ?? ''}
              repositoryLanguageColor={project.primaryLanguage?.color ?? ''}
              repositoryStars={project.stargazerCount}
              repositoryForks={project.forkCount}
            />
          </Grid>
        ))}
      </Grid>
    );
  } catch {
    return null;
  }
};

const Loader = () => {
  return (
    <Grid container spacing={3}>
      {Array.from({length: 6}).map((_, index) => (
        <Grid size={{xs: 12, md: 6, lg: 6, xl: 4}} key={index}>
          <LoadingProject />
        </Grid>
      ))}
    </Grid>
  );
};

export const SuspenseProjectWrapper = withSuspense(ProjectWrapper, Loader);
