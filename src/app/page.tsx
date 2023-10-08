'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Header from '@/components/header';
import Loading from '@/components/loading';
import IsNotAuth from '@/middlewares/isNotAuth.middleware';
import { UserI } from '@/interfaces/user.interface';
import styles from './page.module.css';
import { getTokenCookie } from '@/utils/cookie.util';

export default function Home() {
  const [user, setUser] = useState<UserI | null>(null);

  useEffect(() => {
    document.title = 'My profile';

    const getProfileData = async () => {
      try {
        const token = getTokenCookie();

        const response = await fetch(`${process.env.API_AUTH}/auth/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        
        const data = await response.json();

        setUser(data);
      } catch (error) {
        console.log('Error server.');
      }
    };

    getProfileData();
  }, []);

  return (
    <IsNotAuth>
      {user ? (
        <> 
          <Header name={user.name} profileImage={user.profileImage} />
          <main className={styles.main}>
            <h1>Personal info</h1>
            <p>Basic info, like your name and photo</p>
            <div className={styles.profile_container}>
              <div className={styles.profile_head}>
                <h3>Profile</h3>
                <Link href='/edit'>
                  <button type="button">Edit</button>
                </Link>
              </div>
              <div className={styles.profile_item}>
                <h5>Photo</h5>
                <Image src={user.profileImage} width={60} height={60} alt='Logo' priority={true} style={{borderRadius: '10px'}} />
              </div>
              <div className={styles.profile_item}>
                <h5>Name</h5>
                <p>{ user.name }</p>
              </div>
              <div className={styles.profile_item}>
                <h5>Bio</h5>
                <p>{ user.bio }</p>
              </div>
              <div className={styles.profile_item}>
                <h5>Phone</h5>
                <p>{ user.phone }</p>
              </div>
              <div className={styles.profile_item}>
                <h5>Email</h5>
                <p>{ user.email }</p>
              </div>
            </div>
          </main>
        </>
      ) : <Loading />}
    </IsNotAuth>
  )
};
