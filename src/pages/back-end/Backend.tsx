/* eslint-disable react/display-name */
import React, { useState } from 'react';
import { useGet } from '../../hooks/useHttp';
import Table, { ColumnType } from 'antd/lib/table';
import { formatToSeconds } from '../../utils/time.util';
import HttpService, { SafeAny } from '../../http/http.service';
import { Button, Modal } from 'antd';
import BackendProjectVersion from './BackendProjectVersion';
interface BackendProjectInfo {
  service: string;
  repoName: string;
  tag: string;
  imageId: string;
  publishTime: string;
  imageCreateTime: string;
}
const Backend: React.FC = () => {
  let {data, regetData} = useGet<BackendProjectInfo[]>('/backend/listServiceImageInfo', []);
  const [visible, setVisible] = useState(false);
  const [repo_name, setRepoName] = useState<string>('');
  const [new_tag, setOriginTag] = useState<string>('');
  function handleCancel(): void {
    setVisible(false);
  }
  function changeProjectVersion(origin_tag: string): void {
    setVisible(false);
    // eslint-disable-next-line @typescript-eslint/camelcase
    HttpService.get('/repo/addNewTag', {repo_name, origin_tag, new_tag})
      .then(() => regetData())
  }
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
          setRepoName(record.repoName);
          setOriginTag(record.tag);
          setVisible(true);
        }}>切换</Button>
      )
    }
  ];
  return (
    <div className="panel">
      <Table
        pagination={false}
        columns={columns}
        bordered={true}
        dataSource={data.map((item, index) => ({ ...item, key: index + 1 }))}
      />
      <Modal
        centered={true}
        title="版本选择"
        visible={visible}
        width={900}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <BackendProjectVersion
        repo_name={repo_name}
        changeProjectVersion={changeProjectVersion}
        />
      </Modal>
    </div>
  )
}

export default Backend;
