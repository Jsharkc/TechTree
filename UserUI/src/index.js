import dva                from 'dva';
import { browserHistory } from 'dva/router';
import createLoading      from 'dva-loading';
import './index.css';

// 1. Initialize
const app = dva({
  ...createLoading(),
  history: browserHistory,
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/app'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
