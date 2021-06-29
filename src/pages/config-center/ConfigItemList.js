import React, { PureComponent, useState } from 'react';
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
  Radio,
  Select,
  Tag,
  Icon,
  DatePicker,
  Divider,
  Pagination,
  InputNumber,
  List,
  Tabs,
  Modal,
} from 'antd';

import Editor from '@monaco-editor/react';
import MonacoEditor from 'react-monaco-editor';

// 引入codemirror封装
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import moment from 'moment';
import styles from './ConfigItemList.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {getUserInfo} from "@/utils/userInfo";

// 主题风格
import 'codemirror/theme/eclipse.css';

// 代码模式，yaml
import 'codemirror/mode/yaml/yaml';
// 代码模式，properties
import 'codemirror/mode/properties/properties';
// 代码模式，javascript，这个类型包含json格式
import 'codemirror/mode/javascript/javascript';

const { Option } = Select;
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1022745_a4g5e46cm5.js',
});
const { TabPane } = Tabs;
const { TextArea } = Input;

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
  const { modalVisible, form, handleAdd, hideAddModal, currentValue, commonAppNameList, configItemKeyList, setAppNameToGetConfigItemKeyList, setKeyToGetCommonConfigInfo, commonInfoEntity, addConfigItemFromCommon , activeIndex, setActive} = prop;

  const options = {
    folding: false,
    selectOnLineNumbers: true,
  };

  const okHandle = () => {
    if(activeIndex === 1) {
      form.validateFields((err, fieldsValue) => {
        if (err) return;

        form.resetFields();
        handleAdd(fieldsValue);
      });
    } else {
      form.validateFields((err, fieldsValue) => {
        if (err) return;

        form.resetFields();
        addConfigItemFromCommon(fieldsValue);
      });
    }
  };

  const selectConfigItemKey=(configItemKey) =>{
    setKeyToGetCommonConfigInfo({
      appName: form.getFieldValue('appName'),
      configItemKey: configItemKey
    })
  };

  // todo 这里应该怎么搞
  const valueCode = () => {
    if (form.getFieldValue('valueType') === "0") {
      return (
        <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} label="值">
          {form.getFieldDecorator('value', {
            rules: [{ required: true, message: '请填写yml类型对应的value' }],
          })(
            <MonacoEditor
              width="100%"
              height="200"
              language="yaml"
              theme="vs-dark"
              value={currentValue}
              options={options}
            />
          )}
        </FormItem>
      );
    } else if(form.getFieldValue('valueType') === "1") {
      return (
        <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} label="值">
          {form.getFieldDecorator('value', {
            rules: [{ required: true, message: '请填写properties类型对应的value' }],
          })(
            <MonacoEditor
              width="100%"
              height="200"
              language="properties"
              theme="vs-dark"
              value={currentValue}
              options={options}
            />
          )}
        </FormItem>
      );
    } else if(form.getFieldValue('valueType') === "2") {
      return (
        <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} label="值">
          {form.getFieldDecorator('value', {
            rules: [{ required: true, message: '请填写json类型对应的value' }],
          })(
            <MonacoEditor
              width="100%"
              height="200"
              language="json"
              theme="vs-dark"
              value={currentValue}
              options={options}
            />
          )}
        </FormItem>
      );
    } else if(form.getFieldValue('valueType') === "3") {
      return (
        <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} label="值">
          {form.getFieldDecorator('value', {
            rules: [{ required: true, message: '请填写字符类型对应的value' }],
          })(
            <Input placeholder="请输入value" />
          )}
        </FormItem>
      );
    }
    return (<span />);
  };

  // 应用名列表
  const appOptions = commonAppNameList.map(d => <Select.Option key={d}>{d}</Select.Option>);

  // 配置项列表
  const configItemKeyOption = configItemKeyList.map(d => <Select.Option key={d}>{d}</Select.Option>);

  // todo 这里应该怎么搞
  const commonValueCode = () => {
    if (commonInfoEntity.valueType === 0) {
      return (
        <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} label="值">
          {form.getFieldDecorator('value', {
            initialValue: commonInfoEntity.value,
            rules: [{ required: true, message: '请填写字符类型对应的value' }],
          })(
            <MonacoEditor
              width="100%"
              height="200"
              language="yaml"
              theme="vs-dark"
              options={options}
            />
          )}
        </FormItem>
      );
    } else if(commonInfoEntity.valueType === 1) {
      return (
        <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} label="值">
          {form.getFieldDecorator('value', {
            initialValue: commonInfoEntity.value,
            rules: [{ required: true, message: '请填写properties类型对应的value' }],
          })(
            <MonacoEditor
              width="100%"
              height="200"
              language="properties"
              theme="vs-dark"
              options={options}
            />
          )}
        </FormItem>
      );
    } else if(commonInfoEntity.valueType === 2) {
      return (
        <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} label="值">
          {form.getFieldDecorator('value', {
            initialValue: commonInfoEntity.value,
            rules: [{ required: true, message: '请填写json类型对应的value' }],
          })(
            <MonacoEditor
              width="100%"
              height="200"
              language="json"
              theme="vs-dark"
              options={options}
            />
          )}
        </FormItem>
      );
    } else if(commonInfoEntity.valueType === 3) {
      return (
        <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} label="值">
          {form.getFieldDecorator('value', {
            initialValue: commonInfoEntity.value,
            rules: [{ required: true, message: '请填写字符类型对应的value' }],
          })(
            <Input placeholder="请输入value" />
          )}
        </FormItem>
      );
    }
    return (<span />);
  };

  // 导入
  const afterInput = () =>{
    if (commonInfoEntity === undefined) {
      return (<span/>);
    }

    let valueTypeStr = "字符类型";
    if (commonInfoEntity !== undefined) {
      if (commonInfoEntity.valueType === 0) {
        valueTypeStr = "yml类型";
      } else if (commonInfoEntity.valueType === 1) {
        valueTypeStr = "properties类型";
      } else if (commonInfoEntity.valueType === 2) {
        valueTypeStr = "json类型";
      }
    }
    return (
      <div>
        <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} label="Key描述">
          {form.getFieldDecorator('keyDesc', {
            initialValue: commonInfoEntity.keyDesc
          })(
            <TextArea
              placeholder="应用描述"
              autoSize={{ minRows: 3, maxRows: 6 }}
            />
          )}
        </FormItem>
        <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} label="类型">
          {form.getFieldDecorator('valueType', {
            initialValue: valueTypeStr,
          })(
            <Input placeholder="请输入环境变量" disabled />
          )}
        </FormItem>
        {commonValueCode()}
      </div>
    )
  };

  return (
    <Modal
      destroyOnClose
      title="新增配置项"
      visible={modalVisible}
      onOk={okHandle}
      width={800}
      maskClosable={false}
      onCancel={() => hideAddModal()}
    >
      <Tabs type="card" defaultActiveKey="1" onChange={setActive}>
        <TabPane tab="添加新key" key="1">
          <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} label="key">
            {form.getFieldDecorator('key', {
              rules: [{ required: true, message: '请输入key！' }],
            })(
              <Input placeholder="请输入key，比如：test，也支持test.flag.name" />
            )}
          </FormItem>
          <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} label="描述">
            {form.getFieldDecorator('keyDesc')(
              <TextArea
                placeholder="应用描述"
                autoSize={{ minRows: 3, maxRows: 6 }}
              />
            )}
          </FormItem>
          <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} label="类型">
            {form.getFieldDecorator('valueType', {
              rules: [{ required: true, message: '请输入类型！' }],
            })(
              <Select style={{ width: '100%' }} allowClear>
                <Option value="0">yaml类型</Option>
                <Option value="1">properties类型</Option>
                <Option value="2">json类型</Option>
                <Option value="3">字符类型</Option>
              </Select>
            )}
          </FormItem>
          {valueCode()}
        </TabPane>
        <TabPane tab="引用公共配置" key="2">
          <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} label="公共应用">
            {form.getFieldDecorator('appName', {
            })(
              <Select
                allowClear
                showSearch
                onSelect={setAppNameToGetConfigItemKeyList}
                style={{ width: '100%' }}
                placeholder="请选择配置组code"
                optionFilterProp="children"
              >
                {appOptions}
              </Select>
            )}
          </FormItem>
          <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} label="选择key">
            {form.getFieldDecorator('key', {
              rules: [{ required: true, message: '请选择key！' }],
            })(
              <Select
                allowClear
                showSearch
                onSelect={selectConfigItemKey}
                style={{ width: '100%' }}
                placeholder="请选择配置组code"
                optionFilterProp="children"
              >
                {configItemKeyOption}
              </Select>
            )}
          </FormItem>
          {afterInput()}
        </TabPane>
      </Tabs>
    </Modal>
  );
});

