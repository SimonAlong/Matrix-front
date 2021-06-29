import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Badge,
  Form,
  Input,
  Button,
  Table,
  List,
  Select,
  DatePicker,
  Pagination,
  InputNumber,
  Icon,
  Modal,
} from 'antd';

import moment from 'moment';
import styles from './ProfileManagerList.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {getUserInfo} from "@/utils/userInfo";

const { TextArea } = Input;
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1022745_a4g5e46cm5.js',
});
const { RangePicker } = DatePicker;
const EditableContext = React.createContext();
const FormItem = Form.Item;
const EditableFormRow = Form.create()(({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
));

// 弹窗增加配置项
const CreateForm = Form.create()(prop => {
  const { modalVisible, form, handleAdd, hideAddModal } = prop;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      form.resetFields();
      handleAdd(fieldsValue);
    });
  };

  return (
    <Modal
      destroyOnClose
      title="新增"
      visible={modalVisible}
      onOk={okHandle}
      maskClosable={false}
      onCancel={() => hideAddModal()}
    >
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="环境变量" hasFeedback>
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入环境变量！' }],
        })(
          <Input placeholder="请输入环境变量" />
        )}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="描述" hasFeedback>
        {form.getFieldDecorator('desc', {
          rules: [{ required: true, message: '请输入描述！' }],
        })(
          <TextArea
            placeholder="请输入描述"
            autoSize={{ minRows: 6, maxRows: 12 }}
          />
        )}
      </FormItem>
    </Modal>
  );
});

const EditForm = Form.create()(props => {
  const { modalVisible, form, handleEdit, hideEditModal, item } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      form.resetFields();
      handleEdit(fieldsValue);
    });
  };


  let activeStr;
  if(item.activeStatus == 0) {
    activeStr="非激活"
  } else {
    activeStr="激活"
  }

  return (
    <Modal
      destroyOnClose
      title="编辑"
      visible={modalVisible}
      onOk={okHandle}
      maskClosable={false}
      onCancel={() => hideEditModal()}
    >
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="主键id">
        {form.getFieldDecorator('id', {
          initialValue: item.id,
          rules: [{ required: true, message: '请输入主键id！' }],
        })(
          <Input placeholder="请输入主键id" disabled />
        )}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="环境变量">
        {form.getFieldDecorator('name', {
          initialValue: item.profile,
          rules: [{ required: true, message: '请输入环境变量！' }],
        })(
          <Input placeholder="请输入环境变量" disabled />
        )}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="描述">
        {form.getFieldDecorator('desc', {
          initialValue: item.desc,
          rules: [{ required: true, message: '请输入描述！' }],
        })(
          <TextArea
            placeholder="请输入描述"
            autoSize={{ minRows: 6, maxRows: 12 }}
          />
        )}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="激活状态">
        {form.getFieldDecorator('activeStatus', {
          initialValue: activeStr,
          rules: [{ required: true, message: '激活状态' }],
        })(
          <Select style={{ width: '100%' }} allowClear>
            <Option value="0">非激活</Option>
            <Option value="1">激活</Option>
          </Select>
        )}
      </FormItem>
    </Modal>
  );
});

