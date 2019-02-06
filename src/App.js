import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import styled from 'styled-components'
import { Form, Button, List } from 'antd'
import TextInput from './TextInput'

const Container = styled.div`
  min-height: 52px;
  padding: 6px;
  border: 1px solid #ddd;
`

const StyledForm = styled(Form)`
  width: 85%;
`

const StyledFlexContainer = styled.div`
  height: 52px !important;
  line-height: 38px;
  display: flex;
`

const StyledTasknameContainer = styled.div`
  height: 52px;
  flex-grow: 1;
  flex-shrink: 1;
`

const StyledButtonContainer = styled.div`
  width: auto;
  flex-grow: 0;
  flex-shrink: 0;
`

const StyledContainer = styled.div`
  padding: 2px;
  border: 1px solid #ddd;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  background: #fff;
  &:hover {
    background-color: #ddd;
  }
  ${props => props.isfocus === 'true' ? 'background-color: #bbb' : ''}
`

const StyledTaskName = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  /* ${props => props.isdone === 'true' && `
    color: #bbb;
  `} */
`

const StyledList = styled(List)`
  margin: 4px 0 !important;
`

class App extends Component {
  state = {
    name: '',
    taskCollection: []
  }

  handleNameChange = e => {
    this.setState({ name: e.target.value })
  }

  handleSubmit = e => {
    e.stopPropagation();
    if (this.state.name.trim()) {
      this.setState(prevState => { 
        return {
          taskCollection: [this.state.name, ...prevState.taskCollection],
          name: ''
        }
      })
    }
  }

  handleHideAddingTask = e => {
    e.stopPropagation();
    this.setState({
      name: ''
    })
  }

  render() {
    return (
      <div className="App" style={{ margin: '4px' }}>
        <Container>
          <StyledFlexContainer>
            <StyledTasknameContainer>
              <StyledForm>
                <TextInput 
                  className='task-name-input'
                  formClassName='task-name-form'
                  status={''}
                  message={''}
                  tooltipClassName='error-tooltip new-task-name-tooltip'
                  inputId='new-task-name'
                  placeholder='Task name'
                  value={this.state.name}
                  inputRef={input => { this.nameInput = input }}
                  onChange={this.handleNameChange}
                  onEnter={this.handleSubmit}
                />
              </StyledForm>
            </StyledTasknameContainer>
            <StyledButtonContainer>   
              <Button 
                type='default' 
                id='cancel-task-btn' 
                shape='circle' 
                icon='close' 
                size='small'
                onClick={this.handleHideAddingTask}
              />
              <Button 
                type='default'
                id='submit-task-btn' 
                shape='circle' 
                icon='check' 
                size='small'
                onClick={this.handleSubmit}
              />
            </StyledButtonContainer>
          </StyledFlexContainer>
        </Container>
        {this.state.taskCollection.length > 0 &&
          <StyledList 
            itemLayout='vertical'
            dataSource={this.state.taskCollection}
            renderItem={item => (
              <StyledContainer className='task-item'>
                <StyledTaskName className='task-name'>{item}</StyledTaskName>
              </StyledContainer>
            )}
            locale={{ emptyText: '' }}
          />
        }
      </div>
    );
  }
}

export default App;
