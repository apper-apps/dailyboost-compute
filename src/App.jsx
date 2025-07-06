import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from '@/contexts/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import Header from '@/components/organisms/Header'
import Dashboard from '@/components/pages/Dashboard'
import Team from '@/components/pages/Team'
import Subscription from '@/components/pages/Subscription'
import QuoteHistory from '@/components/pages/QuoteHistory'
import Login from '@/components/pages/Login'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background font-body">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={
              <ProtectedRoute>
                <Header />
                <main className="pt-16">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/subscription" element={<Subscription />} />
                    <Route path="/history" element={<QuoteHistory />} />
                  </Routes>
                </main>
              </ProtectedRoute>
            } />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App