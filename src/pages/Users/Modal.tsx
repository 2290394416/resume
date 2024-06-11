import { Modal, Form, Input, Select, SelectProps, message, Popconfirm, Button } from 'antd'
import { Department, TagColor, PostName } from './Index'
import {User} from './interface'
import { useEffect, useState } from 'react';
import {postApi} from './api'
import Radio from './Radio'


interface ModalFormProps {
  show: boolean,
  onOk: () => any,
  onCancel: () => any
  editing: {},
  index?: number,
  onChange?: any
  type?: string
}

export default function ModalForm(props: ModalFormProps) {
  const { show, onOk, onCancel, editing, onChange, type, index } = props
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
  const options: SelectProps['options'] = [];
  Object.keys(TagColor).forEach((item) => (
    options.push({
      value: item,
      label: item,
    })
  ))
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
  

  // useEffect(() => {
  //   if (type != 'add' && show === true) {
  //     form.setFieldsValue(editing)
  //     form.resetFields()
  //     console.log('打开的是编辑')
  //     return
  //   }
  // },[show])

  return (
    <Modal
      open={show}
      title="新增用户"
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
              postApi().then((res: any) => {
                if (res.success) {
                  message.success('提交成功')
                  setLoading(false)
                  onOk()
                  submit()
                  form.resetFields()
                }
              })
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
        <Form.Item<User> label='姓名' name='name' rules={[{required: true, message: '请输入用户名'}]}>
          <Input placeholder='请输入用户名' />
        </Form.Item>
        <Form.Item<User> label='年龄' name='age' rules={[{ required: true, message: '请输入年龄' }]}>
          <Input />
        </Form.Item>
        <Form.Item<User> label='地址' name='address' rules={[{ required: true, message: '请输入地址' }]}>
          <Input />
        </Form.Item>
        <Form.Item<User> label='等级' name='tags' rules={[{ required: true, message: '请选择等级' }]}>
          <Select
            mode="tags"
            placeholder="Please select"
            style={{ width: '100%' }}
            options={options}
          />
        </Form.Item>
        <Form.Item label='岗位' name='post' >
          <Radio selects={Object.keys(PostName)} disabled={loading} />
        </Form.Item>
        <Form.Item<User> label='部门' name='department' rules={[{ required: true, message: '请选择部门' }]}>
          <Select>
            {Object.keys(Department).map((item) => (
              <Select.Option key={item} value={item}>{Department[item]}</Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}