import Button from "./Button";

interface IPricingCardProps {
  name: string;
  description: string;
  price: string;
  priceUnit?: string;
  features: string[];
  isPremium?: boolean;
  bonus?: string;
  buttonText: string;
  buttonSecondary?: boolean;
}

export default function PricingCard({
  name,
  description,
  price,
  priceUnit = "",
  features,
  isPremium = false,
  bonus,
  buttonText,
  buttonSecondary = false,
}: IPricingCardProps) {
  return (
    <div className={`pricing-card ${isPremium ? "premium" : ""}`}>
      {bonus && (
        <span className="bonus">
          <p>{bonus}</p>
        </span>
      )}
      <span className="plan">
        <h3>{name}</h3>
        <p>{description}</p>
      </span>
      <span className="price">
        <h2>{price}</h2>
        {priceUnit && <p>{priceUnit}</p>}
      </span>
      <Button text={buttonText} secondary={buttonSecondary} />
      <span className="hr" />
      {features.map((feature, index) => (
        <span className="features" key={index}>
          <img
            src="/assets/check.svg"
            alt="ícone check"
            width={24}
            height={24}
          />
          <p>{feature}</p>
        </span>
      ))}
    </div>
  );
}
