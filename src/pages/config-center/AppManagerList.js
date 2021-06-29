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
  Icon,
  Radio,
  Select,
  DatePicker,
  Pagination,
  InputNumber,
  Alert,
  Modal,
} from 'antd';

import router from 'umi/router';
import moment from 'moment';
import styles from './AppManagerList.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {getUserInfo} from "@/utils/userInfo";

import MonacoEditor from 'react-monaco-editor';

const { TextArea } = Input;
const { RangePicker } = DatePicker;
const EditableContext = React.createContext();
const FormItem = Form.Item;
const EditableFormRow = Form.create()(({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
));
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1022745_a4g5e46cm5.js',
});
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
      title="新增应用"
      visible={modalVisible}
      onOk={okHandle}
      maskClosable={false}
      onCancel={() => hideAddModal()}
    >
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="应用名" hasFeedback>
        {form.getFieldDecorator('appName', {
          rules: [{ required: true, message: '请输入应用名！' }],
        })(
          <Input placeholder="请输入项目名称，比如：ibo-business" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="应用描述" hasFeedback>
        {form.getFieldDecorator('appDesc', {
          rules: [{ message: '请输入应用描述！' }],
        })(
          <TextArea
            placeholder="应用描述"
            autoSize={{ minRows: 3, maxRows: 6 }}
          />
        )}
      </FormItem>
    </Modal>
  );
});

// 导入配置弹窗
const ImportConfigForm = Form.create()(prop => {
  const { modalVisible, form, handleImportConfig, groupList, hideImportConfigModal } = prop;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      form.resetFields();
      handleImportConfig(fieldsValue);
    });
  };

  const options = {
    selectOnLineNumbers: true,
  };

  const groupOptions = groupList.map(group => <Select.Option key={group}>{group}</Select.Option>);

  return (
    <Modal
      destroyOnClose
      title="导入总配置"
      visible={modalVisible}
      width={800}
      onOk={okHandle}
      maskClosable={false}
      onCancel={() => hideImportConfigModal()}
    >
      <Alert message="嵌套深度：表示解析yml时候，key的级数，比如yml为k1: v1: 12，嵌套深度为2，则对应的key为k1.v1，value为12" type="success" />
      <br/>
      <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} label="嵌套深度">
        {form.getFieldDecorator('nestedPathDeep', {
          rules: [{ required: true, message: '请输入嵌套深度1~6！' }],
        })(
          <InputNumber min={1} max={6} defaultValue={3}/>
        )}
      </FormItem>
      <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 10 }} label="分组名称">
        {form.getFieldDecorator('group', {
          initialValue: "default",
          rules: [{ required: true, message: '请选择分组' }],
        })(
          <Select
            showSearch
            style={{ width: '100%' }}
            placeholder="配置组"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {groupOptions}
          </Select>
        )}
      </FormItem>
      <Alert message="配置目前只支持yml类型" type="warning" />
      <br/>
      <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} label="配置">
        {form.getFieldDecorator('configContent', {
          rules: [{ required: true, message: '请填写yml类型对应的value' }],
        })(
          <MonacoEditor
            width="100%"
            height="300"
            language="yaml"
            theme="vs-dark"
            value={""}
            options={options}
          />
        )}
      </FormItem>
    </Modal>
  );
});

