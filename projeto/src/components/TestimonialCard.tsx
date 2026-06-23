import starIcon from '../assets/star.svg';
import starEmptyIcon from '../assets/star-empty.svg';

interface ITestimonialCardProps {
  image: string;
  name: string;
  role: string;
  testimony: string;
  rating: number;
  alt: string;
}

export default function TestimonialCard({
  image,
  name,
  role,
  testimony,
  rating,
  alt,
}: ITestimonialCardProps) {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <img
          key={i}
          src={i < rating ? starIcon : starEmptyIcon}
          alt={i < rating ? 'ícone estrela' : 'ícone estrela vazia'}
          className="star-icon"
        />
      );
    }
    return stars;
  };

  return (
    <div className="carousel-card">
      <img src={image} alt={alt} className="profile-image" />
      <span className="testimony">
        <p>{testimony}</p>
      </span>
      <span className="rating">{renderStars()}</span>
      <span className="names">
        <p className="name">{name}</p>
        <p className="role">{role}</p>
      </span>
    </div>
  );
}
