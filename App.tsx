import React, { useState, useEffect } from 'react';

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const FloralPattern = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    className={`absolute w-32 h-32 pointer-events-none ${className}`}
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      d="M 2,100 A 40,40 0 0,1 100,100 M 100,2 A 40,40 0 0,1 100,100"
    />
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      d="M 50,15 A 15,15 0 0,1 50,45 M 15,50 A 15,15 0 0,1 45,50"
    />
     <circle cx="100" cy="100" r="3" fill="currentColor" />
     <circle cx="50" cy="50" r="3" fill="currentColor" />
  </svg>
);


const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [guestName, setGuestName] = useState('Quý khách');

  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const name = urlParams.get('name');
      if (name) {
        setGuestName(name);
      }
    } catch (error) {
      console.error("Could not parse URL params:", error);
    }
  }, []);


  const BRIDE_NAME = 'Phương Ngân';
  const GROOM_NAME = 'Văn Quang';
  const VENUE_NAME = 'Cát Tường Garden';
  const VENUE_ADDRESS = 'Cát Tường Garden, 715 Phạm Văn Thuận, Tam Hiệp, Biên Hòa, Đồng Nai';
  const VENUE_MAPS_URL = 'https://www.google.com/maps/place/C%C3%A1t+T%C6%B0%E1%BB%9Dng+Garden/@10.9329068,106.8354898,17z/data=!3m1!4b1!4m6!3m5!1s0x3174de8484fa5aed:0x8f92126089c40a50!8m2!3d10.9329015!4d106.8380647!16s%2Fg%2F11b6b_ytpc?entry=ttu';

  const handleSaveTheDate = () => {
    const event = {
      title: `Đám cưới ${GROOM_NAME} & ${BRIDE_NAME}`,
      description: `Thân mời bạn đến chung vui cùng gia đình chúng tôi.\nThời gian: 11:00, Chủ nhật ngày 09/11/2025\nĐịa điểm: ${VENUE_ADDRESS}`,
      location: VENUE_ADDRESS,
      startTime: new Date('2025-11-09T11:00:00'),
      endTime: new Date('2025-11-09T15:00:00'),
    };

    const formatDate = (date: Date) => {
        return date.toISOString().replace(/-|:|\.\d{3}/g, '');
    };

    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MyWebApp//WeddingInvitation//EN
BEGIN:VEVENT
UID:${Date.now()}@mywebapp.com
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(event.startTime)}
DTEND:${formatDate(event.endTime)}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR
    `.trim();

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'dam-cuoi-quang-ngan.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const getOpacityClass = (delay: string) => {
    return `transition-opacity duration-1000 ${isOpen ? `${delay} opacity-100` : 'opacity-0'}`;
  }
  
  const getFloralAnimationClass = (delay: string) => {
    return isOpen ? `animate-grow-in ${delay}` : 'opacity-0';
  }

  return (
    <>   
      <div className="min-h-screen flex items-center justify-center p-4">
        
        <div style={{ perspective: '1500px' }}>
        <img
          src="https://res.cloudinary.com/dfl9ynmdl/image/upload/v1761628807/566566242_831320209260029_4906185553332539254_n_fseq8f.jpg"
          alt="Wedding photo background"
          className="fixed inset-0 w-full h-full object-cover -z-20"
        />
          <div
            className={`relative w-[90vw] h-[80vh] md:w-[400px] md:h-[600px] transition-transform duration-1000 transform-style-preserve-3d ${isOpen ? 'rotate-y-180' : ''}`}
          >
            {/* Card Front */}
            <div className="absolute w-full h-full backface-hidden bg-white/30 backdrop-blur-sm shadow-2xl rounded-lg overflow-hidden flex flex-col items-center justify-center text-center p-6 border-2 border-amber-300/50">
              <FloralPattern className="top-0 left-0 text-amber-500/50 animate-sparkle" />
              <FloralPattern className="top-0 right-0 transform rotate-90 text-amber-500/50 animate-sparkle" />
              <FloralPattern className="bottom-0 left-0 transform -rotate-90 text-amber-500/50 animate-sparkle" />
              <FloralPattern className="bottom-0 right-0 transform rotate-180 text-amber-500/50 animate-sparkle" />

              <div className="relative z-10 animate-fade-in">
                  <p className="text-amber-700 text-lg tracking-widest">SAVE THE DATE</p>
                  <h1 className="font-dancing-script text-6xl text-amber-800 my-4">{GROOM_NAME}</h1>
                  <p className="font-dancing-script text-4xl text-amber-700">&</p>
                  <h1 className="font-dancing-script text-6xl text-amber-800 my-4">{BRIDE_NAME}</h1>
                  <div className="w-24 h-px bg-amber-400 mx-auto my-6"></div>
                  <p className="text-amber-700 text-xl font-semibold">09 . 11 . 2025</p>

                  <button
                      onClick={() => setIsOpen(true)}
                      className="mt-10 bg-amber-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-amber-700 transition-all transform hover:scale-105"
                  >
                      Mở Thiệp
                  </button>
              </div>
            </div>

            {/* Card Back (Inside) */}
            <div className="absolute w-full h-full backface-hidden bg-white/50 backdrop-blur-sm shadow-2xl rounded-lg overflow-hidden rotate-y-180 p-6 md:p-8 text-center flex flex-col justify-between border-2 border-rose-200/50">
                <FloralPattern className={`top-2 left-2 text-rose-400/60 ${getFloralAnimationClass('delay-500')}`} />
                <FloralPattern className={`top-2 right-2 transform rotate-90 text-rose-400/60 ${getFloralAnimationClass('delay-[600ms]')}`} />
                <FloralPattern className={`bottom-2 left-2 transform -rotate-90 text-rose-400/60 ${getFloralAnimationClass('delay-[700ms]')}`} />
                <FloralPattern className={`bottom-2 right-2 transform rotate-180 text-rose-400/60 ${getFloralAnimationClass('delay-[800ms]')}`} />

              <div className="relative z-10 flex-grow flex flex-col justify-center">
                <p className={`text-gray-600 text-lg ${getOpacityClass('delay-500')}`}>Thân mời</p>
                
                <p className={`font-bold text-xl text-center text-rose-800 bg-transparent transition-all mx-auto w-full my-2 ${getOpacityClass('delay-[600ms]')}`}>
                    {guestName}
                </p>
                
                <p className={`text-gray-600 mt-2 px-4 leading-relaxed ${getOpacityClass('delay-[700ms]')}`}>
                  Tới dự buổi tiệc chung vui cùng gia đình chúng tôi
                </p>

                <div className={`my-4 ${getOpacityClass('delay-[800ms]')}`}>
                  <h2 className="font-dancing-script text-5xl text-rose-800">{GROOM_NAME}</h2>
                  <p className="font-dancing-script text-3xl my-2 text-rose-600">&</p>
                  <h2 className="font-dancing-script text-5xl text-rose-800">{BRIDE_NAME}</h2>
                </div>
                
                <div className={`w-24 h-px bg-rose-200 mx-auto my-4 ${getOpacityClass('delay-[900ms]')}`}></div>
                
                <div className={`text-gray-700 ${getOpacityClass('delay-[1000ms]')}`}>
                  <p className="font-semibold">Vào lúc 11:00 - Đón khách</p>
                  <p className="font-semibold">12:00 - Bắt đầu tiệc</p>
                  <p className="mt-1">Chủ nhật, ngày 09 tháng 11 năm 2025</p>
                  <p className={`mt-2 font-semibold text-rose-800`}>
                    Tại{' '}
                    <a
                      href={VENUE_MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-rose-600 transition-colors"
                    >
                      {VENUE_NAME}
                    </a>
                  </p>
                </div>

                <p className={`mt-4 text-gray-600 ${getOpacityClass('delay-[1100ms]')}`}>
                  Sự hiện diện của bạn là niềm vinh hạnh cho gia đình chúng tôi!
                </p>

              </div>
              
              <div className={`flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 justify-center mt-6 relative z-10 ${getOpacityClass('delay-[1200ms]')}`}>
                <a
                  href={VENUE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-rose-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-rose-600 transition-all transform hover:scale-105"
                >
                  <MapPinIcon /> Chỉ đường
                </a>
                <button
                  onClick={handleSaveTheDate}
                  className="flex items-center justify-center bg-green-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition-all transform hover:scale-105"
                >
                  <CalendarIcon /> Lưu ngày cưới
                </button>
              </div>

            </div>
          </div>
        </div>
        <style>{`
            .transform-style-preserve-3d { transform-style: preserve-3d; }
            .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
            .rotate-y-180 { transform: rotateY(180deg); }
            .delay-500 { transition-delay: 500ms; }
            .delay-\\[600ms\\] { transition-delay: 600ms; }
            .delay-\\[700ms\\] { transition-delay: 700ms; }
            .delay-\\[800ms\\] { transition-delay: 800ms; }
            .delay-\\[900ms\\] { transition-delay: 900ms; }
            .delay-\\[1000ms\\] { transition-delay: 1000ms; }
            .delay-\\[1100ms\\] { transition-delay: 1100ms; }
            .delay-\\[1200ms\\] { transition-delay: 1200ms; }

            .animate-fade-in {
              animation: fadeIn 1.5s ease-in-out;
            }
            .animate-grow-in {
                animation: growIn 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
            }
            .animate-sparkle {
                animation: sparkle 4s infinite linear;
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes growIn {
              from { opacity: 0; transform: scale(0.3); }
              to { opacity: 1; transform: scale(1); }
            }
            @keyframes sparkle {
              0%, 100% { opacity: 0.6; }
              15% { opacity: 0.6; }
              20% { opacity: 1; }
              25% { opacity: 0.6; }
              60% { opacity: 0.6; }
              65% { opacity: 1; }
              70% { opacity: 0.6; }
            }
        `}</style>
      </div>
    </>
  );
};

export default App;
