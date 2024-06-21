import { useStore } from '../store'

export default function Controls() {

  const setq = useStore((state: any) => state.setq);
  return <button onClick={setq}>one up</button>;
}