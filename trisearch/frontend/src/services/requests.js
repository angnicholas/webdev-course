import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getProtected(setContent, setLoading){
  await instance
    .get("/protected/")
    .then((res) => {
      setContent(res.data);
      setLoading(false);
    })
    .catch((err) => console.log(err));
}

export async function getFromApi(url, setContent, setLoading, resDataToContent){
  await instance
    .get(url)
    .then((res) => {
      console.log(res.data)
      const content = resDataToContent(res.data);
      console.log(content);
      setContent(content);
      setLoading(false);
    })
    .catch((err) => console.log(err));
}