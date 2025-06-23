import { useState, useEffect  } from 'react'
import { Link } from "react-router-dom";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import myImage from "../assets/logos/Animesh.jpg"
import { PaintBrushIcon, PhotoIcon, FilmIcon, SwatchIcon,} from '@heroicons/react/24/solid'
import img1 from "../assets/images/design/DESIGN 1.JPG"
import img2 from "../assets/images/design/DESIGN 2.JPG"
import img3 from "../assets/images/design/DESIGN 5.JPG"

const images = [
  img1,img2,img3,
];

const skills = [
    "Design",
    "Adobe Photoshop",
    "Hand Craft",
    "Adobe Premiere",
    "Photography",
    "Adobe Illustrator",
  ];

const textColors = [
    'text-gray-900',
    'text-indigo-900',
    'text-purple-900',
    'text-green-900',
    'text-rose-900',
  ];

function LandingPage() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Thanks for subscribing with ${email}!`)
    setEmail('')
  }

  const [current, setCurrent] = useState(0);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const getSkillIcon = (skillName) => {
    const lowerCaseSkill = skillName.toLowerCase();

    if (lowerCaseSkill.includes('photoshop') || lowerCaseSkill.includes('photo')){
      return <PhotoIcon className="h-6 w-6 text-indigo-600 mr-3" />;
    }
    if (lowerCaseSkill.includes('premiere') || lowerCaseSkill.includes('illustrator')) {
      return <FilmIcon className="h-6 w-6 text-indigo-600 mr-3" />;
    }
    if (lowerCaseSkill.includes('design') || lowerCaseSkill.includes('craft')) {
      return <PaintBrushIcon className="h-6 w-6 text-indigo-600 mr-3" />;
    }
    // Default icon if no specific match is found for new skills added later
    return <SwatchIcon className="h-6 w-6 text-gray-500 mr-3" />;
  };

  const [textColorIndex, setTextColorIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTextColorIndex((prevIndex) => (prevIndex + 1) % textColors.length);
    }, 7000);

    return () => clearInterval(intervalId);
  }, []); 

  return (
    <>
      <section className="container mx-auto px-6 py-8 text-center">
        <p className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          I'm <span className='text-indigo-600'>Animesh Dey</span> <br className="hidden md:block" /> Teacher and Aritis
        </p>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Creativity is my passion. I want to involve myself in the creation of uncommon design and craft.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4 max-w-md mx-auto">
          <Link
            to="/my-work/design"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-bold shadow-lg hover:shadow-xl"
          >
            See My Work
          </Link>
          <a
            href="https://wa.me/919732172167?text=Hi%2C%20I%20saw%20your%20work%20and%20wanted%20to%20connect!"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 border border-green-500 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition font-bold shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.197.297-.767.967-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.134.298-.347.447-.52.149-.174.198-.298.298-.497.1-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.204-.242-.58-.487-.502-.669-.511-.173-.008-.372-.01-.571-.01s-.52.075-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.097 3.2 5.077 4.487.71.306 1.264.489 1.695.625.712.226 1.36.194 1.87.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.291.173-1.414-.074-.124-.272-.198-.57-.347z" />
            </svg>
            WhatsApp
          </a>
        </div>
        <div className="mt-12 mx-auto relative group" style={{ width: "950px", height: "534px" }}>
        {/* Main Image with Enhanced Transition */}
        <div className="relative w-full h-full overflow-hidden rounded-xl shadow-2xl">
          <img
            src={images[current]}
            alt={`Slide ${current + 1}`}
            className="w-full h-full object-cover transition-opacity duration-700 ease-out"
            key={current} // Important for smooth transitions
          />
          
          {/* Gradient Overlay at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        {/* Navigation Buttons - Enhanced */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-lg p-3 z-10 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 hover:shadow-xl"
          aria-label="Previous slide"
        >
          <HiChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-lg p-3 z-10 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 hover:shadow-xl"
          aria-label="Next slide"
        >
          <HiChevronRight className="w-6 h-6" />
        </button>

        {/* Enhanced Dots Navigation */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                current === index 
                  ? "bg-white scale-125 shadow-sm" 
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Optional Slide Counter */}
        <div className="absolute bottom-6 right-6 bg-black/50 text-white text-sm px-3 py-1 rounded-full z-10">
          {current + 1} / {images.length}
        </div>
      </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-12"> {/* Changed to items-start on md+ */}

        
        <div className="w-full md:w-3/6"> 
          <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-gray-900 tracking-tight leading-tight">
            My Core Competencies & Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5"> {/* Grid for skills: 2 columns on sm and lg */}
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-5 flex items-center
                           hover:bg-indigo-50 transition-all duration-300 ease-in-out
                           transform hover:-translate-y-1 hover:shadow-lg border border-transparent hover:border-indigo-300"
              >
                {getSkillIcon(skill)}
                <span className="text-lg font-medium text-gray-800">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        
        <div className="w-full md:w-2/5 flex justify-center items-center p-4 md:p-0">
          <div className="max-w-xs md:max-w-full w-full">
            <img
              src={myImage}
              alt="Showcase of my creative work and professional skills"
              className="w-full h-auto rounded-xl shadow-xl object-cover
                         transition-transform duration-500 ease-in-out hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>

    <section className="max-w-4xl mx-auto px-6 py-0 text-center">
        <h2 className="text-5xl font-bold mb-6 text-gray-900 tracking-tight">
          Be Positive
        </h2>
        <p
          className={`text-xl md:text-xl font-medium transition-colors duration-1000 ease-in-out ${textColors[textColorIndex]} mb-8 italic`}
        >
          Every work is an Art. So your work is absolutely an Art. Try it. Try it. Try it and do it. And try to create something new.
        </p>
        <p className="text-lg font-semibold text-gray-600">
          — Animish Day
        </p>
      </section>
    </>
  )
}

export default LandingPage