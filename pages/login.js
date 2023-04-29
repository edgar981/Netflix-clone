import Head from "next/head";
import styles from "../styles/Login.module.css";
import Image from "next/image";
import {useState} from "react";
import {useRouter} from "next/router";
import {magicClient} from "@/lib/magic-client";

const Login = () => {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [userMsg, setUserMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const handleLoginWithEmail = async (e) => {
        e.preventDefault();
        if (email) {
            if (email  === 'davidnb81230@gmail.com') {
                try {
                    setIsLoading(true);
                   const didToken = await magicClient.auth.loginWithMagicLink({ email, });
                   didToken ? setIsLoading(false) && router.push('/') : null;
                   console.log({didToken})
                } catch (error){
                    console.log("Something went wrong", error);
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
                setUserMsg('Something went wrong logging in');
            }
        } else {
            setIsLoading(false);
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

                    <button onClick={handleLoginWithEmail} className={styles.loginBtn}>{isLoading ? "Loading..." : "Sign in"}</button>
                </div>
            </main>
        </div>
    )
}

export default Login;

/*
WyIweDJhNGMyNDU0NGQ0ZDI0NjU0YTEwYjkzODkzYTc2ZDQ5M2ZjN2Y4MmQxMDgzYWYxNTRjNDhkNmFhYmIxOTg5N2MxZGFjZGMwZDA5MWNkZWYwN2Q4OWJmNTIxODM0YTI5OWM4ZWUzYjNhMDJiNGZkYjQ5NDg1ZmNmM2MwYmQ2NThmMWIiLCJ7XCJpYXRcIjoxNjgyNzgwNjM0LFwiZXh0XCI6MTY4Mjc4MTUzNCxcImlzc1wiOlwiZGlkOmV0aHI6MHhmNzNBMEQ5NjYyQjE4M0M2NDY5NUMxYTI1OGVlRDE1ZjQzRjY4Y2FEXCIsXCJzdWJcIjpcIlhXbVB4VmcxdExZOVNTUVVmTzNYM29GZU9hYzhpUlJoZjhfYzR0NFo2WkE9XCIsXCJhdWRcIjpcIjRWVHNub1N3blNEZ240aUdUWVI2T01oNEZ6QUN5d3FxajlpQ0ZsVnRTR3M9XCIsXCJuYmZcIjoxNjgyNzgwNjM0LFwidGlkXCI6XCJkNTZhYzc2NS0xZTYwLTQ1ZWItYjBjNC05YzBiMDhhOTc0YjZcIixcImFkZFwiOlwiMHg2OWY3MjU1MmJjOGQwNTdlOWQxZTQxOTkxZjZlZmEyNmUyY2Q2MDM3OTZiOWYwYmNiYzRiODAxYTdhNjc2YTRmMzc5MzA2N2RiNDdlMTY3OWI3ODM1NDRjZTc5Yjk5MzY5MGMyODViZjc3YTQxYzIxYTU1NjBlYjc4OWE4OTVkNDFjXCJ9Il0=
 */