import noImage from './images/no-image.png';
import image1667540822372Png from './images/1667540822372.png';

type AssetNames = 'no-image' | '1667540822372-png';
const assets = (name: AssetNames) => {
  switch (name) {
    case 'no-image':
      return noImage;
    case '1667540822372-png':
      return image1667540822372Png;
  }
};

export default assets;
