/* eslint-disable react/display-name */
import React, { useState } from 'react';
import { Table, Button } from 'antd';
import { useGet } from '../../hooks/useHttp';
import { formatToSeconds } from '../../utils/time.util';
import Modal from 'antd/lib/modal/Modal';
import FrontendProjectVersion from './FrontendProjectVersion';
import HttpService, { SafeAny } from '../../http/http.service';
import { ColumnType } from 'antd/lib/table';

type FrontProjectInfo = {
  name: string;
  version: string;
  publishTime: string;
  versionCreateTime: string;
};
const Frontend: React.FC = () => {
  let {data, regetData} = useGet<FrontProjectInfo[]>('/front/listProjects', []);
  const [visible, setVisible] = useState(false);
  const [selectProject, setSelectProject] = useState<string>('');
  const [currentVersion, setCurrentVersion] = useState<string>('')
  function handleCancel(): void {
    setVisible(false);
  }
  function handleOk(): void {
    setVisible(false);
  }

  function changeProjectVersion(version: number): void {
    setVisible(false);
    HttpService.get('/front/setProjectOnlineVserion', {project_name: selectProject,version})
      .then(() => regetData())
  }
  const columns: ColumnType<FrontProjectInfo>[] = [
    {
      title: '项目名称',
      dataIndex: 'name',
      align: 'center',
      key: 'name',
      render: (name: string): JSX.Element => <span>{name}</span>
    },
    {
      title: '当前版本',
      dataIndex: 'version',
      align: 'center',
      key: 'version',
      render: (version: number): JSX.Element => <span>{version}</span>
    },
    {
      title: '上线时间',
      dataIndex: 'publishTime',
      align: 'center',
      key: 'publishTime',
      render: (publishTime: number): JSX.Element => <span>{formatToSeconds(publishTime)}</span>
    },
    {
      title: '版本生成时间',
      dataIndex: 'versionCreateTime',
      align: 'center',
      key: 'versionCreateTime',
      render: (versionCreateTime: number): JSX.Element => <span>{formatToSeconds(versionCreateTime)}</span>
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (text: SafeAny, record: FrontProjectInfo): JSX.Element => (
        <Button type="primary" onClick={(): void => {
          setSelectProject(record.name);
          setCurrentVersion(record.version);
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
        dataSource={data.map((item, index) => ({ ...item, key: index }))}
      />
      <Modal
        centered={true}
        title={`${selectProject}版本选择`}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
        footer={null}
        destroyOnClose
      >
        <FrontendProjectVersion

        project_name={selectProject}
        currentVersion={currentVersion}
        changeProjectVersion={changeProjectVersion}
        />
      </Modal>
    </div>

  )
}

export default Frontend;
