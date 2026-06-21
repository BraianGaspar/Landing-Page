interface ICardProps {
  icon: string;
  title: string;
  description: string;
  alt: string;
}

export default function Card({ icon, title, description, alt }: ICardProps) {
  return (
    <div className="card">
      <span>
        <img src={icon} alt={alt} width={64} height={64} />
      </span>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
        <hr />
      </div>
    </div>
  );
}
