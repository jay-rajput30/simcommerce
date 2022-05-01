import Landing from "../components/Landing/Landing";
import Navbar from "../components/Navbar/Navbar";

const Home = ({ route, setRoute }) => {
  return (
    <>
      <Navbar route={route} setRoute={setRoute} />
      <Landing />
    </>
  );
};

export default Home;
