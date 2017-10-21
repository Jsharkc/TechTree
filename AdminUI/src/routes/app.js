import React       from 'react'
import PropTypes   from 'prop-types'
import { connect } from 'dva'
import { Layout }  from '../components'
import classnames  from 'classnames'
import config      from '../utils/config'
import menu        from '../utils/menu'
import '../themes/default.less'

const { Header, Bread, Footer, Sider, Styles } = Layout;

const App = ({ children, location, dispatch, app }) => {
  const {
    user,
    siderFold,
    darkTheme,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    modalVisible
  } = app;

  const headerProps = {
    menu,
    user,
    darkTheme,
    siderFold,
    location,
    isNavbar,
    visible: modalVisible,
    menuPopoverVisible,
    navOpenKeys,
    showModal () {
      dispatch({ type: 'app/showAdminModal' })
    },
    adminOK (data) {
      dispatch({
        type: 'app/updateAminAccount',
        payload: data
      })
    },
    onCancel () {
      dispatch({ type: 'app/hideAdminModal' })
    },
    switchMenuPopover () {
      dispatch({ type: 'app/switchMenuPopver' })
    },
    logout () {
      dispatch({ type: 'app/logout' })
    },
    switchSider () {
      dispatch({ type: 'app/switchSider' })
    },
    changeOpenKeys (openKeys) {
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
  };

  const siderProps = {
    menu,
    siderFold,
    darkTheme,
    location,
    navOpenKeys,
    changeTheme () {
      dispatch({ type: 'app/changeTheme' })
    },
    changeOpenKeys (openKeys) {
      localStorage.setItem('NavOpenKeys', JSON.stringify(openKeys))
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
  };

  const breadProps = {
    menu
  };

  if (config.openPages && config.openPages.indexOf(location.pathname) > -1) {
    return <div className={Styles.loginPage}>{children}</div>
  }

  return (
    <div>
      <div
        className={
          classnames(
            Styles.layout,
            { [Styles.fold]: isNavbar ? false : siderFold },
            { [Styles.withnavbar]: isNavbar }
          )
        }>
        {
          !isNavbar
            ? <aside className={classnames(Styles.sider, { [Styles.light]: !darkTheme })}>
                <Sider {...siderProps} />
              </aside>
            : ''
        }
        <div className={Styles.main}>
          <Header {...headerProps} />
          <Bread {...breadProps} location={location} />
          <div className={Styles.container}>
            <div className={Styles.content}>
              {children}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
};

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
};

export default connect(({ app, loading }) => ({ app, loading }))(App)
