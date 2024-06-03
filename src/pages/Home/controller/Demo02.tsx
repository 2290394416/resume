import { useStore } from '../store'

export default function Controls() {
  console.log("render Controls", new Date().toString());

  const setq = useStore((state) => state.setq);
  return <button onClick={setq}>one up</button>;
}