// const OperationsSlot = {
//   left: <Button className="tabs-extra-demo-button">Left Extra Action</Button>,
//   right: <Button>Right Extra Action</Button>,
// };

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

  const options = {
    folding: false,
    selectOnLineNumbers: true,
  };

  let activeStatusStr;
  if(item.activeStatus == 0) {
    activeStatusStr="非激活"
  } else {
    activeStatusStr="激活"
  }

  //console.log("item");
  //console.log(JSON.stringify(item));

  const valueCode = () => {
    if (item.valueType === 0) {
      return (
        <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} label="值">
          {form.getFieldDecorator('value', {
            initialValue: item.value,
            rules: [{ required: true, message: '请填写yml类型对应的value' }],
          })(
            <MonacoEditor
              width="100%"
              height="200"
              language="yaml"
              theme="vs-dark"
              options={options}
            />
          )}
        </FormItem>
      );
    } else if(item.valueType === 1) {
      return (
        <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} label="值">
          {form.getFieldDecorator('value', {
            initialValue: item.value,
            rules: [{ required: true, message: '请填写properties类型对应的value' }],
          })(
            <MonacoEditor
              width="100%"
              height="200"
              language="properties"
              theme="vs-dark"
              options={options}
            />
          )}
        </FormItem>
      );
    } else if(item.valueType === 2) {
      return (
        <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} label="值">
          {form.getFieldDecorator('value', {
            initialValue: item.value,
            rules: [{ required: true, message: '请填写json类型对应的value' }],
          })(
            <MonacoEditor
              width="100%"
              height="200"
              language="json"
              theme="vs-dark"
              options={options}
            />
          )}
        </FormItem>
      );
    } else if(item.valueType === 3) {
      return (
        <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} label="值">
          {form.getFieldDecorator('value', {
            initialValue: item.value,
            rules: [{ required: true, message: '请填写字符类型对应的value' }],
          })(
            <Input placeholder="请输入value" />
          )}
        </FormItem>
      );
    }
    return (<span />);
  };

  return (
    <Modal
      destroyOnClose
      title="编辑"
      visible={modalVisible}
      onOk={okHandle}
      width={600}
      maskClosable={false}
      onCancel={() => hideEditModal()}
    >
      <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} label="主键id">
        {form.getFieldDecorator('id', {
          initialValue: item.id,
        })(
          <Input placeholder="请输入主键id" disabled />
        )}
      </FormItem>
      <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} label="key">
        {form.getFieldDecorator('key', {
          initialValue: item.key,
        })(
          <Input placeholder="请输入key" disabled />
        )}
      </FormItem>
      <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} label="描述">
        {form.getFieldDecorator('keyDesc', {
          initialValue: item.keyDesc
        })(
          <TextArea
            placeholder="应用描述"
            autoSize={{ minRows: 3, maxRows: 6 }}
          />
        )}
      </FormItem>
      <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} label="状态">
        {form.getFieldDecorator('activeStatus', {
          initialValue: activeStatusStr,
          rules: [{ required: true, message: '请输入激活状态！' }],
        })(
          <Select style={{ width: '100%' }} allowClear>
            <Option value="0">非激活</Option>
            <Option value="1">激活</Option>
          </Select>
        )}
      </FormItem>
      {valueCode()}
    </Modal>
  );
});