// 展示的应用初始化配置
const InitAppConfigForm = Form.create()(prop => {
  const { modalVisible, form, handleAdd, hideModel, onChangeLookConfigItem, groupList, showAppInitValueFromGroup, editorDidMountLookConfigItem, currentValue } = prop;
  const okHandle = () => {
    // if(form.getFieldValue('valueType') !== "3") {
    //   form.setFieldsValue({ value: currentValue });
    // }

    form.validateFields((err, fieldsValue) => {
      //console.log("validate1");
      if (err) return;

      //console.log("validate");
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };

  const options = {
    selectOnLineNumbers: true,
    readOnly: true
  };

  const groupOptions = groupList.map(group => <Select.Option key={group}>{group}</Select.Option>);

  return (
    <Modal
      destroyOnClose
      title="部署的配置总览"
      visible={modalVisible}
      onOk={() => hideModel()}
      width={800}
      onCancel={() => hideModel()}
    >
      <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 10 }} label="分组名称">
        {form.getFieldDecorator('group', {
          initialValue: "default"
        })(
          <Select
            showSearch
            style={{ width: '100%' }}
            onSelect={showAppInitValueFromGroup}
            placeholder="配置组"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {groupOptions}
          </Select>
        )}
      </FormItem>
      <MonacoEditor
        width="100%"
        height="500"
        language="yaml"
        theme="vs-dark"
        value={currentValue}
        options={options}
        onChange={onChangeLookConfigItem}
        editorDidMount={editorDidMountLookConfigItem}
      />
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
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="项目名称">
        {form.getFieldDecorator('appName', {
          initialValue: item.appName
        })(
          <Input placeholder="请输入项目名称，比如：ibo-business" disabled />
        )}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="应用描述">
        {form.getFieldDecorator('appDesc', {
          initialValue: item.appDesc,
          rules: [{ required: true, message: '请输入应用描述！' }],
        })(
          <TextArea
            placeholder="请输入项目描述"
            autoSize={{ minRows: 3, maxRows: 6 }}
          />
        )}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="激活状态">
        {form.getFieldDecorator('activeStatus', {
          initialValue: activeStr,
          rules: [{ required: true, message: '请选择激活状态：0非激活，1激活！' }],
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

const ValueView = Form.create()(prop => {
  const { modalVisible, form, handleAdd, hideValueCodeModal, showOverviewValueFromGroup, onChangeLookConfigItem, groupList, editorDidMountLookConfigItem, currentValue } = prop;
  const okHandle = () => {
    // if(form.getFieldValue('valueType') !== "3") {
    //   form.setFieldsValue({ value: currentValue });
    // }

    form.validateFields((err, fieldsValue) => {
      //console.log("validate1");
      if (err) return;

      //console.log("validate");
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };

  const options = {
    selectOnLineNumbers: true,
    readOnly: true
  };

  const groupOptions = groupList.map(group => <Select.Option key={group}>{group}</Select.Option>);

  return (
    <Modal
      destroyOnClose
      title="配置总览"
      visible={modalVisible}
      onOk={() => hideValueCodeModal()}
      width={800}
      onCancel={() => hideValueCodeModal()}
    >
      <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 10 }} label="分组名称">
        {form.getFieldDecorator('group', {
          initialValue: "default"
        })(
          <Select
            showSearch
            style={{ width: '100%' }}
            onSelect={showOverviewValueFromGroup}
            placeholder="配置组"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {groupOptions}
          </Select>
        )}
      </FormItem>
      <MonacoEditor
        width="100%"
        height="500"
        language="yaml"
        theme="vs-dark"
        value={currentValue}
        options={options}
        onChange={onChangeLookConfigItem}
        editorDidMount={editorDidMountLookConfigItem}
      />
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
@connect(({ appManagerModel, authModel, profileManagerModel, loading}) => ({
  appManagerModel,
  authModel,
  profileManagerModel,
  loading: loading.models.appManagerModel,
}))
// @Form.create() 是一个注解，就简化了xxx = Form.create(xxx);export xxx
@Form.create()
class AppManagerList extends PureComponent {
  state = {
    addModalVisible: false,
    importConfigModalVisible: false,
    initAppConfigModalVisible: false,
    editModalVisible: false,
    valueViewVisible: false,
    appId: null,
    valueType: 10,
    item: {},
  };

  columns = [
    {
      name: 'appName',
      title: '应用名',
      dataIndex: 'appName',
      width: '20%',
    },
    {
      name: 'lookConfigItem',
      title: '配置项',
      dataIndex: 'lookConfigItem',
      width: '7%',
      render: (text, record) => (<a onClick={() => this.clock(record)}>配置项</a>)
    },
    {
      name: 'appDesc',
      title: '应用描述',
      dataIndex: 'appDesc',
      width: '28%',
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
      name: 'machineNum',
      title: '客户端数',
      dataIndex: 'machineNum',
      width: '7%',
    },
    {
      name: 'configNum',
      title: '配置个数',
      dataIndex: 'configNum',
      width: '8%',
    },
    {
      name: 'importConfig',
      title: '导入配置',
      dataIndex: 'importConfig',
      width: '7%',
      render: (text, record) => (<a onClick={() => this.showImportConfigModal(record.id)}>导入</a>)
    },
    {
      name: 'overView',
      title: '总览',
      dataIndex: 'overView',
      width: '5%',
      render: (text, record) => (<a onClick={() => this.showAppOverViewValue(record.id)} >总览</a>)
    },
    {
      name: 'edit',
      title: '编辑',
      dataIndex: 'edit',
      width: '5%',
      render: (text, record) => (
        <span>
          <Button type="primary" icon="edit" onClick={() => this.showEditModal(record)} />
        </span>
      ),
    },
    {
      name: 'delete',
      title: '删除',
      dataIndex: 'delete',
      editable: false,
      width: '5%',
      render: (text, row) => (
        <span>
          <Button type="danger" icon="delete" onClick={() => this.showDeleteConfirm(row)} />
        </span>
      ),
    },
  ];

  // 界面初始化函数
  componentDidMount() {
    // 获取权限
    this.getAuth();

    // 获取页面的总个数
    this.getPageData(1);

    // 获取命名空间列表
    this.getProfileList();
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
    const {appManagerModel: { profile }} = this.props;
    const {
      appManagerModel: { searchParam, pager },
    } = this.props;

    this.setTableLoading();
    let param = searchParam;
    if (searchParamInput !== undefined) {
      param = searchParamInput;
    }

    param = {
      ...param,
      profile: profile
    };

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
      type: 'appManagerModel/getPage',
      payload: {
        pager: pagerFinal,
        searchParam: param,
      },
    });
  }

  // 获取命名空间列表
  getProfileList=() =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'profileManagerModel/getProfileList'
    });
  };

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
        <Col span={6}>
          <Badge status="success" text="创建人：" />
          {/* eslint-disable-next-line radix */}
          <span>{record.createUser}</span>
        </Col>
        <Col span={6}>
          <Badge status="success" text="更新人：" />
          {/* eslint-disable-next-line radix */}
          <span>{record.updateUser}</span>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={6}>
          <Badge status="success" text="部署配置预览：" />
          <span><Button onClick={()=>this.showInitConfig(record.id)} type="primary" size="small">预览</Button></span>
        </Col>
      </Row>
    </div>
  );

  // 跳转
  clock = (record) => {
    const {
      appManagerModel: { profile },
    } = this.props;
    router.push({
      pathname: '/appManager/configItem',
      state: {
        appId: record.id,
        appName: record.appName,
        profile,
      },
    });
  };

  showDeleteConfirm = row => {
    const { dispatch } = this.props;
    const {
      appManagerModel: { profile },
    } = this.props;
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
          type: 'appManagerModel/delete',
          payload: {
            id:row.id,
            profile
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

  showImportConfigModal = (appId) => {
    this.setState({
      importConfigModalVisible: true,
      appId,
    });

    // 先获取分组列表
    this.getGroupList(appId);
  };

  hideImportConfigModal = () => {
    this.setState({
      importConfigModalVisible: false,
      appId: null,
    });
  };

  // 展示应用部署时候的配置展示
  showInitConfig = (appId) => {
    this.setState({
      initAppConfigModalVisible: true,
      appId,
    });

    this.setState({appId: appId});

    const { dispatch } = this.props;
    const { appManagerModel: { profile }} = this.props;

    // 获取分组列表
    this.getGroupList(appId);

    dispatch({
      type: 'appManagerModel/setConfigInitShow',
      payload: "",
    });

    dispatch({
      type: 'appManagerModel/configInitShow',
      payload: {
        appId,
        profile,
        group: "default"
      }
    });
  };

  hideInitConfig = () => {
    this.setState({
      initAppConfigModalVisible: false,
      appId: null,
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

  showValueCodeModal = (valueType, value) => {
    this.setState({
      valueType: valueType,
      valueViewVisible: true,
    });

    const { dispatch } = this.props;
    dispatch({
      type: 'appManagerModel/setCurrentValue',
      payload: value,
    });
  };

  hideValueCodeModal = () => {
    this.setState({
      valueCode: "",
      valueViewVisible: false,
    });
  };

  showOverviewValueFromGroup=(group)=>{
    const {appId} = this.state;
    const {
      dispatch,
      appManagerModel: {  profile },
    } = this.props;

    dispatch({
      type: 'appManagerModel/setCurrentValue',
      payload: "",
    });

    // 获取总览配置
    dispatch({
      type: 'appManagerModel/getAppOverview',
      payload: {
        appId,
        profile,
        group
      }
    });
  };

  showAppInitValueFromGroup=(group)=>{
    const {appId} = this.state;
    const {
      dispatch,
      appManagerModel: {  profile },
    } = this.props;

    // 获取应用部署配置
    dispatch({
      type: 'appManagerModel/configInitShow',
      payload: {
        appId,
        profile,
        group
      }
    });
  };

  // 设置表格加载
  setTableLoading = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'appManagerModel/setTableLoading',
    });
  };

  // 获取应用级别的value总览
  showAppOverViewValue =(appId) =>{
    const { dispatch } = this.props;
    const {
      appManagerModel: { currentValue, profile },
    } = this.props;

    this.setState({appId: appId});

    // 先获取分组列表
    this.getGroupList(appId);

    // 设置展示value的内容为空
    this.showValueCodeModal(0, "");

    // 获取总览配置
    dispatch({
      type: 'appManagerModel/getAppOverview',
      payload: {
        appId,
        profile,
        group: "default"
      }
    });
  };

  // 添加
  handleAdd = fields => {
    const { dispatch } = this.props;
    const {
      appManagerModel: { profile },
    } = this.props;
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
      profile,
      commonFlag: 0
    };

    dispatch({
      type: 'appManagerModel/add',
      payload: params,
    });

    this.hideAddModal();
  };

  // 导入配置项
  handleImportConfig = fields => {
    const { dispatch } = this.props;
    const { appId } = this.state;
    const {
      appManagerModel: { profile },
    } = this.props;
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
      profile,
      appId,
    };

    dispatch({
      type: 'appManagerModel/importConfig',
      payload: params,
    });

    this.hideImportConfigModal();
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
    const {appManagerModel: { profile },} = this.props;
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
        profile
      };

      if(fields.activeStatus === '非激活'){
        params.activeStatus = 0;
      } else if (fields.activeStatus === '激活') {
        params.activeStatus = 1;
      }

      //console.log(JSON.stringify(params));
      dispatch({
        type: 'appManagerModel/update',
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
          <Col lg={8}>
            <FormItem label="应用名称">
              {getFieldDecorator('appName')(
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

  // 获取分组列表
  getGroupList = (appId) => {
    const {appManagerModel: { profile }} = this.props;

    const { dispatch } = this.props;
    dispatch({
      type: 'appManagerModel/getGroupList',
      payload: {
        profile
      }
    });
  };

  onRatioChange = e => {
    //console.log('radio4 checked', e.target.value);
    this.setState({
      value4: e.target.value,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'appManagerModel/setProfile',
      payload: e.target.value
    });
  };

  render() {
    const {
      appManagerModel: { selectState, groupAllCodeList, currentValue, initConfigValue, groupList },
      profileManagerModel: { profileList },
    } = this.props;

    // 替换表Table的组件
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const { addModalVisible, importConfigModalVisible, initAppConfigModalVisible, editModalVisible, valueViewVisible, item } = this.state;
    const parentAddMethods = {
      selectState,
      groupAllCodeList,
      handleAdd: this.handleAdd,
      hideAddModal: this.hideAddModal,
    };
    const parentImportConfigMethods = {
      selectState,
      groupAllCodeList,
      groupList,
      handleImportConfig: this.handleImportConfig,
      hideImportConfigModal: this.hideImportConfigModal,
    };
    const parentEditMethods = {
      item,
      handleEdit: this.handleEdit,
      hideEditModal: this.hideEditModal,
    };

    const valueViewConfig = {
      currentValue,
      groupList,
      showOverviewValueFromGroup: this.showOverviewValueFromGroup,
      hideValueCodeModal: this.hideValueCodeModal,
    };

    const initConfigValueConfig = {
      currentValue: initConfigValue,
      hideModel: this.hideInitConfig,
      groupList,
      showAppInitValueFromGroup: this.showAppInitValueFromGroup
    };

    const {
      appManagerModel: { totalNumber, pager, tableList, tableLoading, profile },
    } = this.props;

    const optionsWithDisabled = [
      { label: 'Apple', value: 'Apple' },
      { label: 'Pear', value: 'Pear' },
      { label: 'Orange', value: 'Orange', disabled: true },
    ];

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
            expandedRowRender={this.expandedRowRender}
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

    let profileSelect=[];
    if(profileList !== undefined && profileList !== '') {
      profileSelect = profileList.map(profile =>(
        <Radio.Button style={{marginTop: "10px", marginLeft: "5px"}} key={profile} value={profile}>{profile}</Radio.Button>
      ));
    }


    return (
      <PageHeaderWrapper>
        <Radio.Group onChange={this.onRatioChange} value={profile} buttonStyle="solid">
          {profileSelect}
        </Radio.Group>
        <br />
        <br />
        {tableInfo()}
        <CreateForm {...parentAddMethods} modalVisible={addModalVisible} />
        <ImportConfigForm {...parentImportConfigMethods} modalVisible={importConfigModalVisible} />
        <InitAppConfigForm {...initConfigValueConfig} modalVisible={initAppConfigModalVisible} />
        <EditForm {...parentEditMethods} modalVisible={editModalVisible} />
        <ValueView {...valueViewConfig} modalVisible={valueViewVisible} />
      </PageHeaderWrapper>
    );
  }
}

export default AppManagerList;
