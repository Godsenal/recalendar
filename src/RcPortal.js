import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { css } from 'glamor';

const portalStyle = css({
  position: 'fixed',
});
const RC_ROOT = 'rc-root';

class RcPortal extends PureComponent {
  rcRoot = null;

  static propTypes = {
    target: PropTypes.oneOfType([PropTypes.any]),
  };

  static defaultProps = {
    target: null,
  };

  componentDidMount() {
    const rcRoot = document.createElement('div');
    rcRoot.id = RC_ROOT;
    this.rcRoot = rcRoot;
    document.body.appendChild(rcRoot);
  }

  componentWillUnmount() {
    document.getElementById(RC_ROOT).remove();
  }

  computePosition = ({ top, left, height }) => ({
    top: top + height,
    left,
  });

  render() {
    const { children, target } = this.props;
    if (!this.rcRoot || !target) {
      return null;
    }
    const { top, left } = this.computePosition(target.getBoundingClientRect());
    return createPortal(
      <div
        ref={this.rc_child}
        {...css(portalStyle, {
          top,
          left,
        })}
      >
        {children}
      </div>,
      this.rcRoot,
    );
  }
}

export default RcPortal;
