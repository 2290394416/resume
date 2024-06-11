export interface User {
  key: string,
  name: string,
  age: number,
  address: string,
  tags: Tag[],
  department: Department,
  post: Post,
  show: boolean
}

// 后续完成岗位与部门的联动问题

//type 定义多选一数据类型，interface定义一个对象数据类型，属性后面加？号表示可写可不写
export type Tags = 'VIP' | 'NORMAL' | 'SVIP' | 'GVIP' | 'SGVIP'

export type Post = 'CEO' | 'CTO' | 'CFO' | 'DEV'

// 编辑 删除 离职
type Action = 'edit' | 'delete' | 'fire'

const ActionS = {
  edit: '编辑',
  delete: '删除',
  fire: '离职'
}