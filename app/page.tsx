import Carousel from "./(components)/Carousel";
import { getTrending } from "./api/api";

export default async function Home() {
  const data = await getTrending();
  console.log(data.results);

  return (
    <div>
      <Carousel data={data.results} />
      {/* <h1>Hello World!</h1> */}
    </div>
  );
}
