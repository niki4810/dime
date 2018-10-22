import React from 'react';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';
import partial from 'ramda/src/partial';
import InputField from '../../core/InputField';
import SelectField from '../../core/SelectField';
import Button, {PrimaryButton} from '../../core/Button';
import {CATEGORIES} from '../../../constants';
const baseStyles = (theme) => ({
  container: {
    padding: '10px 8px'
  },
  label: {
    fontSize: '14px',
    paddingBottom: '8px',
    color: theme.colors.black
  },
  field: {
    paddingBottom: '8px',
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '20px',
    '& button': {
      width: '50%',
      marginRight: '5px',
      '&:last-child': {
        marginRight: '0'
      }
    }
  }
});

export const BUTTONS = {
  EDIT: 'EDIT',
  DELETE: 'DELETE'
};

const FIELDS = {
  "DATE": "date",
  "AMOUNT": "amount",
  "CATEGORY": "category",
  "NOTES": "notes"
};



class BaseDetail extends React.Component {
  constructor(props) {
    super(props);
    const amount = typeof props.amount === "string" ? parseFloat(props.amount).toFixed(2) : props.amount;
    this.state = {
      date: props.date,
      amount: amount || 0,
      category: props.category || CATEGORIES[0].value,
      notes: props.notes || ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  
  handleInputChange(type, value) {
    this.setState((prevState) => {
      return {
        ...prevState,
        [type]: value
      };
    });
  }

  render() {
    const {
      pageStatus ={},
      classes = {},
      sections = {},
      callbacks = {}
    } = this.props;
    const {
      displayDelete = false,
      displaySave = true
    } = sections;
    const {
      onSaveClick = () => {},
      onDeleteClick = () => {}
    } = callbacks;
    const editButtonStatus = pageStatus[BUTTONS.EDIT] || {disabled: false, displaySpinner: false};
    const deleteButtonStatus = pageStatus[BUTTONS.DELETE] || {disabled: false, displaySpinner: false};
    return (
      <React.Fragment>
        <div className={classes.container}>        
          <div className={classes.field}>
            <div className={classes.label}>  
              <FormattedMessage id='detailPage.date' />
            </div>
            <InputField
              icons={{main: 'fa-calendar'}}
              fieldProps={{
                pattern:"[0-9]{4}-[0-9]{2}-[0-9]{2}",
                value: this.state.date
              }}
              type="date"
              onChange={partial(this.handleInputChange, [FIELDS.DATE])} 
            />
          </div>
          <div className={classes.field}>
            <div className={classes.label}>  
              <FormattedMessage id='detailPage.amount' />
            </div>
            <InputField 
              onChange={partial(this.handleInputChange, [FIELDS.AMOUNT])}
              fieldProps={{
                pattern: "\\d*",
                value: this.state.amount
              }}
              type="number"
            />
          </div>
          <div className={classes.field}>
            <div className={classes.label}>  
              <FormattedMessage id='detailPage.notes' />
            </div>
            <InputField
              icons={{main: 'fa-sticky-note'}}
              type="text"
              fieldProps={{
                value: this.state.notes
              }}
              onChange={partial(this.handleInputChange, [FIELDS.NOTES])}
            />
          </div>
          <div className={classes.field}>
            <div className={classes.label}>
              <FormattedMessage id='detailPage.category' />
            </div>
            <SelectField
              fieldProps={{defaultValue: this.state.category}}
              options={CATEGORIES}
              onChange={partial(this.handleInputChange, [FIELDS.CATEGORY])}
            />
          </div>
          <div className={classNames(classes.btnContainer)}>
            {displayDelete && <Button 
            disabled={deleteButtonStatus.disabled}
            onClick={() =>{
              onDeleteClick(this.state);
            }}>
              {deleteButtonStatus.displaySpinner && <span className='fa fa-spinner fa-spin' />}
              {!deleteButtonStatus.displaySpinner && <FormattedMessage id='detailPage.delete' />}
              
            </Button>}
            {displaySave && <PrimaryButton
             disabled={editButtonStatus.disabled || this.state.amount <= 0}
             onClick={() => {
              onSaveClick(this.state);
            }}>
              {editButtonStatus.displaySpinner && <span className='fa fa-spinner fa-spin' />}
              {!editButtonStatus.displaySpinner && <FormattedMessage id='detailPage.save' />}
            </PrimaryButton>}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default injectSheet(baseStyles)(BaseDetail);