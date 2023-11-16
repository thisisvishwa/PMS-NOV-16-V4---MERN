```javascript
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Users from './components/Users';
import Passwords from './components/Passwords';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/users" component={Users} />
          <Route path="/passwords" component={Passwords} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
```