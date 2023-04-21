import styles from "./navBar.module.css"
import {useRouter} from "next/router";
import Link from "next/link";
import {useState} from "react";
import Image from "next/image";

const NavBar = (props) => {
    const {username} = props;
    const router = useRouter();
    const [showDropdown, setShowDropdown] = useState(false);

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
                        <div className={styles.navDropdwon}>
                            <Link href={'/login'} legacyBehavior>
                                <a className={styles.linkName}>Sign out</a>
                            </Link>
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