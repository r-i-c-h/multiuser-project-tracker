import { IProject } from '../../ts/interfaces-and-types';
import ProjectList from './ProjectList';
import { useCollection } from '../../hooks/useCollection'
import './Dashboard.scss'

export default function Dashboard() {
  const { documents, error } = useCollection<IProject>('projects');
  console.log(documents)
  console.log(error)
  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && <ProjectList projects={documents} />}
    </div>
  )
}