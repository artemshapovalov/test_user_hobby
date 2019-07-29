import * as React from 'react';
import classnames from 'classnames';

import './Button.scss';

interface OwnProps {
  action: () => void;
  children?: Node | string;
  close?: boolean;
}

type Props = OwnProps;

class Button extends React.Component<Props> {
  render() {
    const { action, children, close } = this.props;

    return (
      <button onClick={action} className={classnames('Button', { ['Button--close']: close })}>
        {children}
      </button>
    );
  }
}

export default Button;
