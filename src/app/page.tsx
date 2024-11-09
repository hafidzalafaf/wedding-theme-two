'use client'
import BottomRightFlowers from '../components/bottom-right-flowers';
import BottomLeftFlowers from '../components/bottom-left-fowers';
import TopFlowers from '../components/top-flowers';
import FlowersFallLeft from '../components/flowers-fall-left';
import FlowerdFallRight from '../components/flowers-fall-right';
import { AnimatePresence, motion } from 'framer-motion'; 
import { animationConfig, FadeIn, FadeIn2, FadeIn3, FadeOut } from '../utils/GsapAnimation';
import { useEffect, useRef, useState } from 'react';
import Birds from '../components/birds';  
import Slider from "react-slick";
import FlowersLeft from '../components/flowers-left';
import FlowersRight from '../components/flowers-right';
import Countdown from '../components/countdown';
// import AOS from "aos";
// import "aos/dist/aos.css";
import CopyToClipboard from '../components/copyToClipboard';
import axios from 'axios';

export default function Home() {
  const [state, setState] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [showKado, setShowKado] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [comments, setComments] = useState<any[]>([]);
  const [nameInvite, setNameInvite] = useState<string | null>(null);

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false
  };
  var settings2 = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [audioRef]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs";
    script.type = "module";
    document.body.appendChild(script);
}, []);
 
const fetchComments = async () => {
  try {
    const response = await fetch('/api/ucapan',{
      method: 'GET'
    });
    const data = await response.json(); 
    setComments(data);
  } catch (error) {
    console?.error('Error fetching comments:', error);
  }
};



 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!name || !message) return;

  try { 
    const response = await fetch('/api/ucapan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, message }),
    });
    console.log('name', name)
    console.log('message', message)

    setName('');  
    setMessage('');
    fetchComments()
  } catch (error) {
    console.error('Error submitting comment:', error);
  }
};

