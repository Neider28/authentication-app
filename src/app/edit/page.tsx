'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Header from '@/components/header';
import Loading from '@/components/loading';
import { UserI } from '@/interfaces/user.interface';
import IsNotAuth from '@/middlewares/isNotAuth.middleware';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import styles from '../../css/edit.module.css';

export default function Edit() {
  const [user, setUser] = useState<UserI | null>(null);
  const [name, setName] = useState<string>('');
  const [profileImage, setProfileImage] = useState('');
  const [formData, setFormData] = useState<{
    name: string
    bio: string,
    phone: string,
    email: string,
    password?: string | undefined,
  }>({
    name: '',
    bio: '',
    phone: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    document.title = 'Edit profile';

    const getProfileData = async () => {
      try {
        const response = await fetch(`${process.env.API_AUTH}/auth/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = await response.json();

        setUser(data);
        setName(data.name);
        setProfileImage(data.profileImage);
        
        const form = {
          name: data.name,
          bio: data.bio,
          phone: data.phone,
          email: data.email,
          password: '',
        };

        setFormData(form);
      } catch (error) {
        notifyError();
      }
    }

    getProfileData();
  }, []);

  const handleImageChange = async (event: any) => {
    const selectedImage = event.target.files[0];
    setProfileImage(URL.createObjectURL(selectedImage));

    try {
      const formImage = new FormData();

      formImage.append('profileImage', selectedImage);

      const response = await fetch(`${process.env.API_AUTH}/auth/profile/edit/image`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formImage,
      });

      if (response.ok) {
        notifySuccess();
      } else {
        notifyError();
      }
    } catch (error) {
      notifyError();
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.API_AUTH}/auth/profile/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        notifySuccess();
        setName(formData.name);
      } else {
        notifyError();
      }
    } catch (error) {
      notifyError();
    }
  };

  const notifySuccess = () => {
    toast.success('Updated data', {
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

  const notifyError = () => {
    toast.error('Server error', {
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

  return (
    <IsNotAuth>
      {user ? (
        <>
          <ToastContainer style={{
            fontSize: '1rem',
          }} />
          <Header name={name} profileImage={profileImage} />
          <main className={styles.main}>
            <div className={styles.back_container}>
              <Link href='/'>
                <span>
                  <Icon icon="mingcute:left-fill" className={styles.icon} />
                  Back
                </span>
              </Link>
            </div>
            <div className={styles.edit_container}>
              <div className={styles.edit_head}>
                <h3>Change Info</h3>
                <p>Changes will be reflected to every services</p>
              </div>
              <form onSubmit={handleSubmit} className={styles.form_edit}>
                <div className={styles.edit_item_photo}>
                  <div className={styles.edit_photo}>
                    <Image src={profileImage} width={80} height={80} alt='Logo' priority style={{borderRadius: '10px'}} />
                    <input type="file" id="profileImage" name="profileImage" accept="image/*" onChange={handleImageChange} />
                  </div>
                  <label htmlFor='profileImage'>CHANGE PHOTO</label>
                </div>
                <div className={styles.edit_item}>
                  <label htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name..."
                    value={formData.name}
                    onChange={handleInputChange}
                    autoComplete='true'
                  />
                </div>
                <div className={styles.edit_item}>
                  <label htmlFor="bio">
                    Bio
                  </label>
                  <input
                    type="text"
                    id="bio"
                    name="bio"
                    placeholder="Enter your bio..."
                    value={formData.bio}
                    onChange={handleInputChange}
                    autoComplete='true'
                  />
                </div>
                <div className={styles.edit_item}>
                  <label htmlFor="phone">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone..."
                    value={formData.phone}
                    onChange={handleInputChange}
                    autoComplete='true'
                  />
                </div>
                <div className={styles.edit_item}>
                  <label htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email..."
                    value={formData.email}
                    onChange={handleInputChange}
                    autoComplete='true'
                  />
                </div>
                <div className={styles.edit_item}>
                  <label htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password..."
                    value={formData.password}
                    onChange={handleInputChange}
                    minLength={5}
                  />
                </div>
                <button type="submit">Save</button>
              </form>
            </div>
          </main>
        </>
      ): <Loading />}
    </IsNotAuth>
  )
};
