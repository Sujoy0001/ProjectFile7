import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPinterestP,
  FaDownload,
  FaIdCard
} from "react-icons/fa";

import aboutImg from "../assets/logos/Animesh.jpg";
import v from "../assets/logos/V Card.jpg";
import cv from "../assets/logos/Bio-data.jpg";

const socials = [
  {
    name: "Facebook",
    handle: "@animesh.dey.5209",
    icon: <FaFacebookF className="w-6 h-6 text-blue-600" />,
    bg: "bg-blue-50",
    hover: "hover:bg-blue-100",
    link: "https://www.facebook.com/animesh.dey.5209/",
  },
  {
    name: "adrish_dastru",
    handle: "@adrish_dastru",
    icon: <FaInstagram className="w-6 h-6 text-pink-500" />,
    bg: "bg-pink-50",
    hover: "hover:bg-pink-100",
    link: "https://www.instagram.com/adrish_dastru/",
  },
  {
    name: "YouTube",
    handle: "@krishti",
    icon: <FaYoutube className="w-6 h-6 text-red-500" />,
    bg: "bg-red-50",
    hover: "hover:bg-red-100",
    link: "https://www.youtube.com/krishti",
  },
  {
    name: "Pinterest",
    handle: "@yourboards",
    icon: <FaPinterestP className="w-6 h-6 text-red-400" />,
    bg: "bg-rose-50",
    hover: "hover:bg-rose-100",
    link: "https://pinterest.com",
  },
];

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-24">
      {/* SECTION 1: About Me */}
      <section className="flex flex-col md:flex-row items-center gap-20 justify-between">
        {/* Left - Text */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">About Me</h1>
          <p className="text-xl text-gray-700 dark:text-gray-700 leading-relaxed">
            <samp className='font-semibold text-2xl'>H</samp>i, I'm <span className="font-bold text-blue-600">Animesh Dey</span>,
            an enthusiastic drawing teacher and artist. I specialize in helping students develop painting, craftwork, and digital art skills.
          </p>
          <p className="mt-4 text-xl text-gray-700 dark:text-gray-700">
            With years of experience in creative and academic environments, I help students of all levels express their creativity.
          </p>
          <p className="mt-4 text-xl text-gray-700 dark:text-gray-700">
            Let's explore the world of art together!
          </p>
          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <a
              href={cv}
              download
              className="flex items-center justify-center w-auto gap-2 px-6 py-3 bg-yellow-50 text-yellow-500 border-2 font-bold rounded-lg transition duration-200 transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 cursor-pointer shadow-md hover:shadow-yellow-500/30 active:shadow-inner"
            >
              <FaDownload className="h-5 w-5" />
              Download CV
            </a>

            <a
              href={v}
              download
              className="flex items-center justify-center w-auto gap-2 px-6 py-3 bg-blue-50 text-blue-500 border-2 font-bold rounded-lg  transition duration-200 transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 cursor-pointer shadow-md hover:shadow-blue-500/30 active:shadow-inner"
            >
              <FaIdCard className="h-5 w-5" />
              Visiting Card
            </a>
          </div>
        </div>

        {/* Right - Image */}
        <div className="flex-1">
          <img
            src={aboutImg}
            alt="Krishti artist"
            className="w-auto rounded-xl shadow-lg object-contain max-h-[400px] bg-gray-50 hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
      </section>

      {/* SECTION 2: Social Links + Description */}
      <section className="flex flex-col md:flex-row items-center gap-12">
        {/* left - Short Description */}
        <div className="flex-1 relative group">
          <img 
            src={v} 
            alt="Visiting Card" 
            className="w-full h-auto rounded-xl shadow-lg object-cover transition-all duration-300 ease-in-out cursor-pointer
                      border border-gray-200/50 hover:border-gray-300/70
                      group-hover:shadow-xl group-hover:brightness-[1.02]
                      transform group-hover:-translate-y-0.5" 
          />
          <div className="absolute inset-0 rounded-xl pointer-events-none 
                        transition-all duration-300
                        group-hover:bg-gradient-to-t from-gray-900/5 via-transparent to-transparent" />
        </div>

        {/* right - Social Icons */}
        <div className="flex-1 space-y-6">
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative block p-5 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 group`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`${social.bg} ${social.hover} p-4 rounded-xl transition-colors`}
                  >
                    {social.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {social.name}
                    </h3>
                    <p className="text-sm text-gray-500">{social.handle}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <p className="text-center text-gray-600 dark:text-gray-600 mt-6">
            Let's create something amazing together!
          </p>
        </div>
      </section>

      {/* SECTION 3: Full Width Final Text */}
      <section className="w-full text-left space-y-6">
        <p className="text-xl text-gray-700 dark:text-gray-700">
          <samp className='font-bold text-2xl'>W</samp>e are moving forward uninterruptedly days after days, years after
          years and decades after decades depending on the essence of the word
          ‘creation’ only. Our world is one of the many creations of the
          Almighty in this universe. He has shaped this world into today’s
          matured one through ups and downs of time. In this divers play of
          creation we have not only discovered many unique things, we have
          also lost many. Though, an old one passes away to make room for a
          new one in keeping with the dictum ‘one that has a life, must die’.
          Yet, we try harder and harder to keep the reminiscences of the past.
        </p>
        <p className="text-xl text-gray-700 dark:text-gray-800 leading-relaxed">
          <samp className='font-bold text-2xl'>A</samp>lmighty, while creating this world very tactfully mingled the
          inanimate objects like hills, rivers and water with the animated
          world. Among those creations, he has made human beings special by his
          delicate and cognitive touches with the belief that, in future they
          will play an active role in his creative works.
        </p>
        <p className="text-xl text-gray-700 dark:text-gray-800 leading-relaxed">
          <samp className='font-bold text-2xl'>N</samp>ow, we come to the discussion of ‘art’. Nature has not only destroyed
          but also created innumerable things with his play of destruction and
          reconstruction in an endless manner. We are fascinated by the charming
          beauties of nature. When we come to the discussion of birds, animals
          and insects, we observe that a bird weaves its nest with the help of
          grass and hay-particles; a fascinating exhibition of art. Again a
          spider makes its monumental net with its own body fluid which is the
          main source of collecting food. We are enthralled by the charming
          beauties of a grass flower lying on the ground or a sunflower heading
          towards the sun or by the unique structure of the leaves of different
          trees. Maintaining the proper geometric shapes, a honeybee makes a
          beehive for future generation. There are so many beautiful things of
          this type which are the gift of nature. These are called natural or
          supernatural art. Here nature directly or indirectly shows his own
          craftsmanship.
        </p>
        <p className="text-xl text-gray-700 dark:text-gray-800 leading-relaxed">
          <samp className='font-bold text-2xl'>T</samp>hen, when we come to the creation of art by human beings, we must
          confess that we are creation of nature. Here we must say that the
          nature is the omnipresent creator of all creative skills. Because by
          taking the ideas from nature we drench our delicate feelings with
          nature’s beauty and then express to others. The art or artistic
          beauties of a human being is bound to be influenced by the
          socio-cultural aspects of a particular province. Again that art
          changes the socio-cultural background of a society in a gap of long
          years. There are various ways of expressing the internal creativity by
          means of which we exhibits various types of artistic skills and
          crafts. Art like sketching, drawing and architectural constructions
          belong to visual art. Whereas novel, epic, short stories and poetry
          belong to literature. On the other hand dancing, singing and drama etc
          belong to cultural art. In recent times, photography has earned a vast
          place in the era of visual art.
        </p>
        <p className="text-xl text-gray-700 dark:text-gray-800 leading-relaxed">
          <samp className='font-bold text-2xl'>B</samp>arring the real life representation of creative emotions, we also
          express creativity in the field of our basic needs like foods,
          clothing and lodging uninterruptedly. Whereas we are experimenting new
          flavors in the field of cooking, we are making new designs in the
          section of building and garments. To sum up, ’every creative work is
          an art’. And by expressing our internal creativity we are continuously
          creating something new, may be for our daily needs or for luxury. We
          have been able to keep nature’s faith in human beings in creating new
          artistic beauties. That is why nature is still reigning in its various
          charming forms in different manner. The joy of creation is
          unimaginable. In human society, only a mother can feel the ecstatic
          joy of creation mostly.
        </p>
      </section>
    </div>
  );
}
