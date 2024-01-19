import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import Tree from './Tree';

const reactComponent = React.createElement(Tree);
ReactDOMServer.renderToString(reactComponent);