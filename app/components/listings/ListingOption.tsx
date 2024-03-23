'use client';

import { IconType } from "react-icons";
import Heading from "../Heading";

interface OptionViewProps {
  icon: IconType,
  label: string,

}

const OptionView: React.FC<OptionViewProps> = ({ 
  icon: Icon,
  label,
 }) => {
  return ( 
    <div className="flex flex-col gap-6">
        
      <div className="flex flex-row items-center gap-3">
        <Icon size={30} className="text-neutral-600" />
        <div className="flex flex-col">
            <div 
              className="text-md"
            >
              {label}
            </div>
            
        </div>
      </div>
    </div>
   );
}
 
export default OptionView;