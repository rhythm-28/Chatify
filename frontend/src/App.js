import './App.css';
import {Route} from "react-router-dom";
import home from './components/home';
import chats from "./components/chats";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={home} />
      <Route path="/chats" component={chats} />
    </div>
  );
}

export default App;