useEffect(() => {
  fetchComments();   
}, []);



  useEffect(() => {
    // Ambil parameter dari URL
    const queryName = new URLSearchParams(window.location.search).get('to');
    if (queryName) {
      setNameInvite(queryName);
    } else {
      setNameInvite(null);
    }
    
  }, []);

 

  // Jika tidak ada nama, maka tidak menampilkan apapun
  if (!nameInvite) {
    return null; // Sama dengan menghapus elemen saat tidak ada nama
  }

  const handleSaveTheDate = () => {
    const date = new Date('2024-10-21T10:00:00'); // Ganti dengan tanggal acara
    const title = 'Undangan Pernikahan Hafidz & Nindhi';
    const description = 'Jangan lupa untuk hadir di acara kami! Terima Kasih';
    
    // Menampilkan alert
    alert(`Tanggal disimpan: ${date.toLocaleString()}\nJudul: ${title}\nDeskripsi: ${description}`);

    // Menambahkan event ke kalender
    const calendarUrl = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(title)}&dates=${formatDateForCalendar(date)}&details=${encodeURIComponent(description)}`;
    
    window.open(calendarUrl, '_blank');
  };

  const formatDateForCalendar = (date: Date) => {
    const start = date.toISOString().replace(/-|:|\.\d{3}/g, ''); // Format: YYYYMMDDTHHMMSSZ
    const end = new Date(date.getTime() + 2 * 60 * 60 * 1000) // Tambahkan 2 jam
      .toISOString()
      .replace(/-|:|\.\d{3}/g, ''); // Format: YYYYMMDDTHHMMSSZ
    return `${start}/${end}`;
  };
  return (
    <> 
    <AnimatePresence>
    {
      state === 1 && (
      <motion.section variants={FadeOut} initial="hidden" animate="visible" exit="exit" transition={{ duration: 2 }} style={{backgroundImage:'url(/assets/images/background.webp)'}} className='w-full h-screen bg-[#f1f2ed]  overflow-y-hidden overflow-x-hidden'>
        <div className="py-10 flex justify-center items-center h-full relative">
            
          <div className="flex flex-col gap-5 md:gap-6 lg:gap-7 xl:gap-8 2xl:gap-10 relative z-10">
            <motion.div variants={FadeIn} initial="hidden" animate="visible" exit="exit" transition={{ duration: 2 }} className="w-52 h-60 md:h-60 md:w-48 lg:h-80 lg:w-60 xl:h-80 xl:w-60 2xl:h-96 2xl:w-72 rounded-full mx-auto border-8 border-white">
              <img src="/assets/images/couple-2.webp" className='w-full h-full rounded-full object-cover' alt="couple image" />
            </motion.div>
            <motion.p variants={FadeIn} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.5 , delay: 0.3}} className='inter-font text-center font-semibold text-[#084c6e] text-lg md:text-xl lg:text-xl xl:text-xl 2xl:text-2xl ' >The Wedding Of</motion.p>
            <motion.h1 variants={FadeIn} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.5, delay:0.8 }} className='spring-font font-bold text-center text-4xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-9xl text-[#084c6e]'>Hafidz & Nindhi</motion.h1>
            <div className="flex flex-col gap-2 md:gap-3">
              <motion.div variants={FadeIn} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.5,delay:1.1 }} className='inter-font text-center font-semibold text-[#084c6e] text-md md:text-md lg:text-lg' id="guest-name">Kepada Yth Bapak/Ibu/Saudara/i</motion.div>
              <motion.p variants={FadeIn} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.5,delay:1.4 }} className='text-center font-medium text-[#084c6e] text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-4xl playball-font' >{nameInvite}</motion.p>
            </div>
            <div className=" flex justify-center">
              <motion.button onClick={()=> {
                playMusic()
                setState(2)
                }} variants={FadeIn2} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.5, delay:1.7 }} className='px-6 py-3 rounded-3xl bg-[#084c6e] text-white shadow-2xl shadow-slate-800 xl:text-xl 2xl:text-xl'><i className="fa-solid fa-book-open mr-2 text-white"></i>Buka Undangan</motion.button>
            </div>
          </div>
          
          {FlowersFallLeft()}
          {FlowerdFallRight()}
          {BottomRightFlowers()}
          {BottomLeftFlowers()}
          {TopFlowers()}
 
        </div>
      </motion.section>
      )
    }
    {
      state === 2 && (
        <motion.div variants={FadeIn3} initial="hidden" animate="visible" exit="exit" transition={{ duration: 2 }} className="relative h-screen overflow-hidden">
          <div className="flex">
            <section style={{background: 'url(/assets/images/couple-12.webp)'}} className=' h-screen hidden md:block w-full !bg-cover !bg-no-repeat !bg-center'>
              <div className="bg-gray-800 bg-opacity-80 h-screen w-full flex justify-center items-center">
                <div className="flex flex-col gap-9">
                  <motion.p variants={FadeIn} initial="hidden" animate="visible" exit="exit" transition={{ duration: 1 , delay: 0.2}} className='inter-font text-center font-semibold text-slate-200 text-lg md:text-xl lg:text-xl xl:text-xl 2xl:text-2xl ' >The Wedding Of</motion.p>
                  <motion.h1 variants={FadeIn} initial="hidden" animate="visible" exit="exit" transition={{ duration: 1, delay:0.5 }} className='spring-font font-bold text-center text-4xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-[160px] text-slate-200'>Hafidz & Nindhi</motion.h1>
                  <motion.p variants={FadeIn} initial="hidden" animate="visible" exit="exit" transition={{ duration: 1,delay:0.8 }} className='inter-font text-center font-semibold text-slate-200 text-lg md:text-xl lg:text-xl xl:text-xl 2xl:text-2xl' >21.10.2024</motion.p> 
                  <div className="flex justify-center">
                    <motion.button onClick={handleSaveTheDate}  variants={FadeIn2} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.5, delay:1 }} className='px-6 py-3 rounded-3xl bg-[#084c6e] text-white shadow-2xl shadow-slate-800 xl:text-xl 2xl:text-xl'><i className="fa-solid fa-calendar mr-2 text-white"></i>Save The Date</motion.button>
                  </div>
                </div>
              </div>
            </section>
            <aside className='max-w-full md:max-w-[480px] w-full bg-[#1e293b] h-screen overflow-y-auto overflow-x-hidden relative'>
              {/* SECTION SALAM */}
              <section style={{
                background: 'url(/assets/images/background-2.webp)'
              }} className='h-screen w-full !bg-cover !bg-no-repeat !bg-bottom relative flex justify-center items-center '>
                {Birds()}
                <div className="px-6 flex flex-col gap-4 mb-60">
                  <motion.h6 initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }} className='text-center quicksand-font font-bold text-slate-600'>Assalamu'alaikum Wr.Wb.</motion.h6>
                  <motion.p initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }} className='text-center quicksand-font text-slate-600'>Tanpa mengurangi rasa hormat, dengan memohon Rahmat & Ridho Allah SWT,
                      kami bermaksud mengundang
                      Bapak/ Ibu/ Saudara/ I pada
                      acara resepsi pernikahan 
                      kami.
                  </motion.p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-transition-top"></div>
              </section> 
              
              {/* SECTION  MEMPELAI */}
              <section className='w-full relative overflow-hidden'>
                <div className="px-6 py-10 bg-[#084c6e] bg-opacity-90 flex flex-col gap-4 overflow-hidden">
                  <div style={{
                    background: 'url(/assets/images/background.webp)'
                  }} className=" flex flex-col gap-4 bg-slate-200 rounded-3xl py-10 !bg-cover !bg-no-repeat !bg-top relative overflow-hidden">
                  {FlowersLeft()} 
                  {FlowersRight()} 
                    <motion.div initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }}  className="w-52 h-72 md:h-60 md:w-48 lg:h-80 lg:w-60 xl:h-80 xl:w-60 2xl:h-96 2xl:w-72 rounded-full overflow-hidden mx-auto border-4 border-slate-300">
                      <Slider {...settings2}>
                        <img src="/assets/images/couple-13.webp" className=' w-full h-full object-cover' alt="couple image" />
                        <img src="/assets/images/couple-15.webp" className=' w-full h-full object-cover' alt="couple image" />
                        <img src="/assets/images/couple-17.webp" className=' w-full h-full object-cover' alt="couple image" />
                      </Slider>
                    </motion.div>
                    <motion.h6 initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.8 }} className='text-center spring-font text-[#084c6e] font-medium text-3xl'>Hafidz Al Afaf, S.Kom</motion.h6>
                    <motion.p initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 1 }} className='text-center text-xs font-normal quicksand-font text-[#084c6e]'>Putra pertama dari Bapak H.Wachyudi dan Ibu Tarliyah</motion.p>
                    <motion.div initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 1.3 }}className="flex justify-center">
                    <a href="https://www.instagram.com/hafidz00/" target='_blank' className='text-[#084c6e] text-center bg-white rounded-xl px-3 py-1 text-sm border border-[#084c6e]'><i className="text-md fa-brands fa-square-instagram"></i> @hafidz00</a>
                    </motion.div>
                    <motion.h6 initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }} className='text-center spring-font text-[#084c6e] font-medium text-4xl my-10'>&</motion.h6>
                    <motion.div initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.8 }}className="w-52 h-72 md:h-60 md:w-48 lg:h-80 lg:w-60 xl:h-80 xl:w-60 2xl:h-96 2xl:w-72 rounded-full overflow-hidden mx-auto border-4 border-slate-300">
                      <Slider {...settings}>
                        <img src="/assets/images/couple-37.webp" className=' w-full h-full object-cover' alt="couple image" />
                        <img src="/assets/images/couple-8.webp" className=' w-full h-full object-cover' alt="couple image" />
                        <img src="/assets/images/couple-30.webp" className=' w-full h-full object-cover' alt="couple image" />
                        <img src="/assets/images/couple-29.webp" className=' w-full h-full object-cover' alt="couple image" />
                        <img src="/assets/images/couple-50.webp" className=' w-full h-full object-cover' alt="couple image" />
                        <img src="/assets/images/couple-45.webp" className=' w-full h-full object-cover' alt="couple image" />
                        <img src="/assets/images/couple-36.webp" className=' w-full h-full object-cover' alt="couple image" />
                        <img src="/assets/images/couple-38.webp" className=' w-full h-full object-cover' alt="couple image" />
                        <img src="/assets/images/couple-39.webp" className=' w-full h-full object-cover' alt="couple image" />
                      </Slider>
                    </motion.div>
                    <motion.h6 initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 1 }} className='text-center spring-font text-[#084c6e] font-medium text-3xl'>Anindhias Raradhita, S.Pd</motion.h6>
                    <motion.p initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 1.2 }} className='text-center text-xs font-normal quicksand-font text-[#084c6e]'>Putri kedua dari Bapak Umono dan Ibu Ruliyah</motion.p>
                    <motion.div initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 1.5 }} className="flex justify-center">
                    <a href="https://www.instagram.com/anindhias_raradhita/" target='_blank' className='text-[#084c6e] text-center bg-white rounded-xl px-3 py-1 text-sm border border-[#084c6e]'><i className="text-md fa-brands fa-square-instagram"></i> @anindhias_raradhita</a>
                    </motion.div>
                  </div>
                </div>  
              </section>

              {/* SECTION   QUOTE */}
              <section className='w-full relative overflow-hidden'>
                <div className="px-6 py-20 bg-white flex flex-col gap-4 overflow-hidden relative">
                  {FlowersLeft()} 
                  {FlowersRight()} 
                   <div className="px-10">
                      <motion.p 
                        initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }} 
                        className='text-sm leading-6 font-normal quicksand-font text-[#084c6e] text-center'>“Dan diantara tanda-tanda kekuasaanNya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikanNya diantaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.”</motion.p>
                      <motion.p initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.8 }} className='text-sm leading-6 font-normal quicksand-font text-[#084c6e] text-center mt-5'>(Qs. Ar. Rum (30) : 21)</motion.p>
                   </div> 
                </div>  
              </section>
              
              
              {/* SECTION  ACARA */}
              <section style={{
                background: 'url(/assets/images/background-2.webp)'
              }} className='min-h-screen w-full !bg-cover !bg-no-repeat !bg-bottom   relative   overflow-hidden'>
                {FlowersFallLeft()}
                {FlowerdFallRight()}

                <div className="py-14 w-full px-16 flex flex-col gap-6">
                <motion.h6 initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }}  className='text-center spring-font text-[#084c6e] mt-3 font-medium text-5xl'>Wedding Event</motion.h6>
                  <motion.div initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }}  className="w-52 h-52 md:h-48 md:w-48 lg:h-60 lg:w-60 xl:h-60 xl:w-60 2xl:h-72 2xl:w-72 rounded-full overflow-hidden mx-auto border-4 border-slate-300">
                    <img src="/assets/images/couple-2.webp" className=' w-full h-full object-cover' alt="couple image" />
                  </motion.div>
                  <div style={{
                    background: 'url(/assets/images/background.webp)'
                  }} className="bg-white p-4 rounded-2xl border-4 border-slate-300 flex flex-col gap-5 !bg-cover !bg-no-repeat !bg-bottom">
                    <motion.h6 initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }}  className='text-center spring-font text-[#084c6e] mt-3 font-medium text-4xl'>Akad Nikah</motion.h6>
                    <div  className="flex flex-col gap-1 ">
                      <motion.p initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }}  className='text-sm leading-6 font-semibold quicksand-font text-slate-600 text-center'>Minggu, 20 Oktober 2024</motion.p>
                      <motion.p initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }}  className='text-sm leading-6 font-normal quicksand-font text-slate-600 text-center'><i className="fa-solid fa-clock"></i> Pukul 07.00</motion.p>
                      <motion.p initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }}  className='text-sm leading-6 font-normal quicksand-font text-slate-600 text-center'> Lokasi : Rumah mempelai wanita</motion.p>
                      <motion.div initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }}  className="">
                      <Countdown date='2024-10-20T07:00:00'/>
                      </motion.div>
                    </div>
                  </div>
                  <div style={{
                    background: 'url(/assets/images/background.webp)'
                  }} className="bg-white p-4 rounded-2xl border-4 border-slate-300 flex flex-col gap-5 !bg-cover !bg-no-repeat !bg-bottom">
                    <div className="">
                    <motion.p initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }}  className='text-sm leading-6 font-normal mt-3 quicksand-font text-slate-600 text-center'> Kami mengundang bapak/ibu/saudara pada :</motion.p>
                    <motion.h6 initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }}  className='text-center spring-font text-[#084c6e]  font-medium text-4xl mt-2'>Resepsi</motion.h6>
                    </div>
                    <div  className="flex flex-col gap-1 ">
                      <motion.p initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }}  className='text-sm leading-6 font-semibold quicksand-font text-slate-600 text-center'>Senin, 21 Oktober 2024</motion.p>
                      <motion.p initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }}  className='text-sm leading-6 font-normal quicksand-font text-slate-600 text-center'><i className="fa-solid fa-clock"></i> Pukul 10.00</motion.p>
                      <motion.p initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }}  className='text-sm leading-6 font-normal quicksand-font text-slate-600 text-center'> Lokasi : Rumah mempelai wanita</motion.p>
                      <motion.div initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }}  className="">
                      <Countdown date='2024-10-21T10:00:00'/>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </section>

              

              {/* SECTION  STORY */}
              <section style={{
                background: 'url(/assets/images/couple-20.webp)'
              }} className=' w-full !bg-cover !bg-no-repeat !bg-bottom relative flex justify-center items-center overflow-hidden'>
                {FlowersFallLeft()}
                {FlowerdFallRight()}
                <div className="bg-white bg-opacity-90 py-10 w-full ">
                  <div className="px-8 flex flex-col gap-4">
                    <motion.h6  initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }} className='text-center spring-font text-[#084c6e] mt-3 font-medium text-5xl'>Love Story</motion.h6>

                    <motion.img initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }} src="/assets/pattern/devider.png" className='w-full m-auto' alt="title image" />
                    <motion.h6 initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }} className='text-center quicksand-font text-slate-700 mt-3 font-semibold text-lg'>Pertemuan</motion.h6>
                    <motion.p initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }} className=' text-xs leading-5 font-normal quicksand-font text-slate-600 text-justify'>Tidak ada yang kebetulan di dunia ini, semua sudah tersusun rapi oleh sang maha kuasa, kita tidak bisa memilih kepada siapa kita akan jatuh cinta. 
Perkenalan kita dimulai sejak kecil, tepatnya dari TK kita sudah berteman. Tidak ada yang pernah menyangka bahwa pertemanan itu membawa kami pada suatu ikatan cinta yang suci ini.</motion.p>
                    <motion.h6 initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }} className='text-center quicksand-font text-slate-700 mt-3 font-semibold text-lg'>Pendekatan</motion.h6>
                    <motion.p initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }} className=' text-xs leading-5 font-normal quicksand-font text-slate-600 text-justify'>Katanya cinta dapat tumbuh dengan kebersamaan, seiring berjalannya waktu kami semakin dekat dan memutuskan untuk berkomitmen dalam hubungan yang serius. </motion.p>
                    <motion.h6 initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }} className='text-center quicksand-font text-slate-700 mt-3 font-semibold text-lg'>Lamaran</motion.h6>
                    <motion.p initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }} className=' text-xs leading-5 font-normal quicksand-font text-slate-600 text-justify'>Kehendak-Nya menuntun kami pada sebuah pertemuan yang tak pernah disangka hingga akhirnya membawa kami pada sebuah ikatan suci yang dicintai-Nya, kami melangsungkan acara lamaran di bulan Agustus 2023 lalu. MasyaAllah, Seorang laki-laki dengan berani membuktikan Keseriusannya datang kerumah membawa keluarga besarnya.</motion.p>
                    <motion.h6 initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }} className='text-center quicksand-font text-slate-700 mt-3 font-semibold text-lg'>Menikah</motion.h6>
                    <motion.p initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }} className=' text-xs leading-5 font-normal quicksand-font text-slate-600 text-justify'>Percayalah, bukan karena bertemu lalu berjodoh tapi karena berjodoh lah maka kami dipertemukan, kami memutuskan untuk mengikrarkan janji suci pernikahan kami di bulan Oktober ini insyaAllah sebagaimana yang pernah dikatakan oleh sayidina Ali bin Abi Thalib "Apa yang akan menjadi takdirmu akan menemukan jalannya untuk menemukanmu".</motion.p>
                  </div>
                </div>
              </section>

              

              {/* SECTION  MAPS */}
              <section  className=' w-full bg-[#084c6e] relative py-10   overflow-hidden '>
              <motion.h6 initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }} className='text-center spring-font text-white mt-3 font-medium text-5xl'>Maps</motion.h6>
                <div className="  py-10 px-10 w-full ">
                  <motion.div initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }} className="">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d247.5105818159736!2d109.89608443537789!3d-6.9893290644635115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sid!2sid!4v1728487354780!5m2!1sid!2sid" className='w-full h-60 rounded-lg'    loading="lazy"  ></iframe>
                  </motion.div>
                  <div className="flex justify-center mt-6">
                    <motion.a initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }}  href='https://maps.app.goo.gl/sD3JT3DVtfbz2rAK9' target='_blank' className='px-5 py-2 rounded-3xl bg-white text-[#084c6e] shadow-2xl shadow-slate-800 font-semibold text-md'><i className="fa-solid fa-map-location"></i> Lihat Maps</motion.a>
                  </div>
                </ div>
              </section>


              {/* SECTION  GALLERY  */}
              <section  className='w-full bg-white  relative pt-20 pb-0 overflow-hidden '>
                {TopFlowers()}
                <motion.h6 initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }} className='text-center spring-font text-[#084c6e] mt-3 font-medium text-5xl mb-6'>Our Gallery</motion.h6>
                <motion.div initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }} className=" w-full h-[600px] overflow-hidden mx-auto bg-[#084c6e]">
                  <Slider {...settings2}>
                    <img src="/assets/images/couple-1.webp" className=' w-full h-full object-cover align-middle' alt="couple image" />
                    <img src="/assets/images/couple-33.webp" className=' w-full h-full object-cover align-middle' alt="couple image" />
                    <img src="/assets/images/couple-4.webp" className=' w-full h-full object-cover align-middle' alt="couple image" />
                    <img src="/assets/images/couple-9.webp" className=' w-full h-full object-cover align-middle' alt="couple image" /> 
                    <img src="/assets/images/couple-20.webp" className=' w-full h-full object-cover align-middle' alt="couple image" /> 
                    <img src="/assets/images/couple-2.webp" className=' w-full h-full object-cover align-middle' alt="couple image" /> 
                    <img src="/assets/images/couple-23.webp" className=' w-full h-full object-cover align-middle' alt="couple image" /> 
                    <img src="/assets/images/couple-24.webp" className=' w-full h-full object-cover align-middle' alt="couple image" /> 
                    <img src="/assets/images/couple-25.webp" className=' w-full h-full object-cover align-middle' alt="couple image" /> 
                    <img src="/assets/images/couple-26.webp" className=' w-full h-full object-cover align-middle' alt="couple image" /> 
                    <img src="/assets/images/couple-27.webp" className=' w-full h-full object-cover align-middle' alt="couple image" /> 
                    <img src="/assets/images/couple-28.webp" className=' w-full h-full object-cover align-middle' alt="couple image" /> 
                    <img src="/assets/images/couple-41.webp" className=' w-full h-full object-cover align-middle' alt="couple image" /> 
                    <img src="/assets/images/couple-42.webp" className=' w-full h-full object-cover align-middle' alt="couple image" /> 
                    <img src="/assets/images/couple-43.webp" className=' w-full h-full object-cover align-middle' alt="couple image" /> 
                    <img src="/assets/images/couple-44.webp" className=' w-full h-full object-cover align-middle' alt="couple image" /> 
                  </Slider>
                </motion.div>
              </section>

                {/* SECTION GIFT */}
              <section  className=' w-full bg-[#084c6e] relative py-10   overflow-hidden '>
                   
                <div className="  py-10 px-10 w-full flex flex-col gap-6 ">
                  <div style={{
                    background: 'url(/assets/images/background.webp)'
                  }} className="bg-white p-4 rounded-2xl border-4 border-slate-300 flex flex-col gap-5 !bg-cover !bg-no-repeat !bg-bottom">
                    <motion.h6 initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }}  className='text-center spring-font text-[#084c6e] mt-3 font-medium text-4xl'>Wedding Gift</motion.h6>
                    <div  className="flex flex-col gap-1 ">
                      <motion.p initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }}  className='text-md leading-6 font-normal quicksand-font text-slate-600 text-center'> Doa Restu Anda merupakan
                        karunia yang sangat berarti
                        bagi kami.
                        </motion.p>
                      <motion.p initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }}  className='text-md leading-6 font-normal quicksand-font text-slate-600 text-center'>Namun jika Anda ingin
                        memberikan hadiah, kami
                        sediakan fitur berikut:</motion.p>
                      
                        <div className="flex flex-col gap-6 mt-10">
                        <div className="flex justify-center">
                          <motion.button onClick={() => {
                            setShowGift(!showGift) 
                            setShowKado(false)}
                            }  variants={FadeIn2} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.5, delay:1 }} className='px-6 py-3 w-48 rounded-3xl bg-[#084c6e] text-white shadow-2xl shadow-slate-800 xl:text-xl 2xl:text-xl'><i className="fa-solid fa-gift"></i> Hadiah</motion.button>
                        </div>
                        <div className="flex justify-center">
                          <motion.button onClick={() => {
                            setShowKado(!showKado)
                            setShowGift(false)
                          }}  variants={FadeIn2} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.5, delay:1 }} className='px-6 py-3  w-48 rounded-3xl bg-[#084c6e] text-white shadow-2xl shadow-slate-800 xl:text-xl 2xl:text-xl'><i className="fa-solid fa-gifts"></i> Kado</motion.button>
                        </div>
                        </div>

                       
                    </div>
                  </div>

                  {
                    showGift && (
                      <div style={{
                        background: 'url(/assets/images/background.webp)'
                      }} className="bg-white p-4 rounded-2xl border-4 border-slate-300 flex flex-col gap-5 !bg-cover !bg-no-repeat !bg-bottom">
                         
                        <div  className="flex flex-col gap-1 ">
                        <motion.img initial={animationConfig.initial}
                            whileInView={animationConfig.whileInView}
                            exit={animationConfig.exit}
                            transition={{ duration: 0.5, delay: 0 }} src="/assets/pattern/bca.png" className=' w-32 mx-auto ' alt="couple image" />
                          <motion.p initial={animationConfig.initial}
                            whileInView={animationConfig.whileInView}
                            exit={animationConfig.exit}
                            transition={{ duration: 0.5, delay: 0.3 }}  className='text-md leading-6 font-semibold quicksand-font text-slate-600 text-center'> 8915571634
                            </motion.p>
                          <motion.p initial={animationConfig.initial}
                            whileInView={animationConfig.whileInView}
                            exit={animationConfig.exit}
                            transition={{ duration: 0.5, delay: 0.8 }}  className='text-md leading-6 font-semibold quicksand-font text-slate-600 text-center'>HAFIDZ AL AFAF</motion.p>
                          
                            <div className="flex flex-col mb-6 mt-6">
                              <div className="flex justify-center">
                              <CopyToClipboard textToCopy="8915571634" />
                              </div> 
                            </div>
    
                           
                        </div>
                      </div>
                    )
                  }

                  {
                    showKado && (
                      <div style={{
                        background: 'url(/assets/images/background.webp)'
                      }} className="bg-white p-4 rounded-2xl border-4 border-slate-300 flex flex-col gap-5 !bg-cover !bg-no-repeat !bg-bottom">
                         
                        <div className="flex flex-col gap-1 ">
                          <div className="flex justify-center">
                          <motion.i initial={animationConfig.initial}
                            whileInView={animationConfig.whileInView}
                            exit={animationConfig.exit}
                            transition={{ duration: 0.5, delay: 0 }} className="fa-solid fa-gifts text-4xl my-6 text-[#084c6e]"></motion.i>
                          </div>
                          <motion.p initial={animationConfig.initial}
                            whileInView={animationConfig.whileInView}
                            exit={animationConfig.exit}
                            transition={{ duration: 0.5, delay: 0.3 }}  className='text-md leading-6 font-semibold quicksand-font text-slate-600 text-center'> Kirim kado ke alamat
                            </motion.p>
                          <motion.p initial={animationConfig.initial}
                            whileInView={animationConfig.whileInView}
                            exit={animationConfig.exit}
                            transition={{ duration: 0.5, delay: 0.8 }}  className='text-md leading-6 font-normal quicksand-font text-slate-600 text-center'>  Jalan Desa Keborangan, RT 03/ RW 02 Salam, Keborangan, Subah, Batang 51262</motion.p>
                          <motion.p initial={animationConfig.initial}
                            whileInView={animationConfig.whileInView}
                            exit={animationConfig.exit}
                            transition={{ duration: 0.5, delay: 0.3 }}  className='text-md leading-6 font-semibold quicksand-font text-slate-600 text-center mt-3'> An. Anindhias Raradhita
                            </motion.p>
                            <div className="flex flex-col mb-6 mt-6">
                              <div className="flex justify-center">
                              <CopyToClipboard textToCopy="Jalan Desa Keborangan, RT 03/ RW 02 Salam, Keborangan, Subah, Batang 51262 | An. Anindhias Raradhita" />
                              </div> 
                            </div>
    
                        </div>
                      </div>
                    )
                  }
                </ div>
              </section>
                  
              {/* SECTION UCAPAN */}
              <section style={{
                    background: 'url(/assets/images/background.webp)'
                  }} className="flex flex-col gap-4 bg-slate-200  min-h-screen py-10 !bg-cover !bg-no-repeat !bg-top relative overflow-hidden">
                  {FlowersLeft()} 
                  {FlowersRight()} 
                  <motion.h6 initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }}  className='text-center spring-font text-[#084c6e] mt-3 font-medium text-5xl'>Best Wishes</motion.h6>
                        <motion.p initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }} className='text-sm leading-5 font-normal quicksand-font text-[#084c6e] text-center'>Sampaikan doa dan ucapan terbaik Anda</motion.p>
                    
                    <div className='mx-6 bg-white p-6 rounded-xl relative z-50'>
                      <form onSubmit={handleSubmit}>
                        <input
                          type="text"
                          placeholder="Nama"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className='w-full border-slate-100 p-3 rounded-xl border mb-4'
                        />
                        <textarea
                          placeholder="Ucapan"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                          className='w-full border-slate-100 p-3 rounded-xl border mb-4'
                        />
                        <button type="submit" className='px-6 py-3  w-full rounded-3xl bg-[#084c6e] text-white shadow-2xl shadow-slate-800 xl:text-xl 2xl:text-xl'>Kirim</button>
                      </form>

                      <div className='overflow-auto max-h-96 mt-10'>
                        {comments.map((comment) => (
                          <div key={comment.id} style={{ marginTop: '20px', borderBottom: '1px solid #ccc' }}>
                            <strong>{comment.name}</strong>
                            <p>{comment.message}</p>
                            <small>{new Date(comment.createdAt).toLocaleString()}</small>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section> 

              {/* SECTION  TERIMAKASIH */}
              <section style={{
                background: 'url(/assets/images/couple-2.webp)'
              }} className=' w-full !bg-cover !bg-no-repeat !bg-bottom bg-[#084c6e] relative pb-20 pt-80  flex flex-col justify-end overflow-hidden '>
                <div className="absolute bottom-0 left-0 right-0 h-full bg-transition-top-2"></div>
                <div className="flex flex-col gap-7 px-10">
                  <motion.p initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }} className='text-sm leading-5 font-normal quicksand-font text-white text-center'>Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir dan memberikan do’a restunya untuk pernikahan kami.</motion.p>
                  <motion.p initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }} className=' text-sm leading-5 font-normal quicksand-font text-white text-center'>Atas do’a & restunya, kami ucapkan terima kasih.</motion.p>
                  <motion.h6 initial={animationConfig.initial}
                        whileInView={animationConfig.whileInView}
                        exit={animationConfig.exit}
                        transition={{ duration: 0.5, delay: 0.3 }} className='text-center spring-font text-white mt-3 font-medium text-5xl mb-6'>Hafidz & Nindhi</motion.h6>
                  <div className="">
                    <motion.p initial={animationConfig.initial}
                          whileInView={animationConfig.whileInView}
                          exit={animationConfig.exit}
                          transition={{ duration: 0.5, delay: 0.3 }} className=' text-sm leading-5 font-normal quicksand-font text-white text-center'>Made with <i className="fa-solid fa-heart"></i> by Hafidz Al Afaf</motion.p>
                    <motion.p initial={animationConfig.initial}
                          whileInView={animationConfig.whileInView}
                          exit={animationConfig.exit}
                          transition={{ duration: 0.5, delay: 0.3 }} className=' text-sm leading-5 font-normal quicksand-font text-white text-center'>Visit my instagram <a href="https://www.instagram.com/hafidz00/" target='_blank' className='border-b border-white'> @hafidz00</a></motion.p>
                  </div>
                </div>
              </section>

              {/* <div className="py-6"></div> */}



              <div className="fixed bottom-24 right-5 z-50">
                <button
                  onClick={toggleMusic}
                  className="w-10 h-10 flex justify-center items-center bg-[#084c6e] text-white rounded-full shadow-lg"
                >
                  {isPlaying ? (
                    <>
                      <i className="fa-solid fa-music"></i>
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-pause"></i>
                    </>
                  )}
                </button>
              </div>
              {/* <div className="fixed bottom-0 max-w-[480px] w-full right-0 z-50 flex bg-[#084c6e] justify-between py-2 px-4">
                <button
                  onClick={toggleMusic}
                  className="h-14 w-14 flex justify-center items-center   rounded-lg   flex-col"
                >
                  <i className="fa-solid fa-heart text-white"></i>
                  <span className='text-[10px] text-white'>Mempelai</span>
                </button>
                <button
                  onClick={toggleMusic}
                  className="h-14 w-14 flex justify-center items-center  text-white rounded-lg flex-col  placeholder:"
                >
                  <i className="fa-solid fa-calendar-check text-slate-400"></i>
                  <span className='text-[10px] text-slate-400'>Acara</span>
                </button>
                <button
                  onClick={toggleMusic}
                  className="h-14 w-14 flex justify-center items-center  text-white rounded-lg flex-col "
                >
                 <i className="fa-solid fa-map-location-dot text-slate-400"></i>
                  <span className='text-[10px] text-slate-400'>Map</span>
                </button>
                <button
                  onClick={toggleMusic}
                  className="h-14 w-14 flex justify-center items-center  text-white rounded-lg flex-col "
                >
                  <i className="fa-regular fa-images text-slate-400"></i>
                  <span className='text-[10px] text-slate-400'>Galeri</span>
                </button>
                <button
                  onClick={toggleMusic}
                  className="h-14 w-14 flex justify-center items-center  text-white rounded-lg flex-col "
                >
                  <i className="fa-solid fa-gift text-slate-400"></i>
                  <span className='text-[10px] text-slate-400'>Ucapan</span>
                </button>
              </div> */}
            </aside>
          </div>
        </motion.div>
      )
    }
    </AnimatePresence>
      <audio ref={audioRef} src="/assets/music/background-music.mp3" loop />  
 
    
    </>
  );
}
