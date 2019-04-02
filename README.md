# reacto-form-inputs

This package provides many example inputs that implement the [Composable Forms Input Specification](http://composableforms.com/spec/input/), for use with the `Form` component from the [ReactoForm](https://github.com/DairyStateDesigns/reacto-form) package. Most of these inputs should work fine in a production app, but since they are intended to be examples, do not count on frequent updates.

Instead, authors of React design system component libraries are encouraged to make all of their input components compatible with [ReactoForm](https://github.com/DairyStateDesigns/reacto-form) and the [Composable Forms Input Specification](http://composableforms.com/spec/input/). This is usually very easy to do since the requirements of the specification are largely common sense.

Here are some design systems that are compatible:

- [Reaction Design System](https://designsystem.reactioncommerce.com/)

## Installation

```bash
npm i --save reacto-form reacto-form-inputs
```

## Example

```js
import React, { Component } from 'react';
import { Form, FormList } from 'reacto-form';
import BooleanCheckboxInput from 'reacto-form-inputs/BooleanCheckboxInput';
import DateTimeInput from 'reacto-form-inputs/DateTimeInput';
import ErrorsBlock from 'reacto-form-inputs/ErrorsBlock';
import Field from 'reacto-form-inputs/Field';
import Input from 'reacto-form-inputs/Input';
import SelectCheckboxInput from 'reacto-form-inputs/SelectCheckboxInput';
import moment from 'moment-timezone';

import createPlace from '../createPlace';
import validatePlace from '../validatePlace';

const dayOptions = [
  { label: 'Sunday', value: 0 },
  { label: 'Monday', value: 1 },
  { label: 'Tuesday', value: 2 },
  { label: 'Wednesday', value: 3 },
  { label: 'Thursday', value: 4 },
  { label: 'Friday', value: 5 },
  { label: 'Saturday', value: 6 },
];
const disableBasedOnAllDayValue = ({ openAllDay }) => !!openAllDay;

export default class PlacesCreateForm extends Component {
  render() {
    const midnightThisMorning = moment().tz('America/Chicago').hour(0).minute(0).second(0).millisecond(0).toDate();
    return (
      <Form ref={i => { this.form = i; }} onSubmit={createPlace} validator={validatePlace}>
        <Field name="name" label="Name">
          <Input name="name" type="text" />
          <ErrorsBlock names={['name']} />
        </Field>
        <Field name="website" label="Website">
          <Input name="website" type="url" />
          <ErrorsBlock names={['website']} />
        </Field>
        <h3>Hours</h3>
        <ErrorsBlock names={['hours']} />
        <FormList name="hours">
          <ErrorsBlock />
          <Form>
            <Field name="startDate" label="Start date">
              <DateTimeInput name="startDate" moment={moment} timezone="America/Chicago" value={midnightThisMorning} />
              <ErrorsBlock names={['startDate']} />
            </Field>
            <Field name="days" label="Days">
              <SelectCheckboxInput name="days" options={dayOptions} />
              <ErrorsBlock names={['days']} />
            </Field>
            <Field name="openAllDay">
              <BooleanCheckboxInput name="openAllDay" label="Open all day" />
              <ErrorsBlock names={['openAllDay']} />
            </Field>
            <Field name="openTime" label="Opens at">
              <Input type="time" name="openTime" className="form-control" placeholder="HH:MM" isReadOnly={disableBasedOnAllDayValue} />
              <ErrorsBlock names={['openTime']} />
            </Field>
            <Field name="closeTime" label="Closes at">
              <Input type="time" name="closeTime" placeholder="HH:MM" isReadOnly={disableBasedOnAllDayValue} />
              <ErrorsBlock names={['closeTime']} />
            </Field>
          </Form>
        </FormList>
        <button type="button" onClick={() => { this.form.submit(); }}>Add</button>
      </Form>
    );
  }
}
```

## Component Reference

### Field

Implements the [Field spec](spec/field.md).

Renders something like

```js
<div>
  <label>{label}</label>
  {children}
</div>
```

You can use the following props to customize:

- className: String of space-delimited classes to use on the div
- labelClassName: String of space-delimited classes to use on the label
- labelFor: The "for" attribute to use on the label
- style: Style object for the div

If you set the `name` prop, then when there are errors for that name, the "has-error" class will be added to the div.

If you set the `isRequired` prop to `true`, then the "required" class will be added to the div, which you can use to add an asterisk or to show requiredness in some other way.

Note that the `label` prop can be any React node. Typically it's a string, but you could provide HTML or even another React component to render inside the `label` element.

### ErrorsBlock

Implements the [ErrorsBlock spec](spec/errors.md).

Renders something like

```js
<div>
  <!-- One of the following divs for each error -->
  <div data-name={error.name}>{error.message}</div>
</div>
```

You can use the following props to customize:

- className: String of space-delimited classes to use on the outer div
- errorClassName: String of space-delimited classes to use on each error message div
- errorStyle: Style object for each error message div
- style: Style object for the outer div

### BooleanCheckboxInput

Implements the [Input spec](spec/input.md) with a Boolean data type.

Renders something like

```js
<div>
  <label><input type="checkbox"> {label}</label>
</div>
```

This renders a check box with a label, so if using it within a Field, you would not usually pass a `label` to Field.

You can use the following props to customize:

- className: String of space-delimited classes to use on the div
- style: Style object for the div

### DateTimeInput

Implements the [Input spec](spec/input.md) with a Date data type.

Renders multiple HTML inputs that together allow the user to enter a specific date + time in a given timezone. This includes a month select, with month names in English.

There are many ways that datetime entry can be done and this represents just one example. If you need something different, it should be easy to copy this example component and make a new one conforming to the Input spec.

### Input

Implements the [Input spec](spec/input.md) with a String data type.

This renders as an HTML input element or a textarea element. Specify the `type` prop as you would for HTML, but only the following types are allowed:

- color
- date
- datetime-local
- email
- file
- hidden
- month
- password
- range
- search
- tel
- text
- time
- url
- week

If you want multi-line input, set `allowLineBreaks={true}` and you don't need a `type`.

By default, the string value entered by the user is trimmed. Set `trimValue={false}` to skip this.

By default, empty strings (after trimming) are converted to `null` instead. This can help make validation more logical and reduce space used in your database. If it isn't what you want, you can set `convertEmptyStringToNull={false}`.

Use `maxLength` prop to set a maximum number of characters the user can enter.

Use `placeholder` prop to set placeholder text.

You can use the following props to customize:

- className: String of space-delimited classes to use on the input or textarea
- style: Style object for the input or text area

### SelectInput

Implements the [Input spec](spec/input.md) with user-defined options that may have a Boolean, Number, or String data type. Single selection.

See the "Selection Inputs" section of [the Input Component Reference](user/input.md) for details about passing options.

You can use the following props to customize:

- className: String of space-delimited classes to use on the select
- style: Style object for the select

### SelectCheckboxInput

Implements the [Input spec](spec/input.md) with user-defined options that may have a Boolean, Number, or String data type. Multiple selection.

See the "Selection Inputs" section of [the Input Component Reference](user/input.md) for details about passing options.

You can use the following props to customize:

- className: String of space-delimited classes to use on the container div
- itemClassName: String of space-delimited classes to use on each item div
- itemStyle: Style object for each item div
- labelClassName: String of space-delimited classes to use on each item label
- labelStyle: Style object for each item label
- checkboxClassName: String of space-delimited classes to use on each item checkbox input
- checkboxStyle: Style object for each item checkbox input
- style: Style object for the container div
