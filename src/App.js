import { useState } from 'react';
import c from './styles.module.scss'

import User from './components/User';
import Users from './components/Users';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className={c.container}>
      <div className={c.column}>
        <Users setUser={setUser} />
      </div>
      <div className={c.column}>
        <User user={user} />
      </div>
    </div>
  );
}

export default App;
