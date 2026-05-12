import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'

import Signup from './pages/Signup'
import AdminOverview from './pages/AdminOverview'
import FlightManagement from './pages/FlightManagement'
import UserManagement from './pages/UserManagement'
import Transactions from './pages/Transactions'
import Profile from './pages/Profile'
import PassengerDashboard from './pages/PassengerDashboard'
import PassengerNotifications from './pages/PassengerNotifications'
import PassengerSearchFlights from './pages/PassengerSearchFlights'
import PassengerSelectSeat from './pages/PassengerSelectSeat'
import PassengerBaggage from './pages/PassengerBaggage'
import PassengerPayment from './pages/PassengerPayment'
import PassengerConfirmation from './pages/PassengerConfirmation'
import PassengerMyBookings from './pages/PassengerMyBookings'
import PassengerProfile from './pages/PassengerProfile'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminOverview />} />
        <Route path="/admin/flights" element={<FlightManagement />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/transactions" element={<Transactions />} />
        <Route path="/admin/profile" element={<Profile />} />
        <Route path="/passenger/dashboard" element={<PassengerDashboard />} />
        <Route path="/passenger/notifications" element={<PassengerNotifications />} />
        <Route path="/passenger/search" element={<PassengerSearchFlights />} />
        <Route path="/passenger/booking/select-seat" element={<PassengerSelectSeat />} />
        <Route path="/passenger/booking/baggage" element={<PassengerBaggage />} />
        <Route path="/passenger/booking/payment" element={<PassengerPayment />} />
        <Route path="/passenger/booking/confirmation" element={<PassengerConfirmation />} />
        <Route path="/passenger/my-bookings" element={<PassengerMyBookings />} />
        <Route path="/passenger/profile" element={<PassengerProfile />} />
      </Routes>
    </Router>
  )
}

export default App
