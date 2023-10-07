'use client'
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import Logo from '../../../public/assets/devchallenges-light.svg';
import GitHub from '../../../public/assets/Gihub.svg';
import IsAuth from '@/middlewares/isAuth.middleware';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import styles from '../../css/login.module.css';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.title = 'Login';
  }, []);

  const notify = () => {
    toast.error('Invalid credentials', {
      bodyClassName: "grow-font-size",
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.API_AUTH}/auth/signIn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        const token = data.access_token;

        localStorage.setItem('token', token);

        router.push('/');
      } else {
        notify();
      }
    } catch (error) {
      notify();
    }
  };

  return (
    <IsAuth>
      <ToastContainer style={{
        fontSize: '1rem',
      }} />
      <main className={styles.main}>
        <div className={styles.login_container}>
          <Image src={Logo} width={150} height={50} alt='Logo' priority={true} />
          <h2>Join thousands of learners from around the world</h2>
          <p>Master web development by making real-life projects. There are multiple paths for you to choose.</p>
          <form onSubmit={handleSubmit} className={styles.form_container}>
            <div className={styles.input_container}>
              <label htmlFor="email">
                <Icon icon="ic:baseline-email" className={styles.icon} />
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                autoComplete='true'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.input_container}>
              <label htmlFor="password">
                <Icon icon="mdi:password" className={styles.icon} />
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
          <span>or continue with these social profile</span>
          <div className={styles.social_container}>
            <Image src={GitHub} width={45} height={45} alt='Logo' priority={true} />
          </div>
          <span>Don’t have an account yet? <Link href='/register'>Register</Link></span>
        </div>
      </main>
    </IsAuth>
  )
};
