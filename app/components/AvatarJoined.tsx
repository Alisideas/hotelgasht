'use client';

import Image from "next/image";

interface AvatarJoinedProps {
  src: string | null | undefined;
}

const Avatar: React.FC<AvatarJoinedProps> = ({ src }) => {
  return ( 
    <Image 
      className="rounded-full" 
      height="60" 
      width="60" 
      alt="Avatar" 
      src={src || '/images/placeholder.jpg'}
    />
   );
}
 
export default Avatar;