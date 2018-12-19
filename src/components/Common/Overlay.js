import React from 'react';
import { css } from 'glamor';

const flip = css.keyframes('flip', {
  // optional name
  '0%': { transform: 'rotateX(80deg)', opacity: 0 },
  '100%': { transform: 'rotateX(0)', opacity: 1 },
});

const overlay = css({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 2,
  backgroundColor: 'white',
  animation: `${flip} 0.3s`,
});

class Overlay extends React.PureComponent {
  overlay = React.createRef();

  componentDidMount() {
    window.addEventListener('click', this.handleClickOutside, {
      capture: true,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside = (e) => {
    if (this.overlay.current && !this.overlay.current.contains(e.target)) {
      const { handleClose } = this.props;
      handleClose();
    }
  };

  render() {
    const {
      children, handleClose, style, ...props
    } = this.props;
    return (
      <div ref={this.overlay} {...css(overlay, css(style))} {...props}>
        {children}
      </div>
    );
  }
}

export default Overlay;
