import DecorativeSide from "./DecorativeSide";
import LoginForm from "./LoginForm";

function App() {
  return (
    <div className="flex w-screen h-screen overflow-hidden" id="app">
      <DecorativeSide />
      <LoginForm />
    </div>
  );
}

export default App;
