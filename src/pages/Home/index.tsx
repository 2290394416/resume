import Playground from './Playground'
import Demo01 from './controller/Demo01'
import Demo02 from './controller/Demo02'

export default function App() {
  console.log("render App", new Date().toString());
  return (
    <div className="App">
      <Playground />
      <Demo01 />
      <Demo02 />
    </div>
  );
}
