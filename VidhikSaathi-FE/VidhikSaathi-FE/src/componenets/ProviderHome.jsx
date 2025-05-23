import React, { useState } from 'react';
function ProviderHome() {
  const [greeting, setGreeting] = useState('Welcome to My Website!');

  return (
    <div className="home-container">
      <h1>{greeting}</h1>
      <p>This is a simple Provider Home built with React.</p>
      <button onClick={() => setGreeting('Thanks for visiting!')}>
        Click Me
      </button>
    </div>
  );
}

export default ProviderHome;
