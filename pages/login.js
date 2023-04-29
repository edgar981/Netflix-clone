import Head from "next/head";
import styles from "../styles/Login.module.css";
import Image from "next/image";
import {useState} from "react";
import {useRouter} from "next/router";

const Login = () => {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [userMsg, setUserMsg] = useState('');

    const handleLoginWithEmail = (e) => {
        e.preventDefault();
        if (email) {
            if (email  === 'davidnb81230@gmail.com') {
                router.push('/')
            } else {
                setUserMsg('Something went wrong logging in');
            }
        } else {
            setUserMsg('Enter a valid email address');
        }
    }

    const handleOnChangeEmail = (e) => {
        setUserMsg('');
        const email = e.target.value;
        setEmail(email)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Netflix SignIn</title>
            </Head>

            <header className={styles.header}>
                <div className={styles.headerWrapper}>
                    <a className={styles.logoLink} href={"/"}>
                    <div className={styles.logoWrapper}>
                        <Image src={'/static/netflix.svg'} alt={'Netflix logo'} width={115} height={33}/>
                    </div>
                    </a>
                </div>
            </header>

            <main className={styles.main}>
                <div className={styles.mainWrapper}>
                    <h1 className={styles.signinHeader}>Sign In</h1>

                    <input type={'text'} onChange={handleOnChangeEmail} placeholder={'Email address'} className={styles.emailInput}/>
                    <p className={styles.userMsg}>{userMsg}</p>

                    <button onClick={handleLoginWithEmail} className={styles.loginBtn}>Sign in</button>
                </div>
            </main>
        </div>
    )
}

export default Login;
