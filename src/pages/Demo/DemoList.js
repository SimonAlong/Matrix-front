import React from 'react';
import { connect } from 'dva';
import { QuestionCircleOutlined } from '@ant-design/icons';

import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Modal,
  Popconfirm,
  Table,
  Switch,
  Radio,
} from 'antd';


const { Search } = Input;
const expandable = { expandedRowRender: record => <p>{record.description}</p> };
const title = () => '职工表';
const showHeader = true;
const footer = () => '指令集科技';


@connect(({ demoModel, loading }) => ({
  demoModel,
  loading: loading.models.demoModel,
}))


@Form.create()
class DemoList extends React.Component {

  state = {
    bordered: false,
    loading: false,
    pagination:{onChange: (cp)=>this.createData(cp),total:100},
    size: 'default',
    expandable,
    title: undefined,
    showHeader,
    footer,
    rowSelection: {},
    scroll: undefined,
    hasData: true,
    tableLayout: undefined,
    visible: false,
  };


  columns = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: '地址',
      dataIndex: 'address',
      filters: [
        {
          text: '北京',
          value: '北京',
        },
        {
          text: '上海',
          value: '上海',
        },
        {
          text: '杭州',
          value: '杭州',
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: '操作',
      key: 'action',
      sorter: true,
      filters: [],
      onFilter: () => {},
      render: () => (
        <span>
          <a style={{ marginRight: 16 }}>编辑</a>
          <Popconfirm title="确定删除该条信息？" icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
            <a style={{ marginRight: 16 }}>删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  // 界面初始化函数
  componentDidMount() {
    this.createData(1);
  }

  // 普通的函数
  createData = (cp) => {
    // 重要：当我们要调用Model中的函数的时候，应该通过dispatch来调用
    const { dispatch } = this.props;
    // 派发器
    dispatch({
      type: 'demoModel/getFakeList',
      payload: {
        pageSize: 5,
        currentPage: cp,
      },
    });
  };

  handleToggle = prop => enable => {
    this.setState({ [prop]: enable });
  };

  handleSizeChange = e => {
    this.setState({ size: e.target.value });
  };

  handleTableLayoutChange = e => {
    this.setState({ tableLayout: e.target.value });
  };


  handleEllipsisChange = enable => {
    this.setState({ ellipsis: enable });
  };

  handleTitleChange = enable => {
    this.setState({ title: enable ? title : undefined });
  };

  handleHeaderChange = enable => {
    this.setState({ showHeader: enable ? showHeader : false });
  };

  handleFooterChange = enable => {
    this.setState({ footer: enable ? footer : undefined });
  };

  handleRowSelectionChange = enable => {
    this.setState({ rowSelection: enable ? {} : undefined });
  };

  handleYScrollChange = enable => {
    this.setState({ yScroll: enable });
  };

  handleXScrollChange = e => {
    this.setState({ xScroll: e.target.value });
  };

  handleDataChange = hasData => {
    this.setState({ hasData });
  };

  handlePaginationChange = e => {
    const { value } = e.target;
    this.setState({
      pagination: value === 'none' ? false : { position: value ,total: 100,pageSize: 5,onChange: (cp)=>this.createData(cp)},
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {

    // 变量引用：props方式，props是外部数据引用过来的变量，比如Model文件，我们这里引入，Model中的数据就应该这样使用
    const {
      demoModel: {data}
    } = this.props;

    const {visible} = this.state;

    const { xScroll, yScroll, ...state } = this.state;

    const scroll = {};

    if (yScroll) {
      scroll.y = 240;
    }
    if (xScroll) {
      scroll.x = '100vw';
    }

    const tableColumns = this.columns.map(item => ({ ...item, ellipsis: state.ellipsis }));

    if (xScroll === 'fixed') {
      tableColumns[0].fixed = true;
      tableColumns[tableColumns.length - 1].fixed = 'right';
    }

    return (

      <Card bordered={false}>
        <Form
          layout="inline"
          className="components-table-demo-control-bar"
          style={{ marginBottom: 14 }}
        >
          <Row>
            <Col span={8}>
              <Search
                placeholder="输入查询条件"
                enterButton="查询"
                width={400}
                size="default"
                onSearch={value => console.log(value)}
              />
            </Col>
            <Col span={2} offset={12}>
              <Button size="big" icon="plus" type="primary" onClick={this.showModal}>
                新建
              </Button>
            </Col>
            <Col span={2}>
              <Button icon="minus" type="danger">
                批量删除
              </Button>
            </Col>
          </Row>
          <div>
            <Modal
              title="添加职员"
              visible={visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <h4>姓名</h4>
              <Input />
              <h4>年龄</h4>
              <Input />
              <h4>住址</h4>
              <Input />
            </Modal>
          </div>
          <br />
          <br />
          <Form.Item label="边框">
            <Switch checked={state.bordered} onChange={this.handleToggle('bordered')} />
          </Form.Item>
          <Form.Item label="标题">
            <Switch checked={!!state.title} onChange={this.handleTitleChange} />
          </Form.Item>
          <Form.Item label="显示字段">
            <Switch checked={!!state.showHeader} onChange={this.handleHeaderChange} />
          </Form.Item>
          <Form.Item label="表脚">
            <Switch checked={!!state.footer} onChange={this.handleFooterChange} />
          </Form.Item>
          <Form.Item label="选择框">
            <Switch checked={!!state.rowSelection} onChange={this.handleRowSelectionChange} />
          </Form.Item>
          <Form.Item label="固定表头">
            <Switch checked={!!yScroll} onChange={this.handleYScrollChange} />
          </Form.Item>
          <Form.Item label="显示数据">
            <Switch checked={!!state.hasData} onChange={this.handleDataChange} />
          </Form.Item>
          <br />
          <Form.Item label="表格尺寸">
            <Radio.Group value={state.size} onChange={this.handleSizeChange}>
              <Radio.Button value="default">默认</Radio.Button>
              <Radio.Button value="middle">中</Radio.Button>
              <Radio.Button value="small">小</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="横向滚动">
            <Radio.Group value={xScroll} onChange={this.handleXScrollChange}>
              <Radio.Button value={undefined}>不设置</Radio.Button>
              <Radio.Button value="scroll">滚动</Radio.Button>
              <Radio.Button value="fixed">固定列</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="页码导航">
            <Radio.Group
              value={state.pagination ? state.pagination.position : 'none'}
              onChange={this.handlePaginationChange}
            >
              <Radio.Button value="top">上方</Radio.Button>
              <Radio.Button value="bottom">下方</Radio.Button>
              <Radio.Button value="both">上下</Radio.Button>
              <Radio.Button value="none">无</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form>
        <Table
          {...this.state}
          columns={tableColumns}
          dataSource={state.hasData ? data : null}
          scroll={scroll}
        />
      </Card>
    );
  }
}

export default DemoList;

