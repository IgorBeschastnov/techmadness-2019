import React, { Component} from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Auth from './auth'
import Page1 from './page1'
import Page2 from './page2'
import Page3 from './page3'
import Page4 from './page4'

interface Props {
  isLogin: boolean;
}

class App extends Component<Props> {
  render() {
    const { isLogin } = this.props;
    return (
      <div>
        <main>
          <Switch>
            <Route exact path="/" component={Auth} />
            {isLogin ? (
              <Route path="/page1" component={Page1} />
            ) : (
              <Redirect to="/" />
            )}
            {isLogin ? (
              <Route path="/page2" component={Page2} />
            ) : (
              <Redirect to="/" />
            )}
            {isLogin ? (
              <Route path="/page3" component={Page3} />
            ) : (
              <Redirect to="/" />
            )}
            {isLogin ? (
              <Route path="/page4" component={Page4} />
            ) : (
              <Redirect to="/" />
            )}
          </Switch>
        </main>
      </div>
    )
  }
}

const mapStateToProps = ({ store }: any) => ({
  isLogin: store.isLogin
})

export default connect(mapStateToProps)(App)
