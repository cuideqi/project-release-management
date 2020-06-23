/* eslint-disable react/display-name */
import React, { useState } from 'react';
import { Table, Button } from 'antd';
import { useGet } from '../../hooks/useHttp';
import { formatToSeconds } from '../../utils/time.util';
import Modal from 'antd/lib/modal/Modal';
import FrontProjectVersion from './FrontProjectVersion';
import HttpService, { SafeAny } from '../../http/http.service';

type FrontProjectInfo = {
  name: string;
  version: string;
  publishTime: string;
  versionCreateTime: string;
};
const Frontend: React.FC = () => {
  let data = useGet<FrontProjectInfo[]>('/mock/90/front/listProjects', []);
  const [visible, setVisible] = useState(false);
  const [selectProject, setSelectProject] = useState<string>('');
  function handleCancel(): void {
    setVisible(false);
  }
  function handleOk(): void {
    setVisible(false);
  }

  function changeProjectVersion(version: number): void {
    setVisible(false);
    // eslint-disable-next-line @typescript-eslint/camelcase
    HttpService.get('/mock/90/front/setProjectOnlineVserion', {project_name: selectProject,version})
      .then(() => HttpService.get('/mock/90/front/listProjects').then(res => data = res))
  }
  const columns = [
    {
      title: '项目名称',
      dataIndex: 'name',
      key: 'name',
      render: (name: string): JSX.Element => <span>{name}</span>
    },
    {
      title: '当前版本',
      dataIndex: 'version',
      key: 'version',
      render: (version: number): JSX.Element => <span>{version}</span>
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
      render: (text: SafeAny, record: FrontProjectInfo): JSX.Element => (
        <Button type="primary" onClick={(): void => {
          console.log(record);
          setSelectProject(record.name)
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
        dataSource={data.map((item, index) => ({ ...item, key: index }))}
      />
      <Modal
        centered={true}
        title="版本选择"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
        footer={null}
      >
        <FrontProjectVersion
        name={selectProject}
        changeProjectVersion={changeProjectVersion}
        />
      </Modal>
    </div>

  )
}

export default Frontend;
