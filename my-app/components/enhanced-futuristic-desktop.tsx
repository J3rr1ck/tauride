"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useDragControls } from 'framer-motion'
import { Clock, Calendar, Music, Mic, Grid, X, Maximize2, Minimize2, ChevronUp, Volume2, SkipForward, Play, Pause, ChevronLeft, ChevronRight, Bell, Power } from 'lucide-react'

// Helper to get formatted time and date
const getTimeAndDate = () => {
  const now = new Date()
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const date = now.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })
  return { time, date }
}

// Topbar component
const Topbar = ({ toggleNotificationPopup, togglePowerPopup }) => {
  const [timeAndDate, setTimeAndDate] = useState(getTimeAndDate())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeAndDate(getTimeAndDate())
    }, 1000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-12 bg-purple-600 bg-opacity-33 backdrop-blur-md flex justify-between items-center px-4 z-50">
      {/* Centered Time and Date */}
      <div className="absolute left-1/2 transform -translate-x-1/2 text-white font-semibold">
        {timeAndDate.date} {timeAndDate.time}
      </div>

      {/* Notification and Power widgets */}
      <div className="flex space-x-4 text-white">
        <motion.button
          className="hover:text-purple-300"
          onClick={toggleNotificationPopup}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Bell size={20} />
        </motion.button>
        <motion.button
          className="hover:text-purple-300"
          onClick={togglePowerPopup}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Power size={20} />
        </motion.button>
      </div>
    </div>
  )
}

// Notification Popup
const NotificationPopup = () => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: -10 }}
    exit={{ opacity: 0, y: 50 }}
    className="absolute top-16 right-4 bg-purple-900 bg-opacity-70 backdrop-blur-lg rounded-lg p-4 w-64 shadow-lg"
  >
    <h4 className="text-white font-semibold mb-2">Notifications</h4>
    <p className="text-purple-300">No new notifications.</p>
  </motion.div>
)

// Power Popup
const PowerPopup = () => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: -10 }}
    exit={{ opacity: 0, y: 50 }}
    className="absolute top-16 right-16 bg-purple-900 bg-opacity-70 backdrop-blur-lg rounded-lg p-4 w-64 shadow-lg"
  >
    <h4 className="text-white font-semibold mb-2">Power Options</h4>
    <button className="w-full text-left text-purple-300 hover:bg-purple-700 hover:text-white p-2 rounded-lg mb-1">
      Sleep
    </button>
    <button className="w-full text-left text-purple-300 hover:bg-purple-700 hover:text-white p-2 rounded-lg mb-1">
      Restart
    </button>
    <button className="w-full text-left text-purple-300 hover:bg-purple-700 hover:text-white p-2 rounded-lg">
      Shut Down
    </button>
  </motion.div>
)

export function EnhancedFuturisticDesktop() {
  const [openApps, setOpenApps] = useState([])
  const [showAppLauncher, setShowAppLauncher] = useState(false)
  const [showNotificationPopup, setShowNotificationPopup] = useState(false)
  const [showPowerPopup, setShowPowerPopup] = useState(false)
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

  const toggleNotificationPopup = () => {
    setShowNotificationPopup(!showNotificationPopup)
  }

  const togglePowerPopup = () => {
    setShowPowerPopup(!showPowerPopup)
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-orange-600 overflow-hidden"
      ref={desktopRef}
    >
      {/* Topbar */}
      <Topbar
        toggleNotificationPopup={toggleNotificationPopup}
        togglePowerPopup={togglePowerPopup}
      />

      {/* Desktop Area */}
      <div className="w-full h-full absolute top-0 left-0 mt-12"> {/* Offset by Topbar height */}
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

      {/* Notification Popup */}
      <AnimatePresence>
        {showNotificationPopup && <NotificationPopup />}
      </AnimatePresence>

      {/* Power Popup */}
      <AnimatePresence>
        {showPowerPopup && <PowerPopup />}
      </AnimatePresence>
    </div>
  )
}
