import {useStore} from '../store'

export default function Controls() {
  console.log("render Controls", new Date().toString());

  const inc = useStore((state) => state.inc);
  return <button onClick={inc}>one up</button>;
}