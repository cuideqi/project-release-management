/* eslint-disable react/display-name */
import React from 'react';
import { useGet } from '../../hooks/useHttp';
import Table, { ColumnType } from 'antd/lib/table';
import { formatToSeconds } from '../../utils/time.util';
import { SafeAny } from '../../http/http.service';
import { Button } from 'antd';
interface BackendProjectInfo {
  service: string;
  repoName: string;
  tag: string;
  imageId: string;
  publishTime: string;
  imageCreateTime: string;
}
const Backend: React.FC = () => {
  const data = useGet<BackendProjectInfo[]>('/mock/90/backend/listServiceImageInfo', []);
  const columns: ColumnType<BackendProjectInfo>[] = [
    {
      title: '编号',
      dataIndex: 'key',
      key: 'key',
      render: (key: string): JSX.Element => <span>{key}</span>
    },
    {
      title: '服务名称',
      dataIndex: 'service',
      key: 'service',
      render: (service: string): JSX.Element => <span>{service}</span>
    },
    {
      title: '镜像名称',
      dataIndex: 'repoName',
      key: 'repoName',
      render: (repoName: string): JSX.Element => <span>{repoName}</span>
    },
    {
      title: '镜像tag',
      dataIndex: 'tag',
      key: 'tag',
      render: (tag: string): JSX.Element => <span>{tag}</span>
    },
    {
      title: '发布时间',
      dataIndex: 'publishTime',
      key: 'publishTime',
      render: (publishTime: number): JSX.Element => <span>{formatToSeconds(publishTime)}</span>
    },
    {
      title: '镜像生成时间',
      dataIndex: 'imageCreateTime',
      key: 'imageCreateTime',
      render: (imageCreateTime: number): JSX.Element => <span>{formatToSeconds(imageCreateTime)}</span>
    },
    {
      title: '操作',
      key: 'action',
      render: (text: SafeAny, record: BackendProjectInfo): JSX.Element => (
        <Button type="primary" onClick={(): void => {
          console.log(record);
        }}>切换</Button>
      )
    }
  ];
  return (
    <div>
      <Table
        pagination={false}
        columns={columns}
        dataSource={data.map((item, index) => ({ ...item, key: index + 1 }))}
      />
    </div>
  )
}

export default Backend;
