import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';
import './App.css';

// App principale con autenticazione
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <AuthProvider>
          <div className="App">
            <Navbar />
            <main>
              <AppRoutes />
            </main>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
