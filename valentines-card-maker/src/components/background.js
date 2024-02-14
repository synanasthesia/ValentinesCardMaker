import useImage from "use-image";
import React from "react";
import { Image as KonvaImage } from "react-konva";

export const Background = (image) => {
  const [backgroundImage] = useImage(image.image);

  return (
      <KonvaImage
        width={600}
        height={579}
        image={backgroundImage}
      />
  );
};
