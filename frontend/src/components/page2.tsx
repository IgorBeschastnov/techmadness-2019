import React, { Component } from 'react'
import { login } from '../core/store'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from './header'

interface Props {
  isLogin: boolean;
  login: () => void;
}

class Page2 extends Component<Props> {
  render() {
    return (
      <div>
        <Header />
        <h2>Page 2</h2>
      </div>
    )
  }
}

const mapStateToProps = ({ store }: any) => ({
  isLogin: store.isLogin
})

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      login
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page2)
