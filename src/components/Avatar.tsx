import './Avatar.scss';

export default function Avatar({ src }: { src: string | null | undefined }) {
  if (src) {
    return (
      <div className="avatar">
        <img src={src} alt="user avatar" />
      </div>
    )
  } else {
    return <div className="avatar"></div>
  }
}
