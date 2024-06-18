import {useStore} from '../store'

export default function Controls() {

  const inc = useStore((state: any) => state.inc)
  return <button onClick={inc}>one up</button>;
}