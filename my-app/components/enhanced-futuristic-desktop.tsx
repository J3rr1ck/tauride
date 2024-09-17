"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useDragControls } from 'framer-motion'
import { Clock, Calendar, Music, Mic, Grid, X, Maximize2, Minimize2, ChevronUp, Volume2, SkipForward, Play, Pause, ChevronLeft, ChevronRight, Bell, PowerCircleIcon } from 'lucide-react'

// Futuristic Window component
const FuturisticWindow = ({ app, index, moveApp }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 100 * index, y: 100 })
  const [size, setSize] = useState({ width: 400, height: 300 })
  const [isMinimized, setIsMinimized] = useState(false)
  const constraintsRef = useRef(null)
  const dragControls = useDragControls()

  const handleResize = (e, direction) => {
    const { clientX, clientY } = e
    const { x, y } = position
    const { width, height } = size

    switch (direction) {
      case 'se':
        setSize({
          width: Math.max(200, clientX - x),
          height: Math.max(150, clientY - y)
        })
        break
    }
  }

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragConstraints={constraintsRef}
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      style={{ 
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: size.width,
        height: isMinimized ? 40 : size.height,
        zIndex: isDragging ? 10 : 1
      }}
      className="bg-purple-900 bg-opacity-30 backdrop-blur-lg rounded-lg overflow-hidden border border-purple-500 shadow-lg"
    >
      <motion.div 
        className="bg-gradient-to-r from-purple-600 to-orange-500 p-2 flex justify-between items-center cursor-move"
        onPointerDown={(e) => dragControls.start(e)}
      >
        <h3 className="text-white font-semibold">App {app}</h3>
        <div className="flex space-x-2">
          <button className="text-white hover:text-purple-200" onClick={() => setIsMinimized(!isMinimized)}>
            {isMinimized ? <ChevronUp size={16} /> : <Minimize2 size={16} />}
          </button>
          <button className="text-white hover:text-purple-200" onClick={() => setSize({ width: 600, height: 400 })}>
            <Maximize2 size={16} />
          </button>
          <button className="text-white hover:text-red-300" onClick={() => moveApp(index)}>
            <X size={16} />
          </button>
        </div>
      </motion.div>
      {!isMinimized && (
        <>
          <div className="flex-grow bg-black bg-opacity-50 p-4 text-white">
            <p>Futuristic content goes here</p>
          </div>
          <motion.div
            className="absolute bottom-0 right-0 w-4 h-4 bg-purple-500 rounded-tl cursor-se-resize"
            drag
            dragConstraints={{ left: 0, top: 0 }}
            onDrag={(e) => handleResize(e, 'se')}
          />
        </>
      )}
    </motion.div>
  )
}

// Basic Calendar component
const BasicCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const paddingDays = Array.from({ length: firstDayOfMonth }, (_, i) => null)

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  return (
    <div className="w-64 bg-purple-900 bg-opacity-70 backdrop-blur-lg rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="text-white hover:text-purple-300">
          <ChevronLeft size={20} />
        </button>
        <h3 className="text-white font-semibold">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <button onClick={nextMonth} className="text-white hover:text-purple-300">
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <div key={day} className="text-center text-purple-300 font-medium">{day}</div>
        ))}
        {paddingDays.map((_, index) => (
          <div key={`padding-${index}`} className="text-center text-gray-500"></div>
        ))}
        {days.map((day) => (
          <div key={day} className="text-center text-white hover:bg-purple-700 rounded-full cursor-pointer">
            {day}
          </div>
        ))}
      </div>
    </div>
  )
}

