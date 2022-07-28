import axios from "axios"

export default defineEventHandler(async (event) => {
    const query = useQuery(event)
    const { data } = await axios.get(`https://api.mangadex.org/${event.req.url.slice(5)}`).catch((err)=>console.log(err.response))
    return data
})