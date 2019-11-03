import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login } from '../core/store';

interface Props {
  login: () => void;
}

class Auth extends Component<Props> {
  render() {
    const { login } = this.props
    return (
      <div>
        <h2>Please log in</h2>
        <Link to="/page1">
          <button className="btn btn-light" onClick={() => login()}>
            Log in
          </button>
        </Link>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
  login
}, dispatch)


export default connect(
  null,
  mapDispatchToProps
)(Auth)
