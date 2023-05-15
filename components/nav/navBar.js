import styles from "./navBar.module.css"
import {useRouter} from "next/router";
import Link from "next/link";
import {useEffect, useState} from "react";
import Image from "next/image";
import {magicClient} from "@/lib/magic-client";

const NavBar = () => {
    const router = useRouter();
    const [showDropdown, setShowDropdown] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        async function getUsername() {
            try {
                const { email } = await magicClient.user.getMetadata();
                const didToken = await magicClient.user.getIdToken();

                if (email) {
                    setUsername(email);
                }
            } catch (error) {
                console.log("Error retrieving email:", error);
            }
        }
        getUsername();
    }, []);

    const handleOnClickHome = (e) => {
        e.preventDefault();
        router.push('/')
    }

    const handleOnClickMyList = (e) => {
        e.preventDefault();
        router.push('/browse/my-list')
    }

    const handleShowDropdown = (e) => {
        e.preventDefault();
        setShowDropdown(!showDropdown);
    }

    const handleSignOut = async (e) => {
        e.preventDefault();

        try {
            await magicClient.user.logout();
            router.push('/login');
        } catch (e) {
            console.log(e);
            router.push('/login');
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <a className={styles.logoLink} href={"/"}>
                    <div className={styles.logoWrapper}>
                        <Image src={'/static/netflix.svg'} alt={'Netflix logo'} width={115} height={33}/>
                    </div>
                </a>

            <ul className={styles.navItems}>
                <li className={styles.navItem} onClick={handleOnClickHome}>Home</li>
                <li className={styles.navItem} onClick={handleOnClickMyList}>My List</li>
            </ul>

            <nav className={styles.navContainer}>
                <div>
                    <button className={styles.usernameBtn} onClick={handleShowDropdown}>
                        <p className={styles.username}>{username}</p>
                        <Image src={'/static/expand_more.svg'} alt={'Expand icon'} width={28} height={28}/>
                    </button>

                    {showDropdown && (
                        <div className={styles.navDropdown}>
                            <a className={styles.linkName} onClick={handleSignOut}>Sign out</a>
                            <div className={styles.lineWrapper}></div>
                        </div>
                    )}

                </div>
            </nav>
            </div>
        </div>
    )
}

export default NavBar;