// Enhanced Dock component
const EnhancedDock = ({ openApps, setOpenApps, toggleAppLauncher }) => {
  const [showMusicControls, setShowMusicControls] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false)

  return (
    <motion.div 
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-purple-900 bg-opacity-30 backdrop-blur-lg rounded-full p-2 flex items-center space-x-2"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      {/* Running Apps */}
      <div className="flex space-x-2">
        {openApps.map((app, index) => (
          <motion.button
            key={index}
            className="w-10 h-10 bg-purple-600 bg-opacity-50 rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Grid size={20} className="text-white" />
          </motion.button>
        ))}
      </div>

      {/* Separator */}
      <div className="w-px h-8 bg-purple-500" />

      {/* Menu Items */}
      <motion.button
        className="w-10 h-10 bg-orange-500 bg-opacity-50 rounded-full flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleAppLauncher}
      >
        <Grid size={20} className="text-white" />
      </motion.button>

      {/* Separator */}
      <div className="w-px h-8 bg-purple-500" />

      {/* AI Assistant and Widgets */}
      <motion.button
        className="w-10 h-10 bg-purple-600 bg-opacity-50 rounded-full flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowVoiceAssistant(!showVoiceAssistant)}
      >
        <Mic size={20} className="text-white" />
      </motion.button>
      <motion.button
        className="w-10 h-10 bg-purple-600 bg-opacity-50 rounded-full flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowCalendar(!showCalendar)}
      >
        <Clock size={20} className="text-white" />
      </motion.button>
      <motion.button
        className="w-10 h-10 bg-purple-600 bg-opacity-50 rounded-full flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowMusicControls(!showMusicControls)}
      >
        <Music size={20} className="text-white" />
      </motion.button>

      {/* Music Controls Popup */}
      <AnimatePresence>
        {showMusicControls && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: -60 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-purple-900 bg-opacity-70 backdrop-blur-lg rounded-lg p-4 flex items-center space-x-4"
          >
            <img src="../ares.png" alt="Album Art" className="w-16 h-16 rounded" />
            <div>
              <h6 className="text-white font-semibold ">Song Title</h6>
            </div>
            <div className="flex space-x-2">
              <button className="text-white hover:text-purple-300">
                <Play size={12} />
              </button>
              <button className="text-white hover:text-purple-300">
                <SkipForward size={12} />
              </button>
              <button className="text-white hover:text-purple-300">
                <Volume2 size={12} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Calendar Popup */}
      <AnimatePresence>
        {showCalendar && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: -60 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2"
          >
            <BasicCalendar />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voice Assistant Popup */}
      <AnimatePresence>
        {showVoiceAssistant && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: -60 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-purple-900 bg-opacity-70 backdrop-blur-lg rounded-lg p-4 w-64"
          >
            <h4 className="text-white font-semibold mb-2">Voice Assistant</h4>
            <div className="bg-purple-800 bg-opacity-50 rounded-lg p-2 mb-2">
              <p className="text-purple-300">How can I help you?</p>
            </div>
            <div className="flex items-center bg-purple-700 bg-opacity-50 rounded-full px-3 py-2">
              <Mic size={20} className="text-white mr-2" />
              <input
                type="text"
                placeholder="Speak or type your request..."
                className="bg-transparent text-white placeholder-purple-300 focus:outline-none flex-grow"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const TopBar = () => {

  const [currentDateTime, setCurrentDateTime] = useState(new Date())

  const [showNotifications, setShowNotifications] = useState(false)

  const [showPowerMenu, setShowPowerMenu] = useState(false)


  useEffect(() => {

    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000)

    return () => clearInterval(timer)

  }, [])


  return (

    <div className="fixed top-0 left-0 right-0 h-8 bg-purple-900 bg-opacity-15 rounded-full flex items-center justify-between px-2">

      {/* Left section (empty for now) */}

      <div></div>


      {/* Middle section - Date/Time widget */}

      <div className="text-white font-semibold">

        {currentDateTime.toLocaleString()}

      </div>


      {/* Right section - Notification center and Power button */}

      <div className="flex items-center space-x-4">

        <motion.button

          whileHover={{ scale: 1.1 }}

          whileTap={{ scale: 0.9 }}

          onClick={() => setShowNotifications(!showNotifications)}

        >

          <Bell size={16} className="text-white" />

        </motion.button>

        <motion.button

          whileHover={{ scale: 1.1 }}

          whileTap={{ scale: 0.9 }}

          onClick={() => setShowPowerMenu(!showPowerMenu)}

        >

          <PowerCircleIcon size={16} className="text-white" />

        </motion.button>

      </div>


      {/* Notification Center Widget */}

      <AnimatePresence>

        {showNotifications && (

          <motion.div

            initial={{ opacity: 0, y: -50 }}

            animate={{ opacity: 1, y: 0 }}

            exit={{ opacity: 0, y: -50 }}

            className="absolute top-full right-20 mt-2 w-80 bg-purple-900 bg-opacity-70 backdrop-blur-lg rounded-lg p-4"

          >

            <h4 className="text-white font-semibold mb-2">Notifications</h4>

            <div className="text-purple-300">No new notifications</div>

          </motion.div>

        )}

      </AnimatePresence>


      {/* Power Menu Widget */}

      <AnimatePresence>

        {showPowerMenu && (

          <motion.div

            initial={{ opacity: 0, y: -50 }}

            animate={{ opacity: 1, y: 0 }}

            exit={{ opacity: 0, y: -50 }}

            className="absolute top-full right-4 mt-2 w-48 bg-purple-900 bg-opacity-70 backdrop-blur-lg rounded-lg p-4"

          >

            <button className="w-full text-left text-white hover:bg-purple-700 p-2 rounded">

              Shut Down

            </button>

            <button className="w-full text-left text-white hover:bg-purple-700 p-2 rounded">

              Restart

            </button>

            <button className="w-full text-left text-white hover:bg-purple-700 p-2 rounded">

              Sleep

            </button>

          </motion.div>

        )}

      </AnimatePresence>

    </div>

  )

}


// Modified EnhancedFuturisticDesktop component

export function EnhancedFuturisticDesktop() {

  const [openApps, setOpenApps] = useState([])

  const [showAppLauncher, setShowAppLauncher] = useState(false)

  const desktopRef = useRef(null)


  const addApp = () => {

    setOpenApps([...openApps, openApps.length + 1])

    setShowAppLauncher(false)

  }


  const moveApp = (index) => {

    const newApps = openApps.filter((_, i) => i !== index)

    setOpenApps(newApps)

  }


  const toggleAppLauncher = () => {

    setShowAppLauncher(!showAppLauncher)

  }


  return (

    <div 

      className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-orange-600 overflow-hidden"

      ref={desktopRef}

    >

      {/* TopBar */}

      <TopBar />


      {/* Desktop Area */}

      <div className="w-full h-full absolute top-10 left-0">

        {openApps.map((app, index) => (

          <FuturisticWindow key={index} app={app} index={index} moveApp={moveApp} />

        ))}

      </div>


      {/* App Launcher */}

      <AnimatePresence>

        {showAppLauncher && (

          <motion.div

            initial={{ opacity: 0, scale: 0.8 }}

            animate={{ opacity: 1, scale: 1 }}

            exit={{ opacity: 0, scale: 0.8 }}

            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-900 bg-opacity-30 backdrop-blur-lg rounded-lg p-6 grid grid-cols-3 gap-4"

          >

            {[1, 2, 3, 4, 5, 6].map((app) => (

              <motion.button

                key={app}

                className="w-20 h-20 bg-gradient-to-br from-purple-600 to-orange-500 rounded-lg flex items-center justify-center"

                whileHover={{ scale: 1.1 }}

                whileTap={{ scale: 0.9 }}

                onClick={addApp}

              >

                <Grid size={32} className="text-white" />

              </motion.button>

            ))}

          </motion.div>

        )}

      </AnimatePresence>


      {/* Enhanced Dock */}

      <EnhancedDock openApps={openApps} setOpenApps={setOpenApps} toggleAppLauncher={toggleAppLauncher} />

    </div>

  )

}