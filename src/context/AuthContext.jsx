import { createContext, useContext, useState, useEffect } from 'react';

// Creo il contesto di autenticazione
const AuthContext = createContext();

// Provider per il contesto di autenticazione
export const AuthProvider = ({ children }) => {
  // Database utenti del sistema di login
  const SYSTEM_USERS = [
    {
      id: 1,
      email: 'admin@spacex.com',
      password: 'admin123',
      name: 'Admin SpaceX',
      role: 'admin'
    },
    {
      id: 2,
      email: 'user@spacex.com',
      password: 'user123',
      name: 'Utente SpaceX',
      role: 'user'
    }
  ];
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carico i dati dell'utente dal localStorage all'avvio
  useEffect(() => {
    const savedUser = localStorage.getItem('spacex_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Funzione per effettuare il login
  const login = (email, password) => {
    // Cerco l'utente nel database
    const foundUser = SYSTEM_USERS.find(
      u => u.email === email && u.password === password
    );

    if (foundUser) {
      const userInfo = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role
      };
      
      setUser(userInfo);
      localStorage.setItem('spacex_user', JSON.stringify(userInfo));
      return { success: true };
    }

    return { success: false, error: 'Credenziali non valide' };
  };

  // Funzione per effettuare il logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('spacex_user');
  };

  // Funzione per aggiornare il profilo utente
  const updateProfile = (updatedData) => {
    if (!user) return { success: false, error: 'Utente non autenticato' };

    // Creo i nuovi dati dell'utente
    const updatedUser = {
      ...user,
      ...updatedData
    };

    // Aggiorno lo state e localStorage
    setUser(updatedUser);
    localStorage.setItem('spacex_user', JSON.stringify(updatedUser));

    return { success: true, message: 'Profilo aggiornato con successo!' };
  };

  // Calcolo gli stati derivati
  const isLoggedIn = !!user;
  const isAdmin = user?.role === 'admin';

  const value = {
    user,
    login,
    logout,
    updateProfile,
    isLoggedIn,
    isAdmin,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizzato per usare il contesto
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve essere usato all\'interno di un AuthProvider');
  }
  return context;
}; 