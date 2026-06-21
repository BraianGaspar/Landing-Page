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
          src={i < rating ? "/assets/star.svg" : "/assets/star-empty.svg"}
          alt={i < rating ? "ícone estrela" : "ícone estrela vazia"}
          width={22}
          height={20}
        />,
      );
    }
    return stars;
  };

  return (
    <div className="carousel-card">
      <img src={image} alt={alt} />
      <span className="testimony">
        <p>{testimony}</p>
      </span>
      <span className="rating">{renderStars()}</span>
      <span className="names">
        <p>{name}</p>
        <p>{role}</p>
      </span>
    </div>
  );
}
