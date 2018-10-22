import React from 'react'
import injectSheet from 'react-jss'
import classNames from 'classnames';

const baseStyles = theme => ({
  container: {
    padding: '5px 0 5px 5px',
    background: theme.colors.white,
    display: 'flex',
    alignItems: 'center',
    border: `1px solid ${theme.colors.grey}`
  },
  input: {
    flex: '11',
    marginRight: '10px',
    border: '0',
    outline: theme.colors.white,
    '-webkit-appearance': 'none',
    height: '40px'
  },
  icon: {
    flex: '1'
  }
});

export const BasePriceField = (props) => {
  const {
    classes = {}, 
    icons = {}, 
    onChange = () => {},
    type = "number",
    fieldProps = {}
  } = props;
  const {main = 'fa-dollar-sign'} = icons;
  const inputRef = React.createRef();
  return (
    <div className={classes.container}>
      <input 
        ref={inputRef}
        onChange={(ev) => {
          onChange(ev.target.value);
        }}
        className={classes.input}
        type={type} 
        {...fieldProps}
      />
      <span 
        onClick={() => {
          if (inputRef && inputRef.current) {
            inputRef.current.focus();
          }
        }}
        className={classNames('fa', main, classes.icon)} />
    </div>
  );
};

export default injectSheet(baseStyles)(BasePriceField);