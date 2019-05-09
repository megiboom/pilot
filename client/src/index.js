import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root')); //ReactDOM은 render한다 무엇을? App를, 어디에? id가 root인 곳에
//ReactDOM은 react를 웹사이트에 render하는것을 도와주는 모델 Document Object Model
//Mobile은 reactNative
serviceWorker.unregister();
