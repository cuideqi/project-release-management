/* eslint-disable react/display-name */
import React from 'react';
import { Table, Button } from 'antd';
import useHttp from '../../hooks/useHttp';
import { formatToSeconds } from '../../utils/time.util';

type FrontProjectInfo = {
  name: string;
  version: string;
  publishTime: string;
  versionCreateTime: string;
};
const Frontend: React.FC = () => {
  const data = useHttp<FrontProjectInfo[]>('/mock/90/front/listProjects', []);
  const columns = [
    {
      title: '服务名称',
      dataIndex: 'name',
      key: 'name',
      render: (name: React.ReactNode): JSX.Element => <span>{name}</span>
    },
    {
      title: '当前版本',
      dataIndex: 'version',
      key: 'version',
      render: (version: React.ReactNode): JSX.Element => <span>{version}</span>
    },
    {
      title: '上线时间',
      dataIndex: 'publishTime',
      key: 'publishTime',
    render: (publishTime: number): JSX.Element => <span>{formatToSeconds(publishTime)}</span>
    },
    {
      title: '版本生成时间',
      dataIndex: 'versionCreateTime',
      key: 'versionCreateTime',
      render: (versionCreateTime: number): JSX.Element => <span>{formatToSeconds(versionCreateTime)}</span>
    },
    {
      title: '操作',
      key: 'action',
      render: (): JSX.Element => (
        <Button type="primary">切换</Button>
      )
    }
  ];
  return (
    <div>
      <Table columns={columns} dataSource={data.map((item, index) => ({...item, key: index}))} />
    </div>
  )
}

export default Frontend;
