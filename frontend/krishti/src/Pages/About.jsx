import React, { useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaDownload,
  FaIdCard
} from "react-icons/fa";

import aboutImg from "../assets/logos/Animesh.jpg";
import v from "../assets/logos/V Card.jpg";
import cv from "../assets/logos/Bio-data.jpg";

import p from "../assets/images/Parents-1.jpg";
import p1 from "../assets/images/Parents-2.jpg";

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
    name: "Twitter",
    handle: "@deyanimeshdey",
    icon: <FaTwitter className="w-6 h-6 text-red-400" />,
    bg: "bg-rose-50",
    hover: "hover:bg-rose-100",
    link: "https://x.com/deyanimeshdey?t=_qdE8MAJzB93h2pcyAE-ZA&s=09",
  },
];

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
      {/* SECTION 1: About Me */}
      <section className="flex flex-col lg:flex-row items-center gap-10 justify-between">
        {/* Left - Text */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">About Me</h1>
          <p className="font-semibold italic text-lg text-gray-700 dark:text-gray-800 leading-relaxed">
            <samp className='font-semibold text-2xl'>H</samp>i, I'm <a href="https://www.facebook.com/animesh.dey.5209/" target="_blanck"><span className="font-bold text-blue-600">Animesh Dey</span></a>,
            an enthusiastic drawing teacher and artist. I specialize in helping students develop their skills in painting, craftwork, and digital art.
          </p>
          <p className="mt-2 font-semibold italic text-lg text-gray-700 dark:text-gray-800">
           I live in Birsingh, a remote village in Bankura district of West Bengal, India. I have had a deep love for art since childhood. After graduating from <a href="https://maps.app.goo.gl/ep7LJWnhCANJNqSn6" target="_blanck" className="text-blue-600">Sonamukhi College</a> under <a href="https://maps.app.goo.gl/7ehM2kxwzt6Xyxcz5" target="_blanck" className="text-blue-600">Burdwan University</a>, I joined an art college <a href="https://maps.app.goo.gl/oYDz7Vh8Q1MfQVXx6" target="_blanck" className="text-blue-600">(College of Art and Design)</a> in Burdwan in 2009. After studying visual arts for two years, I completed my D.V.A. in 2011 with 1st class 1st.
          </p>
          <p className="mt-2 font-semibold italic text-lg text-gray-700 dark:text-gray-800">
            Later, I worked on several government projects. I worked as a master trainer in design training for weavers and taught hand batik to college girls for skill development in various government projects.
          </p>
          <p className="mt-2 font-semibold italic text-lg text-gray-700 dark:text-gray-800">
            I always strive to immerse students in the world of creativity.
          </p>
          
        </div>

        {/* Right - Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={aboutImg}
            alt="Krishti artist"
            className="w-auto rounded-xl shadow-lg object-contain max-h-[400px] bg-gray-50 hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
      </section>

      

      {/* SECTION 2: Social Links + Description */}
      <section className="flex flex-col-reverse lg:flex-row items-center gap-12">
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
        <div className="flex-1 space-y-6 w-full">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            <a
              href={cv}
              download
              className="flex items-center justify-center w-auto gap-2 px-6 py-5 bg-yellow-50 text-yellow-500 border-2 font-bold rounded-lg transition duration-200 transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 cursor-pointer shadow-md hover:shadow-yellow-500/30 active:shadow-inner"
            >
              <FaDownload className="h-5 w-5" />
              Download CV
            </a>

            <a
              href={v}
              download
              className="flex items-center justify-center w-auto gap-2 px-6 py-5 bg-blue-50 text-blue-500 border-2 font-bold rounded-lg  transition duration-200 transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 cursor-pointer shadow-md hover:shadow-blue-500/30 active:shadow-inner"
            >
              <FaIdCard className="h-5 w-5" />
              Visiting Card
            </a>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
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
        </div>
      </section>

        {/* Flex container - column on mobile, row on desktop */}
        <section className="flex flex-col md:flex-row gap-10 md:gap-10 items-center justify-between">
          {/* Text - full width on mobile, 50% on desktop */}
          <div className="w-full md:w-1/2">
            <p className="text-gray-600 dark:text-gray-800 font-semibold italic text-xl md:text-xl">
              My father, Anath Saran Dey, is a skilled weaver. He earns his livelihood by weaving pure silk sarees on a handloom at home. My mother, Dipali Dey, is a homemaker. Besides managing household chores, she is also highly skilled in various crafts. Before I learned art in school and college, I first learned different forms of handicraft from my mother.
            </p>
          </div>
        
          {/* Image - full width on mobile, 50% on desktop */}
          <div className="flex w-full md:w-1/2 lg:w-1/2">
            {/* Mobile/Tablet Image (hidden on desktop) */}
            <div className="w-full flex justify-center lg:hidden">
              <img
                src={p1}
                alt="Handloom weaving (Mobile)"
                className="max-w-full h-auto object-cover rounded-lg shadow-sm transition duration-300 hover:scale-[1.03] cursor-pointer"
                loading="lazy"
              />
            </div>

            {/* Desktop/TV Image (hidden on mobile/tablet) */}
            <div className="hidden lg:flex justify-center">
              <img
                src={p}
                alt="Handloom weaving (Desktop)"
                className="max-w-full h-auto object-cover rounded-lg shadow-sm transition duration-300 hover:scale-[1.03] cursor-pointer"
                loading="lazy"
              />
            </div>
          </div>
      </section>
      

      {/* SECTION 3: Full Width Final Text */}
      <section className="w-full text-left space-y-4">
        <p className="text-xl text-gray-700 dark:text-gray-800">
          <samp className='font-bold text-2xl'>W</samp>e have been moving forward—day after day, year after year, and decade after decade—relying solely on the essence of the word creation.
            Our world is one of the countless creations of the Almighty in this vast universe. He has shaped it into what it is today through the passage of time—through its many ups and downs. In this diverse play of creation, we have not only discovered many unique things, but we have also lost many. An old creation fades away to make space for the new, in accordance with the eternal truth: "everything that lives must die." Yet, we continue to try our best to preserve the memories of the past.
        </p>
        <p className="text-xl text-gray-700 dark:text-gray-800 leading-relaxed">
          <samp className='font-bold text-2xl'>A</samp>lmighty, While creating this world, the Almighty skillfully blended inanimate objects—like hills, rivers, and water—with the living world. Among these creations, human beings were made special through His delicate and thoughtful touch, with the belief that they would one day actively participate in His creative process.
        </p>
        <p className="text-xl text-gray-700 dark:text-gray-800 leading-relaxed">
          <samp className='font-bold text-2xl'>N</samp>ow, let us turn to the subject of art.
            Nature, in its continuous process of destruction and reconstruction, has not only destroyed but also created countless wonders. We are mesmerized by the beauty of nature. When we look at birds, animals, or insects, we see examples of artistic brilliance:
            A bird weaves its nest using grass and twigs—an amazing expression of natural art.
            A spider spins a remarkable web with fluid from its own body—a vital structure for catching food.
            We are captivated by the beauty of a small grass flower lying on the ground, a sunflower turning toward the sun, or the unique shapes of leaves from different trees.
            A honeybee constructs a beehive with perfect geometric precision for future generations. These are just a few examples of nature's creative masterpieces—commonly referred to as natural or supernatural art. In these, nature showcases its own craftsmanship, directly or indirectly.
        </p>
        <p className="text-xl text-gray-700 dark:text-gray-800 leading-relaxed">
          <samp className='font-bold text-2xl'>T</samp>hen, When we talk about art created by humans, we must acknowledge that we ourselves are products of nature.
            Thus, nature is the ultimate source of all creative skills. We take inspiration from nature, blend it with our emotions, and express it through art.
            Human artistic expression is influenced by the socio-cultural background of a particular place or community. Over time, art itself influences and transforms that culture.

            There are many ways to express inner creativity. Forms like sketching, painting, and architecture fall under visual arts.
            Novels, epics, short stories, and poetry belong to literary arts.
            Dance, music, and drama are part of performing or cultural arts.
            In recent times, photography has also emerged as a powerful form of visual art.
        </p>
        <p className="text-xl text-gray-700 dark:text-gray-800 leading-relaxed">
          <samp className='font-bold text-2xl'>B</samp>arring artistic representation of emotions, we also apply creativity to meet our basic needs—food, clothing, and shelter.
            As we explore new tastes in cooking, we also experiment with new designs in clothing and architecture.
            In short, every creative work is a form of art.
            Through creativity—whether for daily necessity or luxury—we continuously give birth to something new.
            This is how we uphold nature's faith in human beings as creators.
            As a result, nature continues to thrive in its endless, enchanting forms.
            The joy of creation is indescribable. In human society, only a mother can truly understand the ecstatic bliss of creation.
        </p>
      </section>
    </div>
  );
}
