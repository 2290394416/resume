import { useEffect, useRef, useState } from 'react'
import s from './index.module.scss'
import axios from 'axios'

interface Job {
  desc: string,
  isSelected: boolean
}

export default function Shop() {
  const [jobs, setJobs] = useState<Array<Job>>([])
  const [show, setShow] = useState(false)
  const [desc, setDesc] = useState('')
  const inputref = useRef<HTMLInputElement>(null)
  const [list, setList] = useState<any[]>([])

  axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => {
  })

  function create() {
    setShow(false)
    if(desc === '') {
      return
    } else {
      setDesc('')
      jobs.push({
        desc,
        isSelected: false
      })
      setJobs([...jobs])
    }
  }

  useEffect(() => {
    if(show) {
      inputref.current?.focus()
    }
  },[show])

  function remove(i: any) {
    jobs.splice(i, 1)
    setJobs([...jobs])
  }
  function select(i: any) {
    jobs[i].isSelected = !jobs[i].isSelected
    setJobs([...jobs])
  }

  return(
    <div className={s.container}>
      <div>
        {jobs.map((item, index) => (
          <div className={s.list} key={index}>
            <div
              className={s.selected}
              onClick={() => { select(index)}}
              >{item.isSelected && <div className={s.circle}></div>}</div>
            <div>{item.desc}</div>
            <div onClick={() => {remove(index)}}>删除</div>
          </div>
        ))}
      </div>
      {show ? (
      <div className={s.editing}>
          <input
            className={s.input}
            type="text" 
            onChange={(e) => {setDesc(e.target.value)}}
            ref={inputref}
          />
          <div className={s.create} onClick={create}>创建</div>
      </div>
      ) : <div className={s.add} onClick={() => {setShow(true)}}>新增</div>}
      <div className={s.query}>
        <div>查询列表</div>
         <div className={s.search}>
          <input type="text" className={s.search_input} placeholder=' 清输入要查询的内容..' />
          <div className={s.search_btn}>搜索</div>
         </div>
         {/* {list.map((item, index) => (
          <div key={index}>{item.title}</div>
         ))} */}
      </div>
    </div>
  )
}