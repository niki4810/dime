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
  select: {
    flex: '11',
    marginRight: '10px',
    border: '0',
    outline: theme.colors.white,
    background: theme.colors.white,
    paddingLeft: '5px',
    '-webkit-appearance': 'none',
    height: '40px'
  },
  icon: {
    flex: '1'
  }
});

export const BaseSelectField = (props) => {
  const {
    classes = {}, 
    icons = {}, 
    onChange = () => {},
    options = [],
    fieldProps = {}
  } = props;
  const {main = 'fa-tags'} = icons;
  const inputRef = React.createRef();
  return (
    <div className={classes.container}>
      <select 
        ref={inputRef}
        onChange={(ev) => {
          onChange(ev.target.value);
        }}
        className={classes.select}
        {...fieldProps}
      >
        {options.map((option, index) => {
          return (<option value={option.value} key={index}>{option.label}</option>); 
        }) }
      </select>  
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

export default injectSheet(baseStyles)(BaseSelectField);