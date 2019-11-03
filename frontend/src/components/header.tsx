import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../core/store'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

interface Props {
  isLogin: boolean;
  logout: () => void;
}

class Header extends Component<Props> {
  render() {
    const { isLogin, logout } = this.props;
    return (
      <div>
        <header>
          <Link to="/page1">Page 1 </Link>
          <Link to="/page2">Page 2 </Link>
          <Link to="/page3">Page 3 </Link>
          <Link to="/page4">Page 4 </Link>
          <Link to="/">
            <button className="btn btn-kight" onClick={() => logout()}>
              Log out
            </button>
          </Link>
        </header>
      </div>
    )
  }
}

const mapStateToProps = ({ store }: any) => ({
  isLogin: store.isLogin
})

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    logout
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
