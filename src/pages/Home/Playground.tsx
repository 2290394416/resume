import {useStore} from './store'

export default function Counter() {

  const {count, counter2} = useStore((state: any) => ({
    count: state.count,
    counter2: state.counter2
  }));
  return (
    <div>
      <h1>{count}</h1>
      <h2>{counter2}</h2>
    </div>
  );
}