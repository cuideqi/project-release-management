/* eslint-disable react/display-name */
import React, { FC } from 'react'
import { useGet } from '../../hooks/useHttp'
import { Table, Button, Popconfirm } from 'antd'
import { ColumnType } from 'antd/lib/table'
import { formatToSeconds } from '../../utils/time.util'
import { SafeAny } from '../../http/http.service'
import { TagTwoTone } from '@ant-design/icons'
interface FrontProjectVersionInfo {
  version: number
  versionCreateTime: number
}
type PropsType = {
  project_name: string
  currentVersion: string
  changeProjectVersion: (version: number) => void
}
const FrontProjectVersion: FC<PropsType> = ({ project_name, changeProjectVersion, currentVersion }: PropsType): JSX.Element => {
  const { data } = useGet<FrontProjectVersionInfo[]>('/front/listProjectVersions', [], { project_name })
  let scrollConfig = {y: 400} as SafeAny;
  if (data.length <= 5) {
    scrollConfig = null;
  }
  const columns: ColumnType<FrontProjectVersionInfo>[] = [
    {
      title: '版本',
      align: 'center',
      ellipsis: true,
      dataIndex: 'version',
      width: 150,
      key: 'version',
      render: (version: number): JSX.Element => (
        <span>
          {+currentVersion === version ? (
            <span>
              <TagTwoTone style={{ paddingRight: '5px' }} twoToneColor="#52c41a" />
              {version}
            </span>
          ) : (
            version
          )}
        </span>
      ),
    },
    {
      title: '创建时间',
      align: 'center',
      ellipsis: true,
      dataIndex: 'versionCreateTime',
      key: 'versionCreateTime',
      render: (versionCreateTime: number): JSX.Element => <span>{formatToSeconds(versionCreateTime)}</span>,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      align: 'center',
      render: (text: SafeAny, record: FrontProjectVersionInfo): JSX.Element => (
        <Popconfirm
          title="确定选择此版本吗？"
          placement="leftBottom"
          onConfirm={(): void => {
            changeProjectVersion(record.version)
          }}
        >
          <Button type="primary">选择</Button>
        </Popconfirm>
      ),
    },
  ]
  return (
    <>
      <div style={{paddingBottom: '10px'}}>
        <TagTwoTone style={{ paddingRight: '5px' }} twoToneColor="#52c41a" />
        代表当前正在运行的版本
      </div>
      <Table
        columns={columns}
        pagination={false}
        scroll={scrollConfig}
        bordered={true}
        dataSource={data.map((item, index) => ({ ...item, key: index })).filter((item, index) => index < 30)}
      />
    </>
  )
}

export default FrontProjectVersion
