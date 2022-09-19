import Lightbox from "yet-another-react-lightbox"
import { useStore } from '@nanostores/react';
import { selectedIndex } from '../store/lightboxStore';
import type { Slide } from "../types"

interface LightboxProps {
  slides: Slide[];
}

const LightboxWithState = ({ slides }: LightboxProps) => {
  const $selectedIndex = useStore(selectedIndex);

  return (
    <Lightbox
      slides={slides}
      open={$selectedIndex >= 0}
      index={$selectedIndex}
      close={() => selectedIndex.set(-1)}
    // enable optional lightbox plugins
    // plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
    />
  );
};

export default LightboxWithState;