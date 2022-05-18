import { useParams } from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument';

import ProjectDetails from './ProjectDetails';
import LoadingAnimation from '../../components/LoadingAnimation';

import './Project.scss'
import ProjectComments from './ProjectComments';

export default function Project() {
  const { id }: { id: string } = useParams();
  const { error, document } = useDocument('projects', id);

  return (<>
    {!document && !error && <LoadingAnimation />}

    {error && <p className='error'>{error}</p>}

    {document &&
      <div className="project-container">
        <ProjectDetails project={document} />
        <ProjectComments project={document} />
      </div>
    }
  </>)
}