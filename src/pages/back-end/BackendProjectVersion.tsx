import React, { FC } from 'react'
import Table, { ColumnType } from 'antd/lib/table'
import { formatToSeconds } from '../../utils/time.util'
import { SafeAny } from '../../http/http.service'
import { Button, Popconfirm } from 'antd'
import { useGet } from '../../hooks/useHttp'
import getMemory from '../../utils/memory.util'
interface BackendProjectVersionInfo {
  tag: string
  digest: string
  imageCreate: number
  imageId: string
  imageUpdate: number
  imageSize: number
}

interface DataInfo {
  page: number
  pageSize: number
  total: number
  tags: BackendProjectVersionInfo[]
}
type PropsType = {
  repo_name: string
  changeProjectVersion: (origin_tag: string) => void
}
const BackendProjectVersion: FC<PropsType> = ({ repo_name, changeProjectVersion }) => {
  const defaultCurrent = 1,
    defaultPageSize = 4
  const { data, regetData } = useGet<DataInfo>('/repo/listRepoTags', { tags: [] }, { repo_name, page: defaultCurrent, page_size: defaultPageSize })
  const total = data.total
  const sourceData = data.tags
  function onchange(currentPage: SafeAny) {
    regetData({ repo_name, page: currentPage, page_size: defaultPageSize })
  }
  const columns: ColumnType<BackendProjectVersionInfo>[] = [
    {
      title: 'tag标签',
      align: 'center',
      ellipsis: true,
      dataIndex: 'tag',
      width: 100,
      key: 'tag',
      render: (tag: number): JSX.Element => <span>{tag}</span>,
    },
    {
      title: '镜像ID',
      align: 'center',
      ellipsis: true,
      dataIndex: 'imageId',
      width: 200,
      key: 'imageId',
      render: (imageId: number): JSX.Element => <span title={String(imageId)}>{imageId}</span>,
    },
    {
      title: '生成时间',
      align: 'center',
      ellipsis: true,
      dataIndex: 'imageUpdate',
      key: 'imageUpdate',
      render: (imageUpdate: number): JSX.Element => <span>{formatToSeconds(imageUpdate)}</span>,
    },
    {
      title: '镜像大小',
      align: 'center',
      ellipsis: true,
      dataIndex: 'imageSize',
      key: 'imageSize',
      render: (imageSize: number): JSX.Element => <span>{getMemory(imageSize)}</span>,
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      align: 'center',
      render: (text: SafeAny, record: BackendProjectVersionInfo): JSX.Element => (
        <Popconfirm
          title="确定选择此镜像吗？"
          placement="leftBottom"
          onConfirm={(): void => {
            changeProjectVersion(record.tag)
          }}
        >
          <Button type="primary">选择</Button>
        </Popconfirm>
      ),
    },
  ]
  return (
    <div className="panel">
      <Table
        columns={columns}
        bordered={true}
        pagination={{
          defaultCurrent: defaultCurrent,
          defaultPageSize: defaultPageSize,
          total: total,
          onChange: onchange,
        }}
        dataSource={sourceData.map((item, index) => ({ ...item, key: index })).filter((item, index) => index < 30)}
      />
    </div>
  )
}
export default BackendProjectVersion