const ValueView = Form.create()(prop => {
  const { modalVisible, form, handleAdd, hideValueCodeModal, valueType, currentValue } = prop;
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

  const [theme, setTheme] = useState("black");
  const [language, setLanguage] = useState("javascript");
  const [isEditorReady, setIsEditorReady] = useState(false);

  const valueCodeEditor = () => {
    if (valueType === 0) {
      return (
        <MonacoEditor
          width="100%"
          height="400"
          language="yaml"
          theme="vs"
          value={currentValue}
          options={options}
        />
      );
    } else if(valueType === 1) {
      return (
        <MonacoEditor
          width="100%"
          height="400"
          language="plain-text"
          theme="vs"
          value={currentValue}
          options={options}
        />
      );
    } else if(valueType === 2) {
      return (
        <MonacoEditor
          width="100%"
          height="400"
          language="json"
          theme="vs"
          value={currentValue}
          options={options}
        />
      );
    } else if(valueType === 3) {
      return (
        <MonacoEditor
          width="100%"
          height="400"
          language="plaintext"
          theme="vs"
          value={currentValue}
          options={options}
        />
      );
    }
    return (<span />);
  };

  const options = {
    folding: false,
    selectOnLineNumbers: true,
    readOnly: true
  };

  return (
    <Modal
      destroyOnClose
      title="配置值"
      visible={modalVisible}
      onOk={() => hideValueCodeModal()}
      width={800}
      onCancel={() => hideValueCodeModal()}
    >
      {valueCodeEditor()}
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
@connect(({ configItemModel, appManagerModel, authModel, profileManagerModel, loading}) => ({
  configItemModel,
  authModel,
  appManagerModel,
  profileManagerModel,
  loading: loading.models.configItemModel,
}))
// @Form.create() 是一个注解，就简化了xxx = Form.create(xxx);export xxx
@Form.create()
class ConfigItemList extends PureComponent {
  state = {
    addModalVisible: false,
    editModalVisible: false,
    valueViewVisible: false,
    valueType: 10,
    activeIndex: 1,
    item: {},
  };

  columns = [
    {
      name: 'key',
      title: 'key',
      dataIndex: 'key',
      width: '25%',
    },
    {
      name: 'value',
      title: 'value',
      dataIndex: 'value',
      width: '40%',
      render: (text, record)=>{
        if(text.length > 80){
          let showText = text.substring(0, 80);
          return (<span>{showText}...</span>)
        }
        return (<span>{text}</span>)
      }
    },
    {
      name: 'lookConfigItem',
      title: '配置值',
      dataIndex: 'lookConfigItem',
      width: '7%',
      render: (text, record) => (<a onClick={() => this.showValueCodeModal(record.valueType, record.value)}>配置值</a>)
    },
    {
      name: 'valueType',
      title: 'value类型',
      dataIndex: 'valueType',
      width: '8%',
      render: (text, record)=>{
        if(text === 0){
          return (<Tag color="#f50">yml</Tag>)
        } else if(text === 1) {
          return (<Tag color="#2db7f5">properties</Tag>)
        } else if(text === 2) {
          return (<Tag color="#87d068">json</Tag>)
        }
        return (<Tag color="#3b5999">string</Tag>)
      }
    },
    {
      name: 'activeStatus',
      title: '激活状态',
      dataIndex: 'activeStatus',
      width: '7%',
      render: (text, record)=>{
        if(text === 0){
          return (<IconFont type="icon-jinyong" style={{ fontSize: '24px', marginTop: "6px"}} />)
        }
        return (<IconFont type="icon-running" style={{ fontSize: '24px', marginTop: "6px"}} />)
      }
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

    const { location: {state}} = this.props;

    //console.log("接收到信息");
    //console.log(JSON.stringify(state));
    // 保存其他页面传递过来的信息
    this.saveInputInfo(state);

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
    const {
      configItemModel: { searchParam, pager },
    } = this.props;

    //console.log("searchParam");
    //console.log(JSON.stringify(searchParam));
    //console.log(JSON.stringify(searchParamInput));

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

    // console.log("pager param");
    // console.log(JSON.stringify(pagerFinal));
    // console.log(JSON.stringify(param));

    // 获取页面的总个数
    dispatch({
      type: 'configItemModel/getPage',
      payload: {
        pager: pagerFinal,
        searchParam: param,
      },
    });
  }

  // 保存其他页面传递过来的应用和命名空间
  saveInputInfo = (state) => {
    const {dispatch} = this.props;
    let appId, profile="default", appName;
    if (state !== undefined) {
      // 保存到本地存储中
      localStorage.setItem("appId", state.appId);
      localStorage.setItem("appName", state.appName);
      localStorage.setItem("profile", state.profile);
      appId = state.appId;
      appName = state.appName;
      profile = state.profile;
    } else {
      appId = localStorage.getItem("appId")
      appName = localStorage.getItem("appName")
      profile = localStorage.getItem("profile")
    }

    dispatch({
      type: 'configItemModel/saveProfileInfo',
      payload: {
        appId,
        appName,
        profile,
      },
    });

    // 获取对应应用下面的group列表
    dispatch({
      type: 'configItemModel/getGroupList',
      payload: {
        appId,
        profile,
      },
    });

    // 获取数据
    //this.getPageData(1, {appId, profile, group: "default"});
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
          <Badge status="success" text="创建者：" />
          <span>{record.createUser}</span>
        </Col>
        <Col span={6}>
          <Badge status="success" text="更新者：" />
          <span>{record.updateUser}</span>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={24}>
          <Badge status="success" text="描述：" />
          <span>{record.keyDesc}</span>
        </Col>
      </Row>
    </div>
  );

  showDeleteConfirm = row => {
    const { dispatch } = this.props;
    const {configItemModel: { profile, appId, currentGroup}} = this.props;
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
          type: 'configItemModel/delete',
          payload: {
            id:row.id,
            appId,
            profile,
            group: currentGroup
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

    // 获取公共应用的列表
    const { dispatch } = this.props;
    const {configItemModel: { profile }} = this.props;
    dispatch({
      type: 'appManagerModel/getAppListOfCommon',
      payload: profile
    });
  };

  // 获取
  selectCommonKey = (commonAppName) => {
    const { dispatch } = this.props;
    const {configItemModel: {profile}} = this.props;
    dispatch({
      type: 'appManagerModel/getKeyListOfCommonFromProfileApp',
      payload: {
        appName: commonAppName,
        profile
      }
    });
  };

  hideAddModal = () => {
    this.setState({
      addModalVisible: false,
    });

    const {dispatch} = this.props;
    dispatch({
      type: 'configItemModel/clearCommonConfig'
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
      type: 'configItemModel/setCurrentValue',
      payload: value,
    });
  };

  hideValueCodeModal = () => {
    this.setState({
      valueCode: "",
      valueViewVisible: false,
    });
  };

  // 获取命名空间列表
  getProfileList=() =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'profileManagerModel/getProfileList'
    });
  };

  // 设置表格加载
  setTableLoading = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'configItemModel/setTableLoading',
    });
  };

  // 添加
  handleAdd = fields => {
    const { dispatch } = this.props;
    const {configItemModel: { profile, appId, currentGroup}} = this.props;
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
      commonFlag: 0,
      appId,
      profile,
      group: currentGroup
    };

    dispatch({
      type: 'configItemModel/add',
      payload: params,
    });

    this.hideAddModal();
  };

  // 修改当前的value的值
  changValue = value =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'configItemModel/setCurrentValue',
      payload: value,
    });
  };

  editorDidMountLookConfigItem(editor, monaco) {
    //console.log('editorDidMount', editor);
    editor.focus();
  }
  onChangeLookConfigItem(newValue, e) {
    //console.log('onChange', newValue, e);
  }

  // 数据查看
  lookConfigItem = value => {
    //console.log("view value");
    const options = {
      selectOnLineNumbers: true
    };
    return (
      <Modal
        title="Basic Modal"
        visible={true}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <MonacoEditor
          width="800"
          height="600"
          language="javascript"
          theme="vs-dark"
          value="xxx"
          options={options}
          onChange={this.onChangeLookConfigItem}
          editorDidMount={this.editorDidMountLookConfigItem}
        />
      </Modal>
    );
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
    const {configItemModel: { profile, appId, currentGroup}} = this.props;
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
        appId,
        profile,
        group: currentGroup
      };

      if(fields.activeStatus === '非激活'){
        params.activeStatus = 0;
      } else if (fields.activeStatus === '激活') {
        params.activeStatus = 1;
      }

      //console.log(JSON.stringify(params));
      dispatch({
        type: 'configItemModel/update',
        payload: params,
      });
    }

    this.hideEditModal();
  };

  handleSearch = e => {
    e.preventDefault();

    const { form } = this.props;
    const {configItemModel: { profile, appId, currentGroup}} = this.props;

    //console.log('启动查询');
    this.setTableLoading();

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      for(let key in fieldsValue) {
        if(fieldsValue[key] === '') {
          delete fieldsValue[key]
        }
      };

      fieldsValue={
        ...fieldsValue,
        appId,
        profile,
        group: currentGroup
      };
      this.getPageData(1, fieldsValue);
    });
  };

  setActive = (key, event) => {
    //console.log("setActive ");
    //console.log(key);
    this.setState({
      activeIndex: key,
    });

    if(key === "1") {
      //console.log("clear");
      const { dispatch } = this.props;
      dispatch({
        type: 'configItemModel/clearCommonConfig'
      })
    }
  };

  handleSearchDynamicKey = e => {
    e.preventDefault();

    const { form } = this.props;
    const { dispatch } = this.props;
    const {configItemModel: { profile, appId, currentGroup}} = this.props;

    //console.log('启动查询');

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      for(let key in fieldsValue) {
        if(fieldsValue[key] === '') {
          delete fieldsValue[key]
        }
      };

      fieldsValue={
        ...fieldsValue,
        appId,
        profile,
        group: currentGroup
      };

      // 获取页面的总个数
      dispatch({
        type: 'configItemModel/getDynamicKeyList',
        payload: {
          ...fieldsValue
        },
      });
    });
  };

  // 设置应用名用于获取配置列表
  setAppNameToGetConfigItemKeyList = (appName) => {
    const { dispatch } = this.props;
    const {configItemModel: { profile}} = this.props;

    dispatch({
      type: 'configItemModel/getKeyListOfCommonFromProfileApp',
      payload: {
        profile,
        appName
      }
    });
  };

  // 获取配置项
  setKeyToGetCommonConfigInfo = (req) => {
    const {dispatch} = this.props;
    const {configItemModel: {profile}} = this.props;

    dispatch({
      type: 'configItemModel/getConfigItemEntityFromAppKey',
      payload: {
        profile,
        ...req
      }
    });
  };

  // 添加导入
  addConfigItemFromCommon = (req) => {
    const {dispatch} = this.props;
    const {configItemModel: {profile, appId, currentGroup}} = this.props;

    this.setTableLoading();

    //console.log("req");
    //console.log(req);

    let valueType = 3;
    if (req.valueType === "yml类型") {
      valueType = 0
    } else if (req.valueType === "properties类型") {
      valueType = 1
    } else if (req.valueType === "json类型") {
      valueType = 2
    } else if (req.valueType === "字符类型") {
      valueType = 3
    }

    const params = {
      ...req,
      valueType
    };

    dispatch({
      type: 'configItemModel/addConfigItemFromCommon',
      payload: {
        profile,
        appId,
        group: currentGroup,
        ...params
      }
    });

    this.hideAddModal();
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
            <FormItem label="key">
              {getFieldDecorator('keySearch')(
                <Input placeholder="固定key及前缀搜索" />
              )}
            </FormItem>
          </Col>
          <Col lg={6}>
            <FormItem label="value">
              {getFieldDecorator('value')(
                <Input placeholder="" />
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

  // 获取动态key拼接的数据展示
  getDynamicKeyValue =()=>{
    const { form } = this.props;
    const { dispatch } = this.props;
    const {configItemModel: { profile, appId, overViewKey, currentGroup}} = this.props;

    //console.log('启动查询');

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      for(let key in fieldsValue) {
        if(fieldsValue[key] === '') {
          delete fieldsValue[key]
        }
      };

      fieldsValue={
        ...fieldsValue,
        appId,
        profile,
        group: currentGroup
      };

      // 获取页面的总个数
      dispatch({
        type: 'configItemModel/getOverViewFromDynamicKey',
        payload: {
          ...fieldsValue
        },
      });
    });

    this.showValueCodeModal(0, overViewKey);
  };

  // 动态key的搜索
  renderSearchDynamicKeyForm = () => {
    const {
      form: { getFieldDecorator },
    } = this.props;


    return (
      <Form onSubmit={this.handleSearchDynamicKey} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col lg={12}>
            <FormItem label="key">
              {getFieldDecorator('key')(
                <Input placeholder="支持动态key：key为test，value为log.flag=12，也可test.log搜索" />
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
            <Button icon="eye" type="primary" onClick={()=>this.getDynamicKeyValue()}>
              key总览
            </Button>
          </Col>
        </Row>
      </Form>
    );
  };

  showValue=(value)=>{

  };

  onRatioChange = e => {
    //console.log('radio4 checked', e.target.value);
    this.setState({
      value4: e.target.value,
    });
    const { dispatch } = this.props;
    const {configItemModel: { appId }} = this.props;
    dispatch({
      type: 'configItemModel/setProfile',
      payload: {
        profile: e.target.value,
        appId
      }
    });
  };

  onChange = page => {
    //console.log('页面索引修改');

    this.getPageData(page);
  };

  render() {
    const {
      configItemModel: {
        selectState, groupAllCodeList, profile, appName, currentValue, commonInfoEntity,configItemKeyList,
        totalNumber, pager, tableList, tableLoading, configItemKeyDynamicList, currentGroup, groupList
      },
      profileManagerModel: { profileList },
      appManagerModel: { commonAppNameList },
    } = this.props;

    //console.log("profile ===== " + profile);

    // 替换表Table的组件
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const { addModalVisible, editModalVisible, valueViewVisible, valueCode, valueType, activeIndex, item } = this.state;
    const parentAddMethods = {
      selectState,
      groupAllCodeList,
      currentValue,
      commonAppNameList,
      configItemKeyList,
      commonInfoEntity,
      activeIndex,

      setAppNameToGetConfigItemKeyList: this.setAppNameToGetConfigItemKeyList,
      setKeyToGetCommonConfigInfo: this.setKeyToGetCommonConfigInfo,
      addConfigItemFromCommon: this.addConfigItemFromCommon,
      changValue: this.changValue,
      setActive: this.setActive,
      handleAdd: this.handleAdd,
      hideAddModal: this.hideAddModal,
    };
    const parentEditMethods = {
      item,
      handleEdit: this.handleEdit,
      hideEditModal: this.hideEditModal,
    };
    const valueViewConfig = {
      valueType,
      currentValue,
      hideValueCodeModal: this.hideValueCodeModal,
      onChangeLookConfigItem: this.onChangeLookConfigItem,
      editorDidMountLookConfigItem: this.editorDidMountLookConfigItem,
    };

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

    const configItemList = () => (
      <Card bordered={false}>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{this.renderSearchDynamicKeyForm()}</div>
          <List
            grid={{gutter: 16, column: 4}}
            dataSource={configItemKeyDynamicList}
            renderItem={item => {
              let valueStr = item.value;
              if (item.value.length > 30) {
                valueStr = item.value.substring(0, 30);
              }

              return (
                <List.Item>
                  <Card title={item.key}>
                    <Row>
                      <Col span={8}><Button onClick={()=>this.showValueCodeModal(item.valueType, item.value)}>value</Button></Col>
                      <Col span={12}>{valueStr}</Col>
                    </Row>
                  </Card>
                </List.Item>
              );
            }}
          />
        </div>
      </Card>
    );

    const onTabClick = activeKey => {
      const {dispatch} = this.props;

      dispatch({
        type: 'configItemModel/setCurrentGroup',
        payload: activeKey
      });
      const appId = localStorage.getItem("appId")
      const profile = localStorage.getItem("profile")
      this.getPageData(1, {appId, profile, group: activeKey});
    };

    // console.log("分组列表");
    // console.log(JSON.stringify(groupList));

    let groupKeySelect=[];
    let groupKeyDynamicSelect=[];
    if(groupList !== undefined) {
      if(groupList.length === 0) {
        groupList.push("default");
      }

      groupKeySelect = groupList.map(group => (
        <TabPane tab={"分组：" + group} key={group} closable={true}>
          {tableInfo()}
        </TabPane>
      ));

      groupKeyDynamicSelect = groupList.map(group => (
        <TabPane tab={"分组：" + group} key={group}>
          {configItemList()}
        </TabPane>
      ));
    }

    // console.log("currentGroup");
    // console.log(currentGroup);
    // console.log(groupKeySelect);

    return (
      <PageHeaderWrapper>
        <Row>
          <Col span={4}>
            <Badge status="success" text="环境：" />
            <span className={styles.headClass}>{profile}</span>
          </Col>
          <Col span={10}>
            <Badge status="success" text="应用：" />
            <span className={styles.headClass}>{appName}</span>
          </Col>
        </Row>
        <br/>
        <Tabs type="card" defaultActiveKey="1">
          <TabPane tab="key前缀匹配" key="1">
            <Card bordered={false}>
              <Tabs tabPosition="left" type="card" defaultActiveKey={currentGroup} onChange={onTabClick}>
                {groupKeySelect}
              </Tabs>
            </Card>
          </TabPane>
          <TabPane tab="key动态匹配" key="2">
            <Card bordered={false}>
              <Tabs tabPosition="left" type="card" defaultActiveKey={currentGroup}>
                {groupKeyDynamicSelect}
              </Tabs>
            </Card>
          </TabPane>
        </Tabs>
        <CreateForm {...parentAddMethods} modalVisible={addModalVisible} />
        <EditForm {...parentEditMethods} modalVisible={editModalVisible} />
        <ValueView {...valueViewConfig} modalVisible={valueViewVisible} />
      </PageHeaderWrapper>
    );
  }
}

export default ConfigItemList;
