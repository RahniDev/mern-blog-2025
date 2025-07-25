import AllPosts from './AllPosts/AllPosts'
import heroImg from '../assets/hero_img.png'

const Home = () => {
  return (
    <div>
      <section id="hero">
        <h1>Decentralize Your Ideas.</h1>
      <img id="heroImg" src={heroImg} alt="Blockchain Image" width="40%" />
      </section>
      <AllPosts />
    </div>
  )
}

export default Home