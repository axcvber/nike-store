import dropdownKidsBg from '../../image/kidsBg.jpg'
import dropdownWomenBg from '../../image/womenBg.jpg.jpg'
import dropdownMenBg from '../../image/menBg.jpg'
import { AiOutlineInbox } from 'react-icons/ai'
import { IoSettingsOutline } from 'react-icons/io5'
import { IconType } from 'react-icons/lib'
import { BiUser } from 'react-icons/bi'

export interface NavLinks {
  title: string
  path: string
  icon?: IconType
}

export const NavbarData = [
  {
    title: 'Главная',
    path: '/',
  },
  {
    title: 'Магазин',
    path: '/catalog',
  },
  {
    title: 'Контакты',
    path: '/contacts',
  },
  {
    title: 'Скидки',
    path: '/sale',
  },
]

export const KidsLinks = [
  {
    title: 'Big Kids',
    path: '/kids/big',
  },
  {
    title: 'Little Kids',
    path: '/kids/little',
  },
  {
    title: 'Baby & Toddler',
    path: '/kids/baby',
  },
  {
    title: 'Lifestyle',
    path: '/kids/lifestyle',
  },
  {
    title: 'Running',
    path: '/kids/running',
  },
  {
    title: 'Basketball',
    path: '/kids/basketball',
  },
  {
    title: 'Soccer',
    path: '/kids/soccer',
  },
  {
    title: 'Sandals & Slides',
    path: '/kids/sandals',
  },
  {
    title: 'All Collections',
    path: '/kids/all',
  },
]
export const WomenLinks = [
  {
    title: 'Lifestyle',
    path: '/women/lifestyle',
  },
  {
    title: 'Running',
    path: '/women/running',
  },
  {
    title: 'Training & Gym',
    path: '/women/training',
  },
  {
    title: 'Basketball',
    path: '/women/basketball',
  },
  {
    title: 'Jordan',
    path: '/women/jordan',
  },
  {
    title: 'Soccer',
    path: '/women/soccer',
  },
  {
    title: 'Tennis',
    path: '/women/tennis',
  },
  {
    title: 'Track & Field',
    path: '/women/track',
  },
  {
    title: 'Sandals & Slides',
    path: '/women/sandals',
  },
  {
    title: 'Skateboarding',
    path: '/women/skateboarding',
  },
  {
    title: 'Softball',
    path: '/women/softball',
  },
  {
    title: 'All Collections',
    path: '/women/all',
  },
]
export const MenLinks = [
  {
    title: 'Lifestyle',
    path: '/men/lifestyle',
  },
  {
    title: 'Running',
    path: '/men/running',
  },
  {
    title: 'Basketball',
    path: '/men/basketball',
  },
  {
    title: 'Jordan',
    path: '/men/jordan',
  },
  {
    title: 'Training & Gym',
    path: '/men/training',
  },
  {
    title: 'Soccer',
    path: '/men/soccer',
  },
  {
    title: 'Golf',
    path: '/men/golf',
  },
  {
    title: 'Track & Field',
    path: '/men/track',
  },
  {
    title: 'Skateboarding',
    path: '/men/skateboarding',
  },
  {
    title: 'Tennis',
    path: '/men/tennis',
  },
  {
    title: 'Baseball',
    path: '/men/baseball',
  },
  {
    title: 'Sandals & Slides',
    path: '/men/sandals',
  },
  {
    title: 'All Collections',
    path: '/men/all',
  },
]

export const peopleCategory = [
  {
    title: 'Дети',
    activeMenu: 'kids',
    arrLinks: KidsLinks,
    dropdownImg: dropdownKidsBg,
    path: '/kids',
  },
  {
    title: 'Женщины',
    activeMenu: 'women',
    arrLinks: WomenLinks,
    dropdownImg: dropdownWomenBg,
    path: '/women',
  },
  {
    title: 'Мужчины',
    activeMenu: 'men',
    arrLinks: MenLinks,
    dropdownImg: dropdownMenBg,
    path: '/men',
  },
]

export const userWidgetLinks = [
  {
    title: 'Profile',
    path: '/profile',
    icon: BiUser,
  },
  {
    title: 'Orders',
    path: '/orders',
    icon: AiOutlineInbox,
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: IoSettingsOutline,
  },
]
