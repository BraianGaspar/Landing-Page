// Importação explícita de cada SVG
import check from './check.svg';
import star from './star.svg';
import starEmpty from './star-empty.svg';
import leaf from './leaf.svg';
import hamburguer from './hamburguer.svg';
import close from './close.svg';
import logo from './logo.svg';
import champion from './champion.svg';

// Exportar para garantir que não sejam eliminados pelo tree-shaking
export const svgAssets = {
  check,
  star,
  starEmpty,
  leaf,
  hamburguer,
  close,
  logo,
  champion,
};
