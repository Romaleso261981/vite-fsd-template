import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthPage from '../pages/Auth';
import Main from '../pages/Main';
import { NotFound } from '../pages/NoFound/NoFound';

const App: React.FC = () => {
  const setIsRegistered = false;

  return (
    <BrowserRouter>
      <Routes>
        {setIsRegistered && <Route path="/" element={<AuthPage />} />}
        {!setIsRegistered && <Route path="auth" element={<Main />} />}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
