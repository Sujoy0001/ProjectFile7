import { useState, useEffect  } from 'react'
import { Link } from "react-router-dom";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import myImage from "../assets/logos/Animesh.jpg"
import { PaintBrushIcon, PhotoIcon, FilmIcon, SwatchIcon,} from '@heroicons/react/24/solid'

const images = [
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  "data:image/jpeg;base64,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",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzZWAT580BPmltMJuVW1eDMKVePO-KT7rE-Q&s",
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
            to="/my-work"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-bold shadow-lg hover:shadow-xl"
          >
            See My Work
          </Link>
          <a
            href="https://wa.me/919732172167?text=Hi%20Sujoy%2C%20I%20saw%20your%20work%20and%20wanted%20to%20connect!"
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