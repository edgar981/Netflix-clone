import Head from "next/head";
import NavBar from "@/components/nav/navBar";
import SectionCards from "@/components/card/section-cards";
import useRedirectUser from "@/utils/redirectUser";
import styles from '../../styles/MyList.module.css';
import {getMyList} from "@/lib/videos";

export async function getServerSideProps(context){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {userId, token} = await useRedirectUser(context);
    const videos = await getMyList(userId, token);

    return {
        props: {
            myListVideos: videos,
        }
    }
}

const MyList = ({myListVideos}) =>{

    return (
        <div>
            <Head>
                <title>My list</title>
            </Head>
            <main className={styles.main}>
                <NavBar />
                <div className={styles.sectionWrapper}>
                    <SectionCards title={'My List'} videos={myListVideos} size={'small'}/>
                </div>
            </main>
        </div>
    )

}

export default MyList;