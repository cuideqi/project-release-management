/* eslint-disable react/display-name */
import React, { FC, useState } from 'react'
import { useGet } from '../../hooks/useHttp'
import { Table, Button } from 'antd'
import { ColumnType } from 'antd/lib/table'
import { formatToSeconds } from '../../utils/time.util'
import { SafeAny } from '../../http/http.service'
interface FrontProjectVersionInfo {
  version: number;
  versionCreateTime: number;
}
type PropsType = {
  name: string;
  changeProjectVersion: (version: number) => void;
}
const FrontProjectVersion: FC<PropsType> = ({name, changeProjectVersion}: PropsType): JSX.Element => {
  const data = useGet<FrontProjectVersionInfo[]>('/mock/90/front/listProjectVersions', [], {name})
  const [selectedVersion, setSelectedVersion] = useState<number | SafeAny>();
  const columns:ColumnType<FrontProjectVersionInfo>[] = [
    {
      title: '版本',
      align: 'center',
      ellipsis: true,
      dataIndex: 'version',
      width: 150,
      key: 'version',
      render: (version: number): JSX.Element => <span>{version}</span>
    },
    {
      title: '创建时间',
      align: 'center',
      ellipsis: true,
      dataIndex: 'versionCreateTime',
      key: 'versionCreateTime',
      render: (versionCreateTime: number): JSX.Element => <span>{formatToSeconds(versionCreateTime)}</span>
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      align: 'center',
      render: (text: SafeAny, record: FrontProjectVersionInfo): JSX.Element => (
        <Button type="primary" onClick={(): void => {
          console.log(record);
          setSelectedVersion(record.version)
          changeProjectVersion(selectedVersion);
        }}>切换</Button>
      )
    }
  ]
  return (
    <div>
      <Table
      columns={columns}
      pagination={false}
      scroll={{y: 500}}
      dataSource={data.map((item, index) => ({ ...item, key: index })).filter((item, index) => index < 30)} />
    </div>
  )
}

export default FrontProjectVersion
