import { useEffect, useRef, useState } from 'react'
import s from './index.module.scss'
import { Avatar, Button, Input, Table } from 'antd'

export interface ListLoading {
  key: string,
  avatar?: any,
  name: string,
  desc: string,
  content: any,
  show: boolean
}

interface Job {
  desc: string,
  isSelected: boolean
}
const Column = Table.Column
const { Search } = Input


export default function Shop() {
  const [jobs, setJobs] = useState<Array<Job>>([])
  const [show, setShow] = useState(false)
  const [desc, setDesc] = useState('')
  const inputref = useRef<HTMLInputElement>(null)
  const keyword = useRef('')
  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const search = useRef(null)


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


  function searchKey() {
    setLoading(true)
    let num = keyword.current.replace(/[^\d]/g, '')
    const fakeDataUrl = `https://randomuser.me/api/?results=${num}&inc=name,gender,email,nat,picture&noinfo`;

    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        const newData = res.results.map((item: any, index: number) => ({
          name: item.name.last,
          avatar: item.picture.large,
          key: Number(Math.random().toString() + Date.now()).toString(36) + index.toString() + item.name.last,
          desc: 'Ant Design Users Information',
          content: keyword.current,
          show: false
        }))
        setList(newData)
        setLoading(false)
      })
  }
  

  function debounce(fn: any, delay: number ) {
    let timeout: any = null;
    return function() {
      if (timeout !== null ) {
        clearTimeout(timeout)
      }
      timeout = setTimeout(fn, delay)
    }
  }
  function throttle(fn: any, interval: number) {
    let startTime = performance.now()
    return function () {
      var cur = performance.now()

      if (cur - startTime < interval) {
        return
      }
      fn()
      startTime = performance.now()
    }
  }

  var once = debounce(searchKey, 500)
  useEffect(() => {
    search.current = throttle(searchKey, 500)
  },[])
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
          <Search
            placeholder=' 清输入要查询的内容..'
            onSearch={searchKey}
            onChange={(e) => {
              keyword.current = e.target.value;
              search.current()
            }}
            enterButton
            style={{width: 300 }}
          />
      </div>
      <Table
        dataSource={list}
        loading={loading}
      >
        <Column<ListLoading> key="avatar" title="头像" dataIndex=" avatar" render={(_, record) => (
          <Avatar key={record.avatar} src={record.avatar} />
        )} />
        <Column<ListLoading> key="name" title="姓名" dataIndex="name" render={(_, record) => (
          <div key={record.name}>{record.name}</div>
        )} />
        <Column<ListLoading> key="desc" title="描述" dataIndex="desc" render={(_, record) => (
          <div>{record.desc}</div>
        )} />
        <Column<ListLoading> key="content" title="内容" dataIndex="content" render={(_, record) => (
          <div>{record.content}</div>
        )} />
      </Table>
    </div>
  )
}