// 可编辑的列中的元素
class EditableCell extends PureComponent {
  getInput = () => {
    const { inputType } = this.props;
    if (inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  render() {
    const { editing, dataIndex, title, inputType, record, index, ...restProps } = this.props;
    return (
      <EditableContext.Consumer>
        {form => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [
                      {
                        required: true,
                        message: `请输入 ${title}!`,
                      },
                    ],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : (
                restProps.children
              )}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

/* eslint react/no-multi-comp:0 */
@connect(({ profileManagerModel, authModel, loading}) => ({
  profileManagerModel,
  authModel,
  loading: loading.models.profileManagerModel,
}))
// @Form.create() 是一个注解，就简化了xxx = Form.create(xxx);export xxx
@Form.create()
class ProfileManagerList extends PureComponent {
  state = {
    addModalVisible: false,
    editModalVisible: false,
    item: {},
  };

  columns = [
    {
      name: 'profile',
      title: '环境变量',
      dataIndex: 'profile',
      width: '20%',
    },
    {
      name: 'desc',
      title: '描述',
      dataIndex: 'desc',
      width: '37%',
    },
    {
      name: 'activeStatus',
      title: '激活状态',
      dataIndex: 'activeStatus',
      width: '8%',
      render: (text, record)=>{
        if(text === 0){
          return (<IconFont type="icon-jinyong" style={{ fontSize: '24px', marginTop: "6px"}} />)
        }
        return (<IconFont type="icon-running" style={{ fontSize: '24px', marginTop: "6px"}} />)
      }
    },
    {
      name: 'createUser',
      title: '创建者',
      dataIndex: 'createUser',
      width: '10%',
    },
    {
      name: 'createTime',
      title: '创建时间',
      dataIndex: 'createTime',
      width: '20%',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      name: 'edit',
      title: '编辑',
      dataIndex: 'edit',
      width: '5%',
      render: (text, record) => {
        if(record.profile === 'default') {
          return (<span/>);
        }
        return (<span><Button type="primary" icon="edit" onClick={() => this.showEditModal(record)} /></span>)
      }
    },
    {
      name: 'delete',
      title: '删除',
      dataIndex: 'delete',
      editable: false,
      width: '5%',
      render: (text, record) => {
        if(record.profile === 'default') {
          return (<span/>);
        }
        return (<span><Button type="danger" icon="delete" onClick={() => this.showDeleteConfirm(record)} /></span>)
      }
    },
  ];

  // 界面初始化函数
  componentDidMount() {
    // 获取权限
    this.getAuth();

    // 获取命名空间所有数据
    this.getPageData(1);
  }

  // 刷新用户界面的权限
  getAuth() {
    const {dispatch} = this.props;
    dispatch({
      type: 'authModel/getAuthOfUser',
    });
  }

  getPageData(pageNo, searchParamInput) {
    const { dispatch } = this.props;
    const {
      profileManagerModel: { searchParam, pager },
    } = this.props;

    this.setTableLoading();
    let param = searchParam;
    if (searchParamInput !== undefined) {
      param = searchParamInput;
    }

    let pagerFinal = pager;
    if (pageNo !== undefined) {
      pagerFinal = {
        ...pager,
        pageNo,
      };
    }

    //console.log("pager param");
    //console.log(JSON.stringify(pagerFinal));
    //console.log(JSON.stringify(param));

    // 获取页面的总个数
    dispatch({
      type: 'profileManagerModel/getPage',
      payload: {
        pager: pagerFinal,
        searchParam: param,
      },
    });
  }

  expandedRowRender = record => (
    <div>
      <Row>
        <Col span={6}>
          <Badge status="success" text="创建时间：" />
          {/* eslint-disable-next-line radix */}
          <span>{moment(record.createTime).format('YYYY-MM-DD HH:mm:ss')}</span>
        </Col>
        <Col span={6}>
          <Badge status="success" text="更新时间：" />
          {/* eslint-disable-next-line radix */}
          <span>{moment(record.updateTime).format('YYYY-MM-DD HH:mm:ss')}</span>
        </Col>
      </Row>
      <br />
    </div>
  );

  showDeleteConfirm = row => {
    const { dispatch } = this.props;
    // //console.log('点击');
    // //console.log(JSON.stringify(row));
    const showLoading = ()=>this.setTableLoading();
    Modal.confirm({
      title: '确定要删除这条配置',
      okText: '确定删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        showLoading();
        //console.log('OK');
        dispatch({
          type: 'profileManagerModel/delete',
          payload: {
            id:row.id,
          },
        });
      },
      onCancel() {
        //console.log('Cancel');
      },
    });
  };

  showAddModal = () => {
    this.setState({
      addModalVisible: true,
    });
  };

  hideAddModal = () => {
    this.setState({
      addModalVisible: false,
    });
  };

  showEditModal = record => {
    //console.log('点击编辑');
    this.setState({
      item: record,
      editModalVisible: true,
    });
  };

  hideEditModal = () => {
    this.setState({
      editModalVisible: false,
    });
  };

  // 设置表格加载
  setTableLoading = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'profileManagerModel/setTableLoading',
    });
  };

  // 添加
  handleAdd = fields => {
    const { dispatch } = this.props;
    const userInfo = getUserInfo();
    let userName = "";
    if(userInfo !== null) {
      userName = userInfo.displayName;
    }

    this.setTableLoading();

    // 将中间添加的脚本放进去
    const params = {
      ...fields,
      createUserName: userName,
    };

    dispatch({
      type: 'profileManagerModel/add',
      payload: params,
    });

    this.hideAddModal();
  };

  // 判断对象1是否包含对象2的所有属性
  contain = (object1, object2) => {
    let index = 0;
    const keys = Object.keys(object2);
    for (let i = 0; i < keys.length; i += 1) {
      const name = keys[i];
      if (object1[name] && object2[name] === object1[name]) {
        index += 1;
      }
    }
    return index === Object.keys(object2).length;
  };

  handleEdit = fields => {
    const { dispatch } = this.props;
    const { item } = this.state;
    const userInfo = getUserInfo();
    let userName = "";
    if(userInfo !== null) {
      userName = userInfo.displayName;
    }

    //console.log('编辑修改');
    //console.log(JSON.stringify(fields));
    //console.log(JSON.stringify(item));

    // 判断是否有修改，如果没有修改，则不向后端发起更新
    if (!this.contain(item, fields)) {
      this.setTableLoading();
      //console.log('有变化需要修改');
      const params = {
        ...Object.assign(item, fields),
        updateUserName: userName,
      };

      if (fields.activeStatus === '非激活') {
        params.activeStatus = 0;
      } else if (fields.activeStatus === '激活') {
        params.activeStatus = 1;
      }

      //console.log(JSON.stringify(params));
      dispatch({
        type: 'profileManagerModel/update',
        payload: params,
      });
    }

    this.hideEditModal();
  };

  handleSearch = e => {
    e.preventDefault();

    const { form } = this.props;

    //console.log('启动查询');
    this.setTableLoading();

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      for(let key in fieldsValue) {
        if(fieldsValue[key] === '') {
          delete fieldsValue[key]
        }
      };
      this.getPageData(1, fieldsValue);
    });
  };

  // 加载搜索输入框和搜索按钮
  renderSearchForm = () => {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col lg={7}>
            <FormItem label="环境变量">
              {getFieldDecorator('profile')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={2} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </span>
          </Col>
          <Col md={2} sm={24}>
            <Button icon="plus" type="primary" onClick={this.showAddModal}>
              新建
            </Button>
          </Col>
        </Row>
      </Form>
    );
  };

  onChange = page => {
    //console.log('页面索引修改');

    this.getPageData(page);
  };

  render() {
    const {
      profileManagerModel: { selectState, groupAllCodeList },
    } = this.props;

    // 替换表Table的组件
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const { addModalVisible, editModalVisible, item } = this.state;
    const parentAddMethods = {
      selectState,
      groupAllCodeList,
      handleAdd: this.handleAdd,
      hideAddModal: this.hideAddModal,
    };
    const parentEditMethods = {
      item,
      handleEdit: this.handleEdit,
      hideEditModal: this.hideEditModal,
    };

    const {
      profileManagerModel: { totalNumber, profileInfoList, pager, tableList, tableLoading },
    } = this.props;

    const tableInfo = () => (
      <Card bordered={false}>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{this.renderSearchForm()}</div>
          <Table
            size="middle"
            rowKey={record => record.id}
            components={components}
            dataSource={tableList}
            columns={this.columns}
            loading={tableLoading}
            pagination={false}
          />
          <br />
          <Pagination
            showQuickJumper
            onChange={this.onChange}
            defaultCurrent={1}
            total={totalNumber}
            current={pager.pageNo}
            defaultPageSize={pager.pageSize}
          />
        </div>
      </Card>
    );

    return (
      <PageHeaderWrapper>
        {tableInfo()}
        <CreateForm {...parentAddMethods} modalVisible={addModalVisible} />
        <EditForm {...parentEditMethods} modalVisible={editModalVisible} />
      </PageHeaderWrapper>
    );
  }
}

export default ProfileManagerList;
