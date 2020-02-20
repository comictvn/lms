import React from 'react';
import { Field, reduxForm, getFormValues, FieldArray } from 'redux-form';
import { Grid, Container, Box, Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { GuardTextField, GuardCheckboxField, GuardTextAreaField } from 'components/GuardComponents/Form';
import { flowRight } from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const validate = (values: any) => {
  const errors: any = {};
  return errors;
};

const renderQuestionFields = ({ fields }: any) => (
  <div>
    <Button color="secondary" variant="contained" onClick={() => fields.push({})}>Add Question</Button>
    <div>
      {fields.map((question: any, index: any) =>
        <div>
          <Field
            name={`${question}.id`}
            type="hidden"
            component={GuardTextField}
          />
          <Field
            name={`${question}.name`}
            type="text"
            component={GuardTextField}
            label="Name"/>
          <Field
            name={`${question}.description`}
            type="text"
            rows={5}
            component={GuardTextAreaField}
            label="Description"/>
          <Button
            type="button"
            onClick={() => fields.remove(index)}>Delete</Button>
          <FieldArray name={`${question}.answers`} component={renderAnswerFields}/>
        </div>
      )}
    </div>
  </div>
)

const renderAnswerFields = ({ fields }: any) => (
  <div>
    <List>
      {fields.map((answer: any, index: any) =>
        <div>
          <div style={{ display: 'none' }}>
            <Field
              name={`${answer}.id`}
              type="hidden"
              component={GuardTextField}
            />
          </div>
          <ListItem key={index} role={undefined} dense button >
            <ListItemIcon style={{ width: "400px", marginRight: '30px' }}>
              <Field
                name={`${answer}.description`}
                type="text"
                component={GuardTextField}
                label="Description"/>
            </ListItemIcon>
            <ListItemIcon>
              <Field
                name={`${answer}.is_correct`}
                component={GuardCheckboxField}
                label="Correct Answer"/>
            </ListItemIcon>
            <ListItemText primary={`Correct Answer`} />
            <ListItemIcon>
              <Button
                type="button"
                onClick={() => fields.remove(index)}>Delete</Button>
            </ListItemIcon>
          </ListItem>
        </div>
      )}
    </List>
    <Button color="secondary" variant="contained" onClick={() => fields.push({})}>+ Option</Button>
  </div>
)

const Index = (props: any) => {
  const { handleSubmit, saving } = props;
  return (
    <form onSubmit={handleSubmit} noValidate>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Field name="name" label="Name" component={GuardTextField} />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Field name="description" 
              component={GuardTextAreaField}
              rows={5} 
              label="Description" />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <FieldArray name="questions" component={renderQuestionFields}/>
          </Grid>
        </Grid>
        
        <Box mt={3} px={1}>
          <Grid container spacing={2}>
            <Box mr={2}>
              <Link to="/managements/assignments">
                <Button variant="contained">
                  Cancel
                </Button>
              </Link>
            </Box>
            <Button type="submit" variant="contained" color="primary" disabled={saving}>
              submit
            </Button>
          </Grid>
        </Box>
      </Container>
    </form>
  );
};

const enhance = flowRight([
  connect(state => ({ data: getFormValues('AssignmentForm')(state) })),
  reduxForm({
    form: 'AssignmentForm',
    validate,
  }),
]);
export const AssignmentForm = enhance(Index);
