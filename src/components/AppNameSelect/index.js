import React, { PureComponent } from 'react';
import {Select} from 'antd';
import {connect} from "dva/index";


@connect(({ businessAppModel }) => ({
  businessAppModel,
}))
class AppNameSelect extends PureComponent{
  state = {
    value: undefined
  };

  searchAppName = value => {
    if (value === '') {
      return;
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'businessAppModel/getBusinessNameList',
      payload: value,
    });

    this.setState({value});
    this.props.onChange(value)
  };

  render() {
    const { businessAppModel: {businessNameList}, form } = this.props;

    let options;
    if (businessNameList)
      options = businessNameList.map(d => <Select.Option key={d.name}>{d.name}</Select.Option>);
    return (
          <Select
            showSearch
            style={{width: '100%'}}
            value={this.state.value}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={this.searchAppName}
            onChange={this.searchAppName}
            notFoundContent={null}
            placeholder="请选择应用名(发布平台)">
            {options}
          </Select>
        )}
}
export default AppNameSelect;
