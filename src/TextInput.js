import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Form, Tooltip } from 'antd'
import styled from 'styled-components'
// import { formItemLayout } from '../configs/config'

const FormItem = Form.Item

const StyledFormItem = styled(FormItem)`
  margin-bottom: 8px !important;
`

class TextInput extends Component {
  componentDidMount() {
    const input = document.getElementsByClassName(this.props.inputClassName)[0];
    if (input && input.addEventListener) {
      input.addEventListener('keydown', this.keyHandler, false);
    } else if (input && input.attachEvent) {
      input.attachEvent('onkeydown', this.keyHandler); /* damn IE hack */
    }
  }

  keyHandler = e => {
    const TABKEY = 9;
    if (e.keyCode === TABKEY && this.props.onTab) {
      this.props.onTab(e)
      if (e.preventDefault) {
        e.preventDefault();
      }
      return false;
    }
  }

  handleEnter = e => {
    if (typeof this.props.onEnter === 'function') {
      this.props.onEnter(e);
    }
  }

  handleOnChange = e => {
    // e.preventDefault();
    const TAB_KEY = 9;
    if (e.key === TAB_KEY && this.props.onTab) this.props.onTab(e);
    else this.props.onChange(e);
  }

  render() {
    const { 
      formClassName, 
      tooltipClassName, 
      inputClassName, 
      inputId,
      status, 
      message, 
      placeholder,
      value,
      inputRef,
      children
    } = this.props;

    return (
      <StyledFormItem
        // {...formItemLayout}
        className={formClassName}
        validateStatus={status || ''}
        // help={message || ''}
      >
        { children }
        <Tooltip
          title={message || ''}
          placement='bottomLeft'
          overlayClassName={tooltipClassName}
          visible={status === 'error'}
        >
          <Input 
            autoComplete='off'
            className={inputClassName || ''}
            id={inputId || ''}
            placeholder={placeholder}
            value={value}
            ref={inputRef}
            onChange={this.handleOnChange}
            onPressEnter={this.handleEnter}
            // {...this.props}
          />
        </Tooltip>
      </StyledFormItem>
    )
  }
}

TextInput.propTypes = {
  formClassName: PropTypes.string,
  tooltipClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  inputId: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  inputRef: PropTypes.func,
  onChange: PropTypes.func,
  onTab: PropTypes.func,
  status: PropTypes.string,
  message: PropTypes.string,
  onEnter: PropTypes.func,
  children: PropTypes.object || PropTypes.element
}

export default TextInput
