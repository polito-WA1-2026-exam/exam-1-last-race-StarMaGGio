import './App.css'
import Header from './components/Header'
import bgImg from './assets/Background_image_example.png'

function App() {
  return (
    <div>
      <Header/>
      <img src={bgImg} alt="Background" className="background-image" />
    </div>
  )
}

export default App
