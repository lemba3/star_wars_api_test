import { useEffect, useState } from "react"

const Test = () => {

  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  useEffect(()=>{
    const btn = document.querySelector('#test-btn');
    btn.addEventListener('click', () => {
      console.log('a and b', a , b)
      const sum = a + b;
      console.log('sum',sum)
    })
  },[a, b])

  return (
    <div>
      <button id='test-btn'>Test</button>
      <button onClick={() => {
        setA(a + 1);
        setB(b + 3);
        console.log('value changed')
      }}>change values</button>
    </div>
  )
}

export default Test
