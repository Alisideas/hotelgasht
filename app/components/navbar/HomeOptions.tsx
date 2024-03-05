'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { TbBeach, TbMountain, TbPool ,TbWifi ,TbToolsKitchen2,TbCarGarage ,TbAirConditioning,TbGrill   } from 'react-icons/tb';
import { CgGym,CgSmartHomeRefrigerator  } from "react-icons/cg";
import { 
  GiBarn, 
  GiBoatFishing, 
  GiCactus, 
  GiCastle, 
  GiCaveEntrance, 
  GiForestCamp, 
  GiIsland,
  GiWindmill,
  GiTv ,
  GiGasStove 
} from 'react-icons/gi';
import { FaSkiing,FaSpa  } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla,MdOutlineYard,MdOutlineMicrowave ,MdSmokeFree ,MdOutlineCoffeeMaker } from 'react-icons/md';

import CategoryBox from "../CategoryBox";
import Container from '../Container';
import FilterButton from '../FilterButton';


export const homeOption = [
  {
    label: 'WiFi',
    icon: TbWifi,
    
  },
  {
    label: 'Pool',
    icon: TbPool,
    
  },
  {
    label: 'Kitchen',
    icon: TbToolsKitchen2,
  },
  {
    label: 'Parking',
    icon: TbCarGarage ,
  },
  {
    label: 'SPA',
    icon: FaSpa,
  },
  {
    label: 'GYM',
    icon: CgGym,
  },
  {
    label: 'TV',
    icon: GiTv ,
  },
  {
    label: 'Backyard',
    icon: MdOutlineYard ,
  },
  {
    label: 'Microwave',
    icon: MdOutlineMicrowave ,
  },
  {
    label: 'Refrigerator',
    icon: CgSmartHomeRefrigerator ,
  },
  {
    label: 'Air conditioning',
    icon: TbAirConditioning ,
  },
  {
    label: 'BBQ grill',
    icon: TbGrill ,
  },
  {
    label: 'Stove',
    icon: GiGasStove ,
  },
  {
    label: 'Smoke alarm',
    icon: MdSmokeFree ,
  },
  {
    label: 'Coffee maker',
    icon: MdOutlineCoffeeMaker ,
  }
]

const HomeOptions = () => {
  const params = useSearchParams();
  const category = params?.get('HomeOption');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {homeOption.map((item) => (
          <CategoryBox 
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
        <FilterButton />
      </div>
    </Container>
  );
}
 
export default HomeOptions;