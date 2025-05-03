import Image from "next/image";
import BrandSvg from "./assets/Brand.svg";

export const Brand = () => {
  return (
    <Image
      src={BrandSvg}
      width={BrandSvg.width}
      height={BrandSvg.height}
      alt="Omzo.io"
    />
  );
};
