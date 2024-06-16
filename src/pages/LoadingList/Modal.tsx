import { Modal, Form, Input, message, Popconfirm, Button, Avatar } from 'antd'
import { useEffect, useState } from 'react';
import { ListLoading } from './interface';



interface ModalFormProps {
  show: boolean,
  onOk: () => any,
  onCancel: () => any
  editing: any,
  index?: number,
  onChange?: any
}

export default function ModalForm(props: ModalFormProps) {
  const { show, onOk, onCancel, editing, onChange, index } = props
  const [submittable, setSubmittable] = useState(true)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [caching, setCaching] = useState(false)

  const values = Form.useWatch([], form)

  function submit() {
    setSubmittable(true)
    let obj = { ...form.getFieldsValue(), key: new Date(), show: false }
    onChange && onChange(obj, index)
  }
  
  useEffect(() => {
    if (!values || !values.name) {
      return
    }
    form
      .validateFields({ validateOnly: true })
      .then(() => {
        setSubmittable(false)
      })
      .catch(() => {
      });
  }, [form, values]);
  

  return (
    <Modal
      open={show}
      title="编辑"
      onCancel={() => {
        onCancel()
        setCaching(true)
      }}
      maskClosable = {false}
      cancelText='取消'
      okText='提交'
      destroyOnClose={!caching}
      footer={() => (
        <>
          <Popconfirm
            title='内容未保存'
            description='内容还未保存确定要退出吗？'
            onConfirm={() => {
              message.error('取消保存')
              onCancel()
              form.resetFields()
            }}
            cancelText='取消'
            okText='确定'
          >
            <Button disabled={loading}> 取消 </Button>
          </Popconfirm>
          <Popconfirm
            title='内容提交'
            description='确认要提交当前内容吗？'
            onConfirm={() => {
              setLoading(true)
              setTimeout(() => {
                message.success('提交成功')
                setLoading(false)
                submit()
                form.resetFields()
                onOk()
              },1000)    
            }}
            okText='确定'
            cancelText='取消'
          >
            <Button type='primary' loading={loading} disabled={submittable}> 提交 </Button>
          </Popconfirm>
        </>
      )}
    >
      <Form
        form={form}
        initialValues={editing}
        preserve={caching}
        disabled={loading}
      >
        <Form.Item<ListLoading> label='头像' name='avatar' rules={[{ required: true, message: '请输入用户名' }]}>
          <Avatar size={'large'} src={editing.avatar}/>
        </Form.Item>
        <Form.Item<ListLoading> label='姓名' name='name' rules={[{required: true, message: '请输入用户名'}]}>
          <Input placeholder='请输入用户名' />
        </Form.Item>
        <Form.Item<ListLoading> label='描述' name='desc' rules={[{ required: true, message: '请输入描述' }]}>
          <Input />
        </Form.Item>
        <Form.Item<ListLoading> label='内容' name='content' rules={[{ required: true, message: '请输入内容' }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}