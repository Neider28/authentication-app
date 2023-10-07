'use client'
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import Logo from '../../public/assets/devchallenges-light.svg';
import Profile from '../../public/assets/devchallenges.png';
import styles from '../css/header.module.css';

interface Props {
  name: string;
  profileImage: string;
};

const Header: React.FC<Props> = ({ name, profileImage }) => {
  const [handle, setHandle] = useState(false);
  const router = useRouter();

  const logout = () => {
    localStorage.clear();
    router.push('/login');
  };

  return (
    <header className={styles.header}>
      <Image src={Logo} width={150} height={30} alt='Logo' priority={true} />
      <div className={styles.profile_menu} onClick={() => {
        setHandle(!handle);
      }}>
        <Image src={profileImage} width={40} height={40} alt='Logo' priority={true} style={{borderRadius: '10px'}} />
        <span>{ name }</span>
        <Icon icon="teenyicons:down-solid" className={styles.icon} />
        {
          handle && (
            <div className={styles.nav_menu}>
              <button type='button' onClick={logout}>
                <Icon icon="material-symbols:logout" style={{fontSize: '24px'}} />
                Logout
              </button>
            </div>
          )
        }
      </div>
    </header>
  )
};

export default Header;
