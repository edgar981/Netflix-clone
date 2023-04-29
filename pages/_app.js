import '@/styles/globals.css'
import {useEffect, useState} from "react";
import {magicClient} from "@/lib/magic-client";
import {useRouter} from "next/router";
import Loading from "@/components/loading/loading";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect( () => {
    const loggingIn = async () => {
      const isLoggedIn = await magicClient.user.isLoggedIn();
      if (isLoggedIn) {
        router.push('/');
      } else {
        router.push('/login');
      }
    }
    loggingIn();
  }, []);

  useEffect(()=> {
    const handleComplete = () => {
      setIsLoading(false);
    }

    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    }

  },[router])

  return isLoading ? <Loading /> : <Component {...pageProps} />
}
