import Head from "next/head";
import NavBar from "@/components/nav/navBar";
import SectionCards from "@/components/card/section-cards";
import useRedirectUser from "@/utils/redirectUser";
import styles from '../../styles/MyList.module.css'

const MyList = async () =>{
    const {userId, token} = await useRedirectUser();

    return (
        <div>
            <Head>
                <title>My list</title>
            </Head>
            <main className={styles.main}>
                <NavBar />
                <div className={styles.sectionWrapper}>
                    <SectionCards title={'My List'} videos={[]} size={'small'}/>
                </div>
            </main>
        </div>
    )

}

export default MyList;