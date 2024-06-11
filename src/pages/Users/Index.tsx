import { useState } from 'react'
import {Post, User} from './interface'
import { Button, Table, Tag, PopconfirmProps, Popconfirm, message } from 'antd'
import s from './index.module.scss'
import ModalForm from './Modal'

const Column = Table.Column

// 设置 setter/set/   
// 读取 getter/get/read
// 赋值  =
// 执行  ()  调用 call   执行结果/ 返回 return  传参/入参
// 声明 var let const function

export const Department: any = {
  administrative: '行政部',
  marketing: '市场部',
  accounting: '财务部',
  technical: '技术部'
}

export enum PostName {
  CEO = '老板',
  CTO = '技术总监',
  CFO = '财务总监',
  DEV = '开发人员'
}
export const TagColor: any = {
  NORMAL: '#ccc',
  VIP: '#cf1322',
  SVIP: 'gold',
  GVIP: '#cf1322',
  SGVIP: 'gold'
}

const _user: User = {
  name: 'Tom',
  age: 30,
  address: '中国',
  tags: ['VIP', 'SGVIP'],
  post: 'CEO',
  department: 'marketing',
  key: 'xxx',
  show: false
}

export default function Users() {
  const [users, setUsers] = useState<Array<User>>([_user])
  const [show, setShow] = useState(false)
  const [editing, setEditing] = useState({})
  
  function onChange(newDate: any, index: any) {
    if (index === undefined) {
      users.push(newDate)
      setUsers([...users])
      return
    }
    users.splice(index, 1, newDate)
    setUsers([...users])
  }
  //取消删除的回调事件
  const cancel: PopconfirmProps['onCancel'] = () => {
    message.error('取消删除');
  };

  return (
    <div>
      <div className={s.create}>
        <Button
          onClick={() => {
            setShow(true)
            setEditing({})
          }}
          type='primary'
        >新增</Button>
        <ModalForm show={show} type='add' onOk={() => { setShow(false); setEditing({})}} onCancel={() => setShow(false)} editing={editing} onChange={onChange}/>
      </div>

      <Table dataSource={users}>
        <Column<User> key="name" title="姓名" dataIndex="name" />
        <Column<User> key="age" title="年龄" dataIndex="age" />
        <Column<User> key="address" title="地址" dataIndex="address" />
        <Column<User> key="tags" title="会员" dataIndex="tags" render={(tags: string[]) => (
          <>
            {tags.map((tag) => (
              <Tag color={TagColor[tag]} key={tag} >{tag}</Tag>
            ))}
          </>
        )} />

        <Column<User> key="department" title="部门" dataIndex="department" render={(department: keyof typeof Department) =>Department[department]}/>
        <Column<User> key="post" title="岗位" dataIndex="post" render={(post:Post) =>PostName[post]}/>
        <Column<User> key="action" title="操作" dataIndex="action" render={(_, record, i) => {
          return <>
            <Button
              size='small' 
              onClick={() => {
                record.show = true
                setUsers([...users])
              }}
              type='primary'
            >编辑</Button>
            <ModalForm
              show={record.show}
              index={i}
              onOk={() => {
                record.show = false;
                setUsers([...users])
              }}
              onCancel={() => { record.show = false; setUsers([...users]) }}
              onChange={onChange}
              editing={record}
            />
            <span> </span>
            <Popconfirm
              title='删除提示'
              description='确定要删除该数据吗？'
              onConfirm={() => {
                message.success('删除成功');
                let deleteAfterUsers = users.filter(item => item != record)
                setUsers([...deleteAfterUsers])
              }}
              onCancel={cancel}
              okText='确定'
              cancelText='取消'
            >
              <Button size='small' danger >删除</Button>
            </Popconfirm>
            <span> </span>
            <Button size='small' onClick={() => { }}>离职</Button>
          </>
        }} />
      </Table>
    </div>
  )
}