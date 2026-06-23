import Button from './Button';
import checkIcon from '../assets/check.svg';

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
  priceUnit = '',
  features,
  isPremium = false,
  bonus,
  buttonText,
  buttonSecondary = false,
}: IPricingCardProps) {
  return (
    <div className={`pricing-card ${isPremium ? 'premium' : ''}`}>
      {bonus && (
        <div
          style={{
            backgroundColor: '#23A6F0',
            color: 'white',
            padding: '4px 16px',
            borderRadius: '0 0 16px 16px',
            fontSize: '12px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            textAlign: 'center',
            width: '75%',
            margin: '0 auto',
            marginTop: '-0.5rem',
            marginBottom: '0.5rem',
            position: 'relative',
            top: '-0.5rem',
          }}
        >
          {bonus}
        </div>
      )}
      <span className="plan" style={{ textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{name}</h3>
        <p style={{ color: '#737373', fontSize: '0.9rem' }}>{description}</p>
      </span>
      <span
        className="price"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
      >
        <h2 style={{ fontSize: '2rem', color: isPremium ? '#23A6F0' : '#252B42' }}>{price}</h2>
        {priceUnit && <p style={{ color: '#737373', fontSize: '0.9rem' }}>{priceUnit}</p>}
      </span>
      <Button text={buttonText} secondary={buttonSecondary} />
      <span
        className="hr"
        style={{ height: '2px', backgroundColor: '#23A6F0', margin: '0.75rem 0' }}
      />
      {features.map((feature, index) => (
        <span
          className="features"
          key={index}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
        >
          <img src={checkIcon} alt="ícone check" width={20} height={20} />
          <p style={{ color: '#555', fontSize: '0.9rem' }}>{feature}</p>
        </span>
      ))}
    </div>
  );
}
