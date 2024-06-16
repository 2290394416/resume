import { useEffect, useState } from 'react'
import { Button, Table, PopconfirmProps, Popconfirm, message, Avatar } from 'antd'
import {ListLoading, DataType} from './interface'
import ModalForm from './Modal'

const Column = Table.Column

let count = 5;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

export default function LoadingList() {
  const [list, setList] = useState<ListLoading[]>([])
  const [loading, setLoading] = useState(true)



  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        let listarr = res.results.map((item: DataType, index: number) => ({ 
          name: item.name.last,
          avatar: item.picture.large,
          key: Number(Math.random().toString() + Date.now()).toString(36) + index.toString() + item.name.last,
          desc: 'Ant Design Users Information',
          content: 'Content',
          show: false
        }))
        setLoading(false)
        setList(listarr)
      })
  }, [])
  function loadMore() {
    setLoading(true)
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        const newData = res.results.map((item: DataType, index: number) => ({
          name: item.name.last,
          avatar: item.picture.large,
          key: Number(Math.random().toString() + Date.now()).toString(36) + index.toString() + item.name.last,
          desc: 'Ant Design Users Information',
          content: 'Content',
          show: false
        })
      )
        setList(newData)
        setLoading(false)
      })
  }

  const cancel: PopconfirmProps['onCancel'] = () => {
    message.error('取消删除');
  }

  function onChange(newData: any, index: any) {
    list.splice(index, 1, newData)
    setList([...list])
  }

  return (
      <Table
        dataSource={list}
        pagination={{
          defaultPageSize: count,
          total: 99,
          showSizeChanger: false,
          onChange:() =>loadMore()
        }}
        loading={loading}
      >
        <Column<ListLoading> key="avatar" title="头像" dataIndex=" avatar" render={(_, record) => (
          <Avatar key={record.avatar} src={record.avatar} />
        )}/>
        <Column<ListLoading> key="name" title="姓名" dataIndex="name" render={(_, record) => (
          <div key={record.name}>{record.name}</div>
        )}/>
        <Column<ListLoading> key="desc" title="描述" dataIndex="desc" render={(_, record) => (
          <div>{record.desc}</div>
        )}/>
        <Column<ListLoading> key="content" title="内容" dataIndex="content" render={(_, record) => (
          <div>{record.content}</div>
        )}/>

        <Column<ListLoading> key="action" title="操作" dataIndex="action" render={(_, record, i) => {
          return <>
            <Button
              size='small'
              onClick={() => {
                record.show = true
                setList([...list])
              }}
              type='primary'
            >编辑</Button>
            <ModalForm
              show={record.show}
              index={i}
              onOk={() => {
                record.show = false;
                setList([...list])
              }}
              onCancel={() => { record.show = false; setList([...list]) }}
              onChange={onChange}
              editing={record}
            />
            <span> </span>
            <Popconfirm
              title='删除提示'
              description='确定要删除该数据吗？'
              onConfirm={() => {
                message.success('删除成功');
                let deleteAfterUsers = list.filter(item => item != record)
                setList([...deleteAfterUsers])
              }}
              onCancel={cancel}
              okText='确定'
              cancelText='取消'
            >
              <Button size='small' danger >删除</Button>
            </Popconfirm>
          </>
        }} />
      </Table>
  )
}