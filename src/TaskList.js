import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List } from 'antd'

class TaskList extends Component {
  componentDidMount() {
    
  }

  render() {
    const { taskCollection } = this.props;
    return (
        <List 
            itemLayout='vertical'
            dataSource={taskCollection}
            renderItem={item => item}
        />
    )
  }
}

TaskList.propTypes = {
    taskCollection: PropTypes.array
}

export default TaskList
