import videoData from '../data/videos.json';

export async function getVideos (searchQuery) {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

    try {
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchQuery}&type=video&key=${YOUTUBE_API_KEY}`)

        const data = await response.json();

        if (data?.error) {
            console.log("Youtube API error", data.error);
            return [];
        }

        return data.items.map(item => {

            const id = item.id?.videoId || item.id;

            return {
                title: item?.snippet.title,
                imgUrl: item?.snippet?.thumbnails.high.url,
                id,
            }
        });
    } catch (error) {
        console.log("Something went wrong with video library",error);
        return [];
    }
}