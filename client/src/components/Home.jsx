import AllPosts from './AllPosts/AllPosts'
import heroImg from '../assets/hero_img.png'

const Home = () => {
  return (
    <div>
      <section id="hero">
        <div className='text-container'>
          <h1>All Things Crypto.</h1>
          <p className="subtitle">Dive into the world of DeFi, NFTs, and blockchain tech.</p>
        </div>
        <img id="heroImg" src={heroImg} alt="Blockchain Illustration" width="40%" />
      </section>
      <AllPosts />
    </div>
  )
}

export